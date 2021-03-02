context('anon', function() {
    beforeEach(function() {
        cy.visit('/');
        cy.injectAxe();
    })

    it('page is accessible', function() {
        cy.checkA11y(
            {
                exclude: ['.skip-link']
            }
        );

        cy.percySnapshot('Homepage', { widths: [1280, 1440, 1680, 1920]});
    })

    it('page has correct title', function() {
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
