/// <reference types="Cypress" />

describe('Home Page', () => {
    it('should display a list of courses', () => {
        cy.fixture('courses.json').as('coursesJSON');

        cy.intercept('GET', '/api/courses', {
            fixture: 'courses',
        });

        cy.visit('/');
        cy.contains('All Courses');

        cy.get('mat-card').should('have.length', 9);
    });
});
