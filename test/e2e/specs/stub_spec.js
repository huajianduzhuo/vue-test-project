describe('stub request', function() {
  it('use route', () => {
    cy.server()
    cy.route('get', '/api/*', {name: '赵云澜'}).as('getUser')
    cy.request('/api/getUser').its('body.name').should('eq', '白宇')
  })
})
