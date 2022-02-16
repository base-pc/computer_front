describe('DeleteCategory', () => {

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
        cy.get('.v-list-item__title').contains('Usuń kategorię').click({ force: true })
        cy.wait(4000)
        cy.get('.delete_category_form').contains('Kategoria').click({ force: true })
        cy.wait(2000)
        cy.get('.v-list-item__title').contains('test category').click({ force: true })
        cy.get('.v-btn__content').contains('Usuń').click({ force: true })
        cy.wait(2000)
        cy.get('.v-btn__content').contains('Tak').click({ force: true })

    })





})