describe('/asset', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');

    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.viewport(1280, 720);
    cy.visit('/asset-list');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Asset');
    });
  });

  it('should have correct title in default', () => {
    cy.contains('Asset List');
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
    cy.intercept('GET', '**/assets/*', {
      fixture: 'asset-detail.json',
    }).as('getAssetDetail');

    cy.getByName('datatable').within(() => {
      cy.getSection('rowsingleactioncell')
        .first()
        .within(() => {
          cy.getSection('singleactionbutton').click();
        });
    });
    cy.get('[id="single-action-menu"]');
    cy.get('[id="single-action-menu_0"]').click();

    cy.wait('@getAssetDetail');

    cy.contains('Asset Detail');
    cy.contains('XIX Brum');
    cy.contains('Tesla');
    cy.contains('test');
    cy.contains('C');
    cy.contains('Room 5');
  });

  it('error when failing to fetch asset', () => {
    cy.intercept('GET', '**/assets/*', {
      statusCode: 400,
    }).as('getAssetDetail');

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

    cy.wait('@getAssetDetail');

    cy.get('@consoleError').should('have.been.called');
  });

  it('should have the correct filter options', () => {
    cy.intercept('GET', '**/assets*', { fixture: 'asset-list.json' }).as(
      'getAssetList',
    );

    cy.wait('@getAssetList');
    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
    });

    const testOption = (
      field: string,
      value1: string,
      value2: string,
    ): void => {
      // Click to open filter
      cy.getByName('filtercontainer').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });

      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value1);
          cy.contains(value2);
        });
      });

      // Click to close filte
      cy.get('body').click(0, 0);
    };

    testOption('name', 'Laptop', 'macbook_pro');
    testOption('group', 'Garage', 'wirehouse');
    testOption('brand', 'Apple', 'samsung');
    testOption('model', 'Asus', 's23');
  });

  it('error when failing to fetch asset options', () => {
    cy.intercept('GET', '**/assets/options*', {
      statusCode: 400,
    }).as('getAssetOptions');

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.getSection('tabletoolbars').within(() => {
      cy.getByName('buttonfilter').click();
    });

    const testOption = (field: string): void => {
      cy.getByName('filtercontainer').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('body').click(0, 0);
    };

    testOption('name');
    testOption('group');
    testOption('brand');
    testOption('model');

    cy.wait('@getAssetOptions');
    cy.get('@consoleError').should('have.been.called');
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

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('group', 'Garage');
    testInput('category', 'Car');
    testInput('name', 'Laptop');
    testInput('brand', 'Apple');
    testInput('model', 'Asus');

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
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

  it('error when failing to register asset', () => {
    cy.intercept('POST', '**/assets', { statusCode: 400 }).as(
      'postRegisterAsset',
    );

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('group', 'Garage');
    testInput('category', 'Car');
    testInput('name', 'Laptop');
    testInput('brand', 'Apple');
    testInput('model', 'Asus');

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
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

  it('can edit asset', () => {
    cy.intercept('PUT', '**/assets/*', { statusCode: 200 }).as('putEditAsset');

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

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('group', 'Office Room');
    testInput('category', 'Car');

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
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

    cy.wait('@putEditAsset');
    cy.contains('Berhasil! Success, asset has been edited.');
  });

  it('error when failing to edit', () => {
    cy.intercept('PUT', '**/assets/*', { statusCode: 400 }).as('putEditAsset');
    cy.intercept('GET', '**/assets/options*', {
      fixture: 'asset-options.json',
    }).as('getAssetOptions');

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
    cy.get('[id="single-action-menu_1"]').click();

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Edit Asset');
    });

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('group', 'Office Room');
    testInput('category', 'Car');

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
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

    cy.wait('@putEditAsset');
    cy.contains('Oh tidak! Failed to edit asset. Silakan coba lagi.');
    cy.get('@consoleError').should('have.been.called');
  });

  it('can delete asset', () => {
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
    cy.intercept('DELETE', '**/assets/*', { statusCode: 400, body: {} }).as(
      'deleteAsset',
    );

    cy.visit('/asset-list', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

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

  it('closing dialog form should reset disabled field', () => {
    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('name', 'Laptop');
    testInput('brand', 'Apple');
    testInput('model', 'Asus');

    cy.getSection('dialog-form-main').within(() => {
      cy.getSection('dialog-form-footer').within(() => {
        cy.contains('Batal').click();
      });
    });

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[fieldname="brand"]').should('have.class', 'pointer-events-none');
      cy.get('[fieldname="model"]').should('have.class', 'pointer-events-none');
    });
  });

  it('submit with stayAfterSubmit on should not close the form', () => {
    cy.intercept('POST', '**/assets', { statusCode: 200 }).as(
      'postRegisterAsset',
    );

    cy.getSection('tabletoolbars').within(() => {
      cy.contains('Register').click();
    });

    cy.getSection('dialog-form-container').within(() => {
      cy.contains('Register Asset');
    });

    const testInput = (field: string, value: string): void => {
      cy.getSection('dialog-form-main').within(() => {
        cy.get(`[fieldname="${field}"]`).click();
      });
      cy.get('[data-pc-section="panel"]').within(() => {
        cy.get('[role="listbox"]').within(() => {
          cy.contains(value).click();
        });
      });
    };

    testInput('group', 'Garage');
    testInput('category', 'Car');
    testInput('name', 'Laptop');
    testInput('brand', 'Apple');
    testInput('model', 'Asus');

    cy.getSection('dialog-form-main').within(() => {
      cy.get('[placeholder="Tulis alias name"]').type('test');
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
        cy.getByName('checkbox').click();
        cy.getSection('save-submit-button').click();
      });
    });

    cy.wait('@postRegisterAsset');
    cy.contains('Berhasil! Success, asset has been registered.');
    cy.contains('Register Asset');
  });
});
