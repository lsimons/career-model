describe('About', () => {
  it('Navigate to about', () => {
    cy.visit('/')
    cy.get('#nav').contains('a', 'About').click()
    cy.contains('h1', 'About Career Model')
  })

  it('Navigate to home', () => {
    cy.visit('/#/about')
    cy.get('#nav').contains('a', 'Home').click()
    cy.contains('div', 'try \'Coding\' to see a fleshed-out competency')
  })
})
