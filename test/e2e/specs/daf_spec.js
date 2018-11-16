describe('test daf', function () {
  before(function () {
    cy.fixture('daf.json').as('dafData')
  })
  it('login', function () {
    cy.server({
      whitelist: (xhr) => {
        return xhr.method === 'GET' && /\.(jsx?|css)(\?.*)?$/.test(xhr.url)
      }
    })
    cy.route(this.dafData.dafPrefix + '/api/digitalform/*').as('digitalform')
    cy.route(this.dafData.dafPrefix + '/api/Useraccountlogin').as('Useraccountlogin')
    cy.route(this.dafData.dafPrefix + '/api/ekyc/*').as('DAFekyc')

    cy.route(this.dafData.ekycPrefix + '/index.html').as('ekyciframe')

    cy.visit(this.dafData.dafPrefix + '/#/login')
    cy.wait('@digitalform')
    cy.contains('欢迎您使用电子申请表')
    cy.get('.imgOTP').should('have.attr', 'src').and('include', 'https://posuat1.mercedes-benz-finance.com.cn/cicd-mobile/e-app//api/digitalform/GetIdentifyImage?key=')
    cy.get('@dafData').then(user => {
      cy.get('#phone').type(user.mobile)
      cy.get('input[name="图片验证码"]').type(user.imgValidCode)
    })
    cy.get('#valid').click()
    cy.wait('@digitalform')
    /* .its('responseBody').then(responseBody => {
          expect(responseBody.code).to.eq(200)
          if (responseBody.code === 200) {
            if (responseBody.data) {
              cy.get('.mask .modal .modal-content .button').click()
              cy.get('.mask').should('not.be.visible')
            }
          } else {
            // TODO ??? 图片验证码错误，应该重新输入图片验证码
            cy.contains('.mask .modal .modal-content .text', responseBody.msgcn)
            cy.get('.mask .modal .modal-content .button').click()
          }
        }) */
    cy.get('.mask .modal .modal-content .button').click()
    cy.get('.mask').should('not.be.visible')
    cy.get('input[name="验证码"]').type(this.dafData.valideCode)
    cy.get('.login-button').click()
    cy.url().should('include', '/#/ekyc')

    cy.getCookie('access_token').should('exist')
    cy.getCookie('refresh_token').should('exist')
    cy.getCookie('token_type').should('exist')

    cy.wait('@DAFekyc').its('responseBody').then(body => {
      cy.get('iframe').should('have.attr', 'src').and('include', `/ekyc/index.html#/?token=${body.token.access_token}&tid=${body.transationId}&phone=${this.dafData.mobile}&from=daf`)
    })
    // cy.wait('@ekyciframe')
  })
})
