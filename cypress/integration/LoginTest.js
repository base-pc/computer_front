describe('Login', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('Open login dialog', () => {
        cy.get('.v-btn').contains('Logowanie').click()
        cy.get('.login_form').contains('Adres email').click({ force: true }).type('test@example.com')
        cy.get('.login_form').contains('Hasło').click({ force: true }).type('admin12345')
        cy.get('.v-card').contains('Logowanie').click({ force: true })

        cy.url().should('include', 'user')
    })
})
