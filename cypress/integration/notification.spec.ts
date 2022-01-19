it('can create notification', () => {
	cy.visit('#notification');
	const notificationMsg = 'Notification Test Message';
	cy.getBySel('notification-msg-input').clear().type(notificationMsg);
	cy.getBySel('notification-create-btn').click();
	cy.getBySel('notification-msg').contains(notificationMsg);
});
