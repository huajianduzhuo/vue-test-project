describe('The LongTap Page', function () {
  it('successfully load', function(){
    cy.viewport(375, 667)
    cy.visit('/longtap')
  })
})
