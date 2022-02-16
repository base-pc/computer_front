describe('AddToCart', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('AddToCart', () => {
        cy.get('.v-btn').contains('Logowanie').click()
        cy.get('.login_form').contains('Adres email').click({ force: true }).type('test@example.com')
        cy.get('.login_form').contains('Hasło').click({ force: true }).type('admin12345')
        cy.get('.v-card').contains('Logowanie').click({ force: true })

        cy.url().should('include', 'user')
        cy.wait(2000)
        cy.get('.v-tab').contains('myszki').click({force:true})
        cy.get('.add-to-cart').contains('Dodaj').click({force:true})
        cy.wait(1000)
        cy.get('.v-snack')
            .should('be.visible')
            .and('contain.text', 'Produkt został dodany do koszyka')
        cy.wait(2000)
        cy.get('.counter').should('not.have.value', '0')
        cy.wait(4000)
        cy.get('.product-detail').contains('Szczegóły').click({force:true})
        cy.wait(2000)
        cy.get('.cart-button').contains('Dodaj do koszyka').click({force:true})
        cy.wait(2500)
        cy.get('.counter').should('not.have.value', '0')

    })

})
