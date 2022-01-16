const modalTriggerLabel = 'Open Modal';

beforeEach(() => {
	cy.visit('');
	cy.getBySel('modal-trigger-label').clear().type(modalTriggerLabel);
});

it('can display simple modal', () => {
	cy.getBySel('modal-content').should('not.exist');
	cy.contains(modalTriggerLabel).click();
	cy.getBySel('modal-content').should('exist');
	cy.getBySel('modal-content').type('{esc}');
	cy.wait(500);
	cy.getBySel('modal-content').should('not.exist');
});

it('can display non-dismissable modal', () => {
	cy.getBySel('modal-dismissable-select').select('false');
	cy.getBySel('modal-content').should('not.exist');
	cy.contains(modalTriggerLabel).click();
	cy.getBySel('modal-content').type('{esc}');
	cy.wait(500);
	cy.getBySel('modal-content').should('exist');
	cy.contains('No').click();
	cy.wait(500);
	cy.getBySel('modal-content').should('not.exist');
});
