it('can create notification', () => {
	cy.visit('#tabs');
	cy.getBySel('tab-three-content').should('not.exist');
	cy.get('button').contains('Tab One').click();
	cy.getBySel('tab-one-content').should('exist');
	cy.get('button').contains('Second Tab').click();
	cy.getBySel('tab-one-content').should('not.exist');
	cy.getBySel('tab-two-content').should('exist');
});
