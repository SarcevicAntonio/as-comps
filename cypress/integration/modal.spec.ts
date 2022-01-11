it('can display simple modal', () => {
	const modalTypeKey = 'Super Simple Modal';
	const hiddenModalMessage = `Hello ${modalTypeKey}!`;
	cy.visit('');
	cy.contains(hiddenModalMessage).should('not.exist');
	cy.contains(modalTypeKey).click();
	cy.contains(hiddenModalMessage).type('{esc}');
	cy.wait(500);
	cy.contains(hiddenModalMessage).should('not.exist');
});

it('can display non-dismissable modal', () => {
	const modalTypeKey = 'Non-Dismissable Modal';
	const hiddenModalMessage = `Hello ${modalTypeKey}!`;
	cy.visit('');
	cy.contains(hiddenModalMessage).should('not.exist');
	cy.contains(modalTypeKey).click();
	cy.contains(hiddenModalMessage).type('{esc}');
	cy.wait(500);
	cy.contains(hiddenModalMessage).should('exist');
	cy.contains('Close Modal').click();
	cy.wait(500);
	cy.contains(hiddenModalMessage).should('not.exist');
});
