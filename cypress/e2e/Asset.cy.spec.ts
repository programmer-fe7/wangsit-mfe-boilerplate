describe('/asset', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/asset-list', { fixture: 'asset-list.json' }).as(
      'assetList',
    );
    cy.intercept('GET', '**/asset/*', { fixture: 'asset-dummy.json' }).as(
      'assetDetail',
    );
    cy.intercept('GET', '**/asset/asset-options', {
      fixture: 'asset-options.json',
    }).as('assetOptions');
    cy.viewport(1280, 720);
    cy.visit('/asset-list');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Asset');
    });
  });

  it('navigate to asset detail', () => {
    cy.getByName('datatable').within(() => {
      cy.getSection('rowsingleactioncell').within(() => {
        cy.getSection('singleactionbutton').click();
        cy.contains('Asset Detail');
      });
    });
  });

  it('should have correct filter', () => {
    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
      cy.getByName('filtercontainer').within(() => {
        cy.get('[fieldname="name"]').click();
        cy.get('[fieldname="group"]').click();
        cy.get('[fieldname="brand"]').click();
        cy.get('[fieldname="model"]').click();
      });
    });
  });

  it('should opened up register asset dialog', () => {
    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonregister').click();
      cy.getByName('register-asset-dialog').should('be.visible');
    });
  });

  it('should opened up edit asset dialog', () => {
    cy.getByName('edit-asset-button').click();
    cy.getByName('edit-asset-dialog').should('be.visible');
  });

  it('should opened up delete asset dialog', () => {
    cy.getByName('delete-asset-button').click();
    cy.getByName('delete-asset-dialog').should('be.visible');
  });
});
