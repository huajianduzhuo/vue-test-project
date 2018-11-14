describe('The LongTap Page', function () {
  it('successfully load', function () {
    cy.viewport(375, 667)
    cy.visit('/longtap')
    cy.contains('cc').click()
    cy.get('.menu-wrap').should('contain', '复制')
    cy.get('body').click()
    cy.get('.menu-wrap').should('not.exist')
  })
})
