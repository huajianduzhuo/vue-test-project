describe('test daf', function () {
  before(function () {
    cy.fixture(`users/${Cypress.env('user')}.json`).as('userData')
  })
  it('login', function () {
    // environments
    let dafPrefix = Cypress.env('dafPrefix')
    let ekycPrefix = Cypress.env('ekycPrefix')
    let apiSource = Cypress.env('api') // mock or backend

    // server
    cy.server({
      whitelist: (xhr) => {
        return xhr.method === 'GET' && /\.(jsx?|css)(\?.*)?$/.test(xhr.url)
      }
    })

    // daf routes
    cy.route(dafPrefix + '/api/digitalform/GetIdentifyCode').as('GetIdentifyCode')
    cy.route(dafPrefix + '/api/digitalform/GetIdentifyImage*').as('GetIdentifyImage')
    cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalFormOTP').as('GetDigitalFormOTP')
    cy.route('post', dafPrefix + '/api/Useraccountlogin').as('Useraccountlogin')
    cy.route(dafPrefix + '/api/ekyc/*').as('DAFekyc')
    if (apiSource === 'mock') {
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalFormList*', 'fixture:routes/digitalFormList.json').as('GetDigitalFormList')
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalForm', 'fixture:routes/digitalForm.json').as('GetDigitalForm')
      cy.route('post', dafPrefix + '/api/DigitalForm/SaveDigitalFormChangeData', 'fixture:routes/saveDigitalFormChangeData.json').as('SaveDigitalFormChangeData')
      cy.route('post', dafPrefix + '/api/DigitalForm/DigitalFormDataVerification', 'fixture:routes/dataVerification.json').as('DigitalFormDataVerification')
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalFormSignatureChallengeCode', 'fixture:routes/challengeCode.json').as('GetDigitalFormSignatureChallengeCode')
      cy.route('post', dafPrefix + '/api/DigitalForm/SubmitDigitalForm', {
        code: '200',
        data: null,
        msg: 'Submit ditital form list success.',
        msgcn: '提交电子申请单成功。'
      }).as('SubmitDigitalForm')
    } else {
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalFormList*').as('GetDigitalFormList')
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalForm').as('GetDigitalForm')
      cy.route('post', dafPrefix + '/api/DigitalForm/SaveDigitalFormChangeData').as('SaveDigitalFormChangeData')
      cy.route('post', dafPrefix + '/api/DigitalForm/DigitalFormDataVerification').as('DigitalFormDataVerification')
      cy.route('post', dafPrefix + '/api/DigitalForm/GetDigitalFormSignatureChallengeCode').as('GetDigitalFormSignatureChallengeCode')
      cy.route('post', dafPrefix + '/api/DigitalForm/SubmitDigitalForm').as('SubmitDigitalForm')
    }

    // ekyc routes
    cy.route(ekycPrefix + '/index.html*').as('ekyciframe')
    cy.route('post', ekycPrefix + '/api/Facial/SilentImageVerify').as('SilentImageVerify')
    cy.route('post', ekycPrefix + '/api/Transaction/Complete').as('Complete')
    cy.route(ekycPrefix + '/api/Transaction/*').as('Transaction')
    cy.route('post', ekycPrefix + '/api/IDCardOCR/Resolve').as('IDCardOCR')
    cy.route('post', ekycPrefix + '/api/NCIIC/Verify').as('NCIICVerify')
    cy.route('post', ekycPrefix + '/api/CFCA/Verify').as('CFCAVerify')

    // DAF login
    cy.visit(dafPrefix + '/#/login')
    cy.wait('@GetIdentifyCode').its('status').should('eq', 200)
    cy.wait('@GetIdentifyImage').its('status').should('eq', 200)
    cy.contains('欢迎您使用电子申请表')
    cy.get('.imgOTP').should('have.attr', 'src').and('include', 'https://posuat1.mercedes-benz-finance.com.cn/cicd-mobile/e-app//api/digitalform/GetIdentifyImage?key=')
    cy.get('@userData').then(user => {
      cy.get('#phone').type(user.mobile)
      cy.get('input[name="图片验证码"]').type(user.imgValidCode, {
        force: true
      })
    })
    cy.get('#valid').click()
    cy.wait('@GetDigitalFormOTP').then(xhr => {
      expect(xhr.status).to.equal(200)
      let body = xhr.responseBody
      if (~~body.code === 200) {
        if (body.data) {
          cy.get('.mask .modal .modal-content .button').click()
          cy.get('.mask').should('not.be.visible')
        }
      } else {
        // TODO ??? 图片验证码错误，应该重新输入图片验证码
        cy.contains('.mask .modal .modal-content .text', body.msgcn)
        cy.get('.mask .modal .modal-content .button').click()
      }
    })
    cy.get('input[name="验证码"]').type(this.userData.valideCode)
    cy.get('.login-button').click()
    cy.wait('@Useraccountlogin').its('status').should('eq', 200)

    // DAF ekyc
    cy.url().should('include', '/#/ekyc')
    cy.getCookie('access_token').should('exist')
    cy.getCookie('refresh_token').should('exist')
    cy.getCookie('token_type').should('exist')
    let cookies = []
    cy.getCookies().then(v => {
      cookies = v
    })
    cy.wait('@DAFekyc').its('responseBody').then(body => {
      const ekycUrl = `/ekyc/index.html#/?token=${body.token.access_token}&tid=${body.transationId}&phone=${this.userData.mobile}&from=daf`
      cy.get('iframe').should('have.attr', 'src').and('include', ekycUrl)
      cy.wrap({
        ekycUrl
      }).as('ekycUrl')
    })

    // ekyc
    cy.get('@ekycUrl').then(ekycUrl => {
      cy.visit(ekycUrl.ekycUrl)
    })
    cy.wait('@Transaction').its('responseBody').then(body => {
      let processes = body.processes || []
      let ocr = processes.find(item => item.name === 'OCR') || {}
      let ekycInfo = {}
      if (ocr.status !== 0) {
        ekycInfo.ekycProcess = 'facial'
      }
      ekycInfo.hasBankCardNum = !!body.bankCardNumber
      cy.wrap(ekycInfo).as('ekycInfo')
    })

    /*
     * ekyc 验证
     */
    cy.get('@ekycInfo').then(({
      ekycProcess,
      hasBankCardNum
    }) => {
      if (ekycProcess === 'facial') {
        cy.url().should('include', 'facial')
        cy.upload_file(this.userData.facialPath, '#id-video-input')
        cy.wait('@SilentImageVerify').its('status').should('eq', 200)
        cy.wait('@Complete').its('status').should('eq', 200)
        cy.url().should('include', 'result')
      } else {
        // OCR page
        cy.url().should('include', 'ocr')
        // Test DOM element
        cy.contains('#front-upload-form > .upload-container > label', '上传身份证正面')
        cy.contains('#back-upload-form > .upload-container > label', '上传身份证背面')
        cy.get('.captureBtn').should('be.disabled')
        // Test OCR
        cy.upload_file(this.userData.ocrFrontPath, '#id-front-input')
        cy.wait('@IDCardOCR').its('status').should('eq', 200)
        cy.upload_file(this.userData.ocrBackPath, '#id-back-input')
        cy.wait('@IDCardOCR').its('status').should('eq', 200)
        sessionStorage.removeItem('front')
        sessionStorage.removeItem('back')
        cy.get('.captureBtn').should('not.be.disabled').click()
        cy.wait('@NCIICVerify').its('status').should('eq', 200)
        // Bank page
        cy.url().should('include', 'bank')
        // Test dom
        cy.contains('.info-container div > span', '请确认此号为该银行卡绑定的手机号，以便顺利通过身份验证')
        cy.get('.phone-input > .el-input__inner').should('have.value', this.userData.mobile)
        cy.get('.card-input > .el-input__inner').type(this.userData.bankCard)
        cy.get('.captureBtn').click()
        cy.wait('@CFCAVerify').its('responseBody').then(body => {
          if (!hasBankCardNum || !body.valid) {
            cy.get('.el-message-box').should('be.visible')
            cy.get('.el-message-box__btns > .el-button').click()
          }
        })
        // Facial page
        cy.url().should('include', 'facial')
        cy.upload_file(this.userData.facialPath, '#id-video-input')
        cy.wait('@SilentImageVerify').its('status').should('eq', 200)
        cy.wait('@Complete').its('status').should('eq', 200)
        cy.url().should('include', 'result')
      }
    })

    const tid = sessionStorage.getItem('tid')

    // DAF list
    cy.visit(dafPrefix + '/#/list')
    sessionStorage.setItem('transationId', tid)
    sessionStorage.setItem('step', 'COMPLETE')
    cookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value)
    })
    cy.wait('@GetDigitalFormList').then(xhr => {
      expect(xhr.status).to.equal(200)
      expect(xhr.responseBody.code).to.equal('200')
    })

    cy.get('article > section > ul > li').contains('待确认').then(() => {
      cy.get('.active').first().click()

      // DAF application
      cy.wait('@GetDigitalForm').its('status').should('eq', 200)
      cy.contains('提示: 您输入的短信验证码将构成电子签名，代表您确认在本申请表中提供的信息均是真实有效、准确和完整的，同时也代表您书面同意并授权奔驰金融向中国人民银行征信中心金融信用信息基础数据库或其他依法设立的征信机构等查询您的个人和信用信息。')
      cy.get('.agreement .checkbox-container .m-checkbox').click() // 同意选择框
      cy.get('article.popup-full').should('be.visible') // 显示授权协议
      cy.get('.popup-full .btn-fix-bottom .sure-button').click() // 点击“同意”button
      cy.get('article.popup-full').should('not.be.visible') // 隐藏授权协议
      cy.get('.sure-popup-bottom .otp-input-group .diy').click() // 点击获取验证码
      cy.contains('信息已发送，请输入验证码。如需退出请刷新页面，或等待倒计时结束后关闭。')
      cy.wait(['@SaveDigitalFormChangeData', '@DigitalFormDataVerification', '@GetDigitalFormSignatureChallengeCode']).spread((a, b, c) => {
        return c.responseBody
      }).then(body => {
        if (body && ~~body.code === 200) {
          let ChallengeCode = body.data.ChallengeCode
          cy.get('.mask .modal .button').click() // 弹出框点击“确定”
          cy.get('.mask .modal').should('not.be.visible') // 弹出框隐藏
          cy.get('.sure-popup-bottom .otp-input-group input').type(ChallengeCode)
        }
      })
      cy.get('.sure-popup-bottom .sure-popup-button').click()
      cy.wait('@SubmitDigitalForm').then(xhr => {
        if (~~xhr.responseBody.code === 200) {
          cy.url().should('include', '/#/list')
          cy.contains(xhr.responseBody.msgcn)
          cy.get('.mask .modal .button').click() // 弹出框点击“确定”
          cy.get('.mask .modal').should('not.be.visible') // 弹出框隐藏
        }
      })
    })
  })
})
