describe('SearchProduct', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('SearchProduct', () => {
        cy.wait(4000)
        cy.get('input').click({force:true}).type('Zowie FK1')
        cy.wait(2000)
        cy.get('input').click({force:true}).type('{enter}')
        cy.wait(2500)
        cy.get('.items').should('be.visible')

    })

})
