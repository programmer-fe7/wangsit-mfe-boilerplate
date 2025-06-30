describe('/home', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Home');
    });
  });

  it('navigate to another page and should have correct breadcrumb', () => {
    cy.getByName('tabmenu').within(() => {
      cy.contains('Another Page').click();
    });

    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Another Page');
    });

    cy.contains('Hello from Another Tab');
  });
});
