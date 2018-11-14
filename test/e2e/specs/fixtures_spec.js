describe('use fixtures', function () {
  it('user json', function() {
    // cy.fixture('user.json').then(user => {
    //   expect(user.job).to.eq('演员')
    // })
    cy.fixture('user.json').as('userData')
    cy.get('@userData').its('job').should('eq', '演员')
  })
})
