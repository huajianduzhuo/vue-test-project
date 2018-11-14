/**
 * before
 *
 * beforeEach
 * test1
 * afterEach
 *
 * beforeEach
 * test2
 * afterEach
 *
 * after
 */
describe('hook', function() {
  before(function() {
    cy.log('before hook runs')
  })
  beforeEach(function() {
    cy.log('beforeEach hook runs')
  })
  after(function() {
    cy.log('after hook runs')
  })
  afterEach(function() {
    cy.log('afterEach hook runs')
  })
  it('test1', () => {
    cy.log('test1 runs')
  })
  it('test2', () => {
    cy.log('test2 runs')
  })
})
