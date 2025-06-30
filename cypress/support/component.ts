/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
/// <reference types="cypress" />
import { App, DefineComponent } from 'vue';
import { mount } from '@cypress/vue';

import '@cypress/code-coverage/support';
import './commands';

/**
 * Importing Stylesheets
 */
import '../../src/assets/css/main.css';
import '@fewangsit/wangsvue/style.css';
import './tailwind.css';

import { registerComponents } from '../../src/utils';

/**
 * A custom commands for mounting Components and plugins.
 */
Cypress.Commands.add('mount', (component: DefineComponent, options = {}) => {
  options.global = options.global || {};
  options.global.stubs = options.global.stubs || {};
  options.global.stubs['transition'] = false;
  options.global.components = options.global.components || {};
  options.global.plugins = options.global.plugins || [];

  options.global.plugins.push({
    install(app: App) {
      registerComponents(app);
    },
  });

  return mount(component, options);
});

after(() => {
  cy.task('coverageReport');
});
