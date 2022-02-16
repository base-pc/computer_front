describe('Register Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Open register dialog', () => {
    cy.get('.v-btn').contains('Rejestracja').click()
    cy.get('.register_form').contains('Adres email').click({ force: true }).type('test@example.com')
    cy.get('.register_form').contains('Imię i nazwisko').click({ force: true }).type('Test testowy')
    cy.get('.register_form').contains('Hasło').click({ force: true }).type('admin12345')
    cy.get('.register_form').contains('Powtórz hasło').click({ force: true }).type('admin12345')
    cy.get('.v-card').contains('Rejestracja').click({ force: true })
    cy.get('.v-snack')
      .should('be.visible')
      .and('contain.text', 'Konto zostało założone')

  })



})

