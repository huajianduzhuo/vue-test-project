// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import axios from 'axios'
Cypress.Commands.add('fetch_token', () => {
  let token
  let tokenType
  let tid
  return fetchToken().then(response => {
    token = response.data.access_token
    tokenType = response.data.token_type
    let instance = axios.create({
      headers: {
        'Authorization': tokenType + ' ' + token
      }
    })
    let mobile = Cypress.env('mobile')
    return instance.post(`/api/Transaction/Create?phone=${mobile}`).then(response => {
      tid = response.data.id
      return { token, tid }
    })
  })
})

function fetchToken () {
  let dataObj = new FormData()
  switch (Cypress.env('from').toUpperCase()) {
    case 'SMART':
      dataObj.append('client_id', 'B550F32F-784C-46EF-A6D4-B98A0219A142')
      dataObj.append('client_secret', 'ecom-smart')
      break
    case 'DAF':
      dataObj.append('client_id', '50357B25-B27C-4771-B3DF-26CF387A5935')
      dataObj.append('client_secret', 'secret')
      break
    case 'ECOM':
      dataObj.append('client_id', '20FF4BDE-15E4-433A-A951-7EE7C8A80628')
      dataObj.append('client_secret', 'secret')
      break
    case 'BJCA':
      dataObj.append('client_id', 'D62C4655-FB58-4635-98F7-00EEDCF5E2A4')
      dataObj.append('client_secret', 'secret')
      break
    case 'BMBS':
      dataObj.append('client_id', '729BF44F-7C3D-436B-BDEC-90587AE8F5E1')
      dataObj.append('client_secret', 'ecom-bmbs')
      break
    case 'STANDALONE':
      dataObj.append('client_id', '7E76EB1B-9180-40A3-B719-B1054A806A24')
      dataObj.append('client_secret', 'ecom-standalone')
      break
  }
  dataObj.append('client_subject', 'dev')
  dataObj.append('grant_type', 'bridge')
  return axios.post(
    '/connect/token',
    dataObj
  )
}

Cypress.Commands.add('upload_file', (fileName, selector) => {
  cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64').then((content) => {
      const el = subject[0]
      const blob = b64toBlob(content)
      const testFile = new File([blob], fileName)
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(testFile)
      el.files = dataTransfer.files
    })
  })
})

function b64toBlob (b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512
  var byteCharacters = atob(b64Data)
  var byteArrays = []
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)
    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    var byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  var blob = new Blob(byteArrays)
  blob.lastModifiedDate = new Date()
  return blob
}
