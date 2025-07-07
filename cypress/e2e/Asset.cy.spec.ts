describe('/asset', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );
    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');
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

  it('should have the correct filter options', () => {
    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
    });

    /*
     * TODO: The tests below are repetitive, use this function instead.
     * In general, repetitive tests can be made into functions.
     */
    const testOption = (
      field: string,
      value1: string,
      value2: string,
    ): void => {
      cy.getByName('filtercontainer').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value1);
          cy.contains(value2);
        });
      });
    };
    testOption('name', 'Laptop', 'macbook_pro');

    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');
    cy.wait('@getAssetOptions');
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

    /*
     * FIXME: You've already intercepted this API request. The same intercept
     * applies to all of the current 'it' test. You can intercept it
     * inside the beforeEach command, so it applies to all 'it' tests.
     */
    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');
    cy.wait('@getAssetOptions');
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

    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');
    cy.wait('@getAssetOptions');
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

    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');
    cy.wait('@getAssetOptions');
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
    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.intercept('GET', '**/assets/options*', {
      statusCode: 400,
    }).as('getAssetOptions');
    cy.intercept('GET', '**/assets/options*', {
      statusCode: 400,
    }).as('getAssetOptions');
    cy.intercept('GET', '**/assets/options*', {
      statusCode: 400,
    }).as('getAssetOptions');
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
    cy.get('@consoleError').its('callCount').should('be.gte', 4);
  });

  it('should open edit dialog', () => {
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
    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });
  });

  it('can register asset', () => {
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
    cy.getSection('dialog-cropper').within(() => {
      cy.get('[data-pc-section="footer"]').within(() => {
        cy.wait(1000);
        cy.contains('Terapkan').click();
      });
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('dialog-form-footer').within(() => {
        cy.getSection('save-submit-button').click();
      });
    });

    cy.wait('@postRegisterAsset');
    cy.contains('Berhasil! Success, asset has been registered.');
  });
});
