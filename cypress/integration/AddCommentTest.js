describe('AddComment', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('AddComment', () => {

        cy.get('.v-btn').contains('Logowanie').click()
        cy.get('.login_form').contains('Adres email').click({ force: true }).type('test@example.com')
        cy.get('.login_form').contains('Hasło').click({ force: true }).type('admin12345')
        cy.get('.v-card').contains('Logowanie').click({ force: true })

        cy.url().should('include', 'user')
        cy.wait(4000)
        cy.get('input').click({force:true}).type('Zowie FK1')
        cy.wait(2000)
        cy.get('input').click({force:true}).type('{enter}')
        cy.wait(2500)
        cy.get('.items').should('be.visible')
        cy.get('.product-detail').contains('Szczegóły').click({force:true})
        cy.wait(2000)
        cy.get('.set-rate > .v-rating').contains('.aria-label','Rating 3 of 5').click({force:true})
        cy.wait(2000)
        cy.get('.comment-submit').contains('Dodaj komentarz').click({force:true})

    })

})
