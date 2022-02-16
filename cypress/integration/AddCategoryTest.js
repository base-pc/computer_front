describe('AddCategory', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('AddCategory', () => {
        cy.get('.v-btn').contains('Logowanie').click()
        cy.get('.login_form').contains('Adres email').click({ force: true }).type('kit@wp.pl')
        cy.get('.login_form').contains('Hasło').click({ force: true }).type('admin1234')
        cy.get('.v-card').contains('Logowanie').click({ force: true })

        cy.url().should('include', 'admin')
        cy.wait(5000)
        cy.get('.v-btn').contains('Zarządzaj').click({ force: true })
        cy.wait(2000)
        cy.get('.v-list-item__title').contains('Dodaj kategorię').click({ force: true })
        cy.get('.add_category_form').contains('Nazwa kategorii').click({ force: true }).type('test category')
        cy.get('.v-btn').contains('Dodaj kategorię').click({ force: true })
        cy.wait(1000)
        cy.get('.v-snack')
            .should('be.visible')
            .and('contain.text', 'Kategoria została dodana')
    })





})