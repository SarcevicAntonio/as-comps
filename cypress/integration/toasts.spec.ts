it('can create toast', () => {
	cy.visit('');
	const toastMsg = 'Toast Test Message';
	cy.getBySel('toast-msg-input').clear().type(toastMsg);
	cy.getBySel('toast-create-btn').click();
	cy.getBySel('toast-msg').contains(toastMsg);
});
