const dialogTriggerLabel = 'Open Dialog';

const dialogContentShould = (chainer) => cy.getBySel('dialog-content').should(chainer);

beforeEach(() => {
	cy.visit('#dialog');
	cy.getBySel('dialog-trigger-label').clear().type(dialogTriggerLabel);
	dialogContentShould('not.exist');
});

it('can display simple dialog', () => {
	cy.contains(dialogTriggerLabel).click();
	dialogContentShould('exist');
	cy.getBySel('dialog-content').type('{esc}');
	cy.wait(500);
	dialogContentShould('not.exist');
});

it('can display mandatory dialog', () => {
	cy.getBySel('dialog-mandatory-select').select('true');
	cy.contains(dialogTriggerLabel).click();
	cy.getBySel('dialog-content').type('{esc}');
	cy.wait(500);
	dialogContentShould('exist');
	cy.getBySel('dialog-close').click();
	cy.wait(500);
	dialogContentShould('not.exist');
});
