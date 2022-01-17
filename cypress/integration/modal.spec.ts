const modalTriggerLabel = 'Open Modal';

const modalContentShould = (chainer) => cy.getBySel('modal-content').should(chainer);

beforeEach(() => {
	cy.visit('');
	cy.getBySel('modal-trigger-label').clear().type(modalTriggerLabel);
	modalContentShould('not.exist');
});

it('can display simple modal', () => {
	cy.contains(modalTriggerLabel).click();
	modalContentShould('exist');
	cy.getBySel('modal-content').type('{esc}');
	cy.wait(500);
	modalContentShould('not.exist');
});

it('can display mandatory modal', () => {
	cy.getBySel('modal-mandatory-select').select('true');
	cy.contains(modalTriggerLabel).click();
	cy.getBySel('modal-content').type('{esc}');
	cy.wait(500);
	modalContentShould('exist');
	cy.getBySel('modal-close').click();
	cy.wait(500);
	modalContentShould('not.exist');
});
