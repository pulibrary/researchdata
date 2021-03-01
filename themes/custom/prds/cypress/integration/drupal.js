context('anon', function() {
    beforeEach(function() {
        cy.visit('/');
    })

    it('site loads', function() {
        cy.visit('/');
    })

    it('site has correct title', function() {
        cy.title().should('eq', 'Landing Page | Princeton Research Data Service')
    })

    it('can search', function() {
        cy.get('#edit-keys').type('data{enter}');
        cy.get('.page-title').should('contain', 'Search results');
        cy.get('.layout-content').should('contain', 'Data Use Agreements');
    })

    it('can search - no results', function() {
        cy.get('#edit-keys').type('no results');
        cy.get('.form-submit').click();
        cy.get('.page-title').should('contain', 'Search results');
        cy.get('.layout-content').should('contain', 'No results. Please enter different keywords to search.');
    })
})
