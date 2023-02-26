/// <reference types="Cypress" />

describe('Home Page', () => {
    beforeEach(() => {
        cy.fixture('courses.json').as('coursesJSON');

        cy.intercept('GET', '/api/courses', {
            fixture: 'courses',
        });

        cy.visit('/');
    });
    it('should display a list of courses', () => {
        cy.contains('All Courses');

        cy.get('mat-card').should('have.length', 9);
    });

    it('should display the advanced courses', () => {
        cy.get('.mat-mdc-tab').should('have.length', 2);
        cy.get('.mat-mdc-tab').last().click();
        cy.get('.mat-mdc-card-title').its('length').should('be.gt', 1);
        cy.wait(500);
        cy.get('.mat-mdc-card-title').first().should('contain.text', 'Angular Security Course');
    });
});
