"use strict";

require('./customstyle.scss');
require('purecss');

const config = require('./config/form.json');

const DependencyInjector = require('./DependencyInjector');
const QuickSelector = require('./QuickSelector');
const FormPreparator = require('./FormPreparator');
const FormDecorator = require('./FormDecorator');
const LookupFieldSynchronizer = require('./LookupFieldSynchronizer');
const Conditionals = require('./Conditionals');
const Paginator = require('./Paginator');
const Validator = require('./Validator');
const FormEvents = require('./FormEvents');
const InputMask = require('./InputMask');
const Bugfix = require('./Bugfix');
const NativeMethodOverrides = require('./NativeMethodOverrides');

const ID_FORM = 'target_form';

const PREFIX_LOOKUP_ID = '_acl_';

const DECORATOR_STATE_HIDDEN = 'alx-hidden';
const DECORATOR_STATE_IGNORE = 'alx-ignore';
const DECORATOR_STATE_REQUIRED = 'alx-required';
const DECORATOR_FORM_FIELD_WRAPPER = 'alx-form-input-wrapper';
const DECORATOR_FORM_LABEL_WRAPPER = 'alx-form-label-wrapper';
const DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER = 'alx-form-element';
const DECORATOR_FORM_GROUP = 'alx-form-element-group';

const IDENTIFIER_FORM_TITLE_CONTAINER = 'alx-form-title-container';
const IDENTIFIER_LOGO_CONTAINER = 'alx-logo-container';
const IDENTIFIER_HEADING_CONTAINER = 'alx-heading-container';
const IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER = 'alx-page-navigation-top-container';
const IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER = 'alx-page-navigation-bottom-container';
const IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER = 'alx-save-load-buttons-container';

$(document).ready(() => {
  const dependencyInjector = new DependencyInjector();

  const quickSelector = new QuickSelector();

  dependencyInjector.setTargetInstance(quickSelector).inject([{
    key: '$',
    value: $
  }]);

  const formPreparator = new FormPreparator();

  dependencyInjector.setTargetInstance(formPreparator).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }, {
    key: 'DECORATOR_FORM_FIELD_WRAPPER',
    value: DECORATOR_FORM_FIELD_WRAPPER
  }, {
    key: 'DECORATOR_FORM_LABEL_WRAPPER',
    value: DECORATOR_FORM_LABEL_WRAPPER
  }, {
    key: 'DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER',
    value: DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER
  }, {
    key: 'DECORATOR_FORM_GROUP',
    value: DECORATOR_FORM_GROUP
  }]);

  formPreparator.init(config)

  const formDecorator = new FormDecorator();

  dependencyInjector.setTargetInstance(formDecorator).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }, {
    key: 'IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER',
    value: IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER
  }, {
    key: 'IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER',
    value: IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER
  }, {
    key: 'IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER',
    value: IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER
  }, {
    key: 'IDENTIFIER_FORM_TITLE_CONTAINER',
    value: IDENTIFIER_FORM_TITLE_CONTAINER
  }]);

  formDecorator.init(config);

  const formEvents = new FormEvents();

  dependencyInjector.setTargetInstance(formEvents).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }]);

  formEvents.init();

  const lookupFieldSynchronizer = new LookupFieldSynchronizer();

  dependencyInjector.setTargetInstance(lookupFieldSynchronizer).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'PREFIX_LOOKUP_ID',
    value: PREFIX_LOOKUP_ID
  }, {
    key: 'FORM_EVENTS',
    value: formEvents
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }]);

  lookupFieldSynchronizer.init(config.lookupFields);

  const conditionals = new Conditionals();

  dependencyInjector.setTargetInstance(conditionals).inject([{
    key: '$',
    value: $
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }, {
    key: 'FORM_EVENTS',
    value: formEvents
  }, {
    key: 'DECORATOR_STATE_HIDDEN',
    value: DECORATOR_STATE_HIDDEN
  }, {
    key: 'DECORATOR_STATE_IGNORE',
    value: DECORATOR_STATE_IGNORE
  }, {
    key: 'DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER',
    value: DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER
  }]);

  conditionals.init(config.dependencies);

  const paginator = new Paginator();

  dependencyInjector.setTargetInstance(paginator).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }, {
    key: 'FORM_EVENTS',
    value: formEvents
  }, {
    key: 'DECORATOR_STATE_HIDDEN',
    value: DECORATOR_STATE_HIDDEN
  }, {
    key: 'IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER',
    value: IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER
  }, {
    key: 'IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER',
    value: IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER
  }]);

  paginator.init(config.pages);

  const validator = new Validator();

  dependencyInjector.setTargetInstance(validator).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }, {
    key: 'FORM_EVENTS',
    value: formEvents
  }, {
    key: 'DECORATOR_STATE_REQUIRED',
    value: DECORATOR_STATE_REQUIRED
  }, {
    key: 'DECORATOR_STATE_IGNORE',
    value: DECORATOR_STATE_IGNORE
  }, {
    key: 'PREFIX_LOOKUP_ID',
    value: PREFIX_LOOKUP_ID
  }]);

  validator.init(config.validation, config.lookupFields);

  const inputMask = new InputMask();

  dependencyInjector.setTargetInstance(inputMask).inject([{
    key: '$',
    value: $
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }]);

  inputMask.init(config.inputMask);

  const bugfix = new Bugfix();

  dependencyInjector.setTargetInstance(bugfix).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }]);

  bugfix.init();

  const nativeMethodOverrides = new NativeMethodOverrides();

  dependencyInjector.setTargetInstance(nativeMethodOverrides).inject([{
    key: '$',
    value: $
  }, {
    key: 'ID_FORM',
    value: ID_FORM
  }, {
    key: 'FORM_EVENTS',
    value: formEvents
  }, {
    key: 'QUICK_SELECTOR',
    value: quickSelector
  }]);

  nativeMethodOverrides.init();

  quickSelector.emptyCache();
});