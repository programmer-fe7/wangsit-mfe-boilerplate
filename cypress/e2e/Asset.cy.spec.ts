describe('/asset', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/asset-list');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Asset');
    });
  });

  it('failed to fetch asset list', () => {
    cy.intercept('GET', '**/assets*', { statusCode: 400 }).as('getAssetList');

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.wait('@getAssetList');
    cy.get('@consoleError').should('be.calledOnce');
  });

  it('navigate to asset detail', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.getByName('datatable').within(() => {
      cy.getSection('rowsingleactioncell')
        .first()
        .within(() => {
          cy.getSection('singleactionbutton').click();
        });
    });
    cy.get('[id="single-action-menu"]');
    cy.get('[id="single-action-menu_0"]').click();

    cy.intercept('GET', '**/assets/*', {
      fixture: 'asset-detail.json',
    }).as('getAssetDetail');
    cy.wait('@getAssetDetail');

    cy.contains('Asset Detail');
    cy.contains('XIX Brum');
    cy.contains('Tesla');
    cy.contains('test');
    cy.contains('C');
    cy.contains('Room 5');
  });

  it('error when failing to fetch asset', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.getByName('datatable').within(() => {
      cy.getSection('rowsingleactioncell')
        .first()
        .within(() => {
          cy.getSection('singleactionbutton').click();
        });
    });
    cy.get('[id="single-action-menu"]');
    cy.get('[id="single-action-menu_0"]').click();

    cy.intercept('GET', '**/assets/*', {
      statusCode: 400,
    }).as('getAssetDetail');

    cy.wait('@getAssetDetail');

    cy.get('@consoleError').should('have.been.called');
  });

  it('should have the correct filter options', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
    });

    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');

    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="name"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Laptop');
        cy.contains('macbook_pro');
      });
    });
    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="name"]').click();
    });

    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="group"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Garage');
        cy.contains('wirehouse');
      });
    });
    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="group"]').click();
    });

    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="brand"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Apple');
        cy.contains('samsung');
      });
    });
    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="brand"]').click();
    });

    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="model"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Asus');
        cy.contains('s23');
      });
    });
    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="model"]').click();
    });
  });

  it('error when failing to fetch asset options', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.intercept('GET', '**/assets/options*', {
      statusCode: 400,
    }).as('getAssetOptions');

    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
    });

    cy.getByName('filtercontainer').within(() => {
      cy.get('[fieldname="name"]').click();
    });

    cy.wait('@getAssetOptions');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should open edit dialog', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.getByName('datatable').within(() => {
      cy.getSection('rowsingleactioncell')
        .first()
        .within(() => {
          cy.getSection('singleactionbutton').click();
        });
    });

    cy.get('[id="single-action-menu"]');
    cy.get('[id="single-action-menu_1"]').click();

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Edit Asset');
    });
  });

  it('should open register dialog', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });
  });

  it('can register asset', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.intercept('POST', '**/assets', { statusCode: 200 }).as(
      'postRegisterAsset',
    );

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="group"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Garage').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="category"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Car').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="name"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Laptop').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="brand"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Apple').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="model"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Asus').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('input-image-trigger').click();
      cy.get('input[type="file"]').selectFile(
        './cypress/fixtures/banteng.jpeg',
        {
          force: true,
        },
      );
    });

    cy.get('[role="dialog"]').contains('Sesuaikan gambar');
    cy.get('.vue-advanced-cropper').should('be.visible');
    cy.get('[aria-label="Terapkan"]').filter(':visible').click();

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('dialog-form-footer').within(() => {
        cy.getSection('save-submit-button').click();
      });
    });

    cy.wait('@postRegisterAsset');
    cy.contains('Berhasil! Success, asset has been registered.');
  });

  it('failing to register asset', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );
    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.intercept('POST', '**/assets', { statusCode: 400 }).as(
      'postRegisterAsset',
    );

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="group"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Garage').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="category"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Car').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="name"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Laptop').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="brand"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Apple').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="model"]').click();
    });
    cy.get('[data-pc-section="panel"]').within(() => {
      cy.get('[role="listbox"]').within(() => {
        cy.contains('Asus').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('input-image-trigger').click();
      cy.get('input[type="file"]').selectFile(
        './cypress/fixtures/banteng.jpeg',
        {
          force: true,
        },
      );
    });

    cy.get('[role="dialog"]').contains('Sesuaikan gambar');
    cy.get('.vue-advanced-cropper').should('be.visible');
    cy.get('[aria-label="Terapkan"]').filter(':visible').click();

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('dialog-form-footer').within(() => {
        cy.getSection('save-submit-button').click();
      });
    });

    cy.wait('@postRegisterAsset');
    cy.contains('Oh tidak! Failed to register asset. Silakan coba lagi.');
    cy.get('@consoleError').should('have.been.called');
  });

  it('can delete asset', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );
    cy.intercept('DELETE', '**/assets/*', { statusCode: 200 }).as(
      'deleteAsset',
    );

    cy.getByName('datatable').within(() => {
      cy.getSection('checkbox-input').eq(1).click();
    });

    cy.getSection('tabletoolbars').within(() => {
      cy.getSection('bulkactiontoggle').click();
    });

    cy.contains('Delete Asset').click();
    cy.getSection('confirm-button').click();

    cy.wait('@deleteAsset').its('response.statusCode').should('eq', 200);
  });

  it('error when failing to delete', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );
    cy.intercept('DELETE', '**/assets/*', { statusCode: 400, body: {} }).as(
      'deleteAsset',
    );

    cy.getByName('datatable').within(() => {
      cy.getSection('checkbox-input').eq(1).click();
    });

    cy.getSection('tabletoolbars').within(() => {
      cy.getSection('bulkactiontoggle').click();
    });

    cy.contains('Delete Asset').click();
    cy.getSection('confirm-button').click();

    cy.wait('@deleteAsset');
    cy.get('@consoleError').should('have.been.called');
  });
});
