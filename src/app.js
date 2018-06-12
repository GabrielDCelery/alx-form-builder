"use strict";

require('./customstyle.scss');

const config = require('./config/form.json');

const DependencyInjector = require('./DependencyInjector');
const QuickSelector = require('./QuickSelector');
const NestedGroupsGenerator = require('./NestedGroupsGenerator');
const PageDecorator = require('./PageDecorator');
const GroupDecorator = require('./GroupDecorator');
const FieldDecorator = require('./FieldDecorator');
const ElemRelocator = require('./ElemRelocator');
const FieldSynchronizer = require('./FieldSynchronizer');
const Conditionals = require('./Conditionals');
const Paginator = require('./Paginator');
const Validator = require('./Validator');
const FormEvents = require('./FormEvents');
const InputMask = require('./InputMask');
const Bugfix = require('./Bugfix');
const NativeMethodOverrides = require('./NativeMethodOverrides');

const ID_FORM = 'target_form';

const PREFIX_LOOKUP_ID = '_acl_';
const PREFIX_GROUP = 'alx-group-';

const DECORATOR_STATE_HIDDEN = 'alx-hidden';
const DECORATOR_STATE_IGNORE = 'alx-ignore';
const DECORATOR_LOOKUP_FIELD = 'alx-lookup-field';

const IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER = 'alx-page-navigation-top-container';
const IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER = 'alx-page-navigation-bottom-container';

$(document).ready(() => {
  const dependencyInjector = new DependencyInjector();
  const quickSelector = new QuickSelector();

  dependencyInjector.setTargetInstance(quickSelector).inject([
    ['$', $]
  ]);

  const nestedGroupsGenerator = new NestedGroupsGenerator();

  dependencyInjector.setTargetInstance(nestedGroupsGenerator).inject([
    ['$', $],
    ['QUICK_SELECTOR', quickSelector],
    ['PREFIX_GROUP', PREFIX_GROUP]
  ]);

  nestedGroupsGenerator.start(config.groups);

  const pageDecorator = new PageDecorator(config.globalDecoratorClasses.page);

  dependencyInjector.setTargetInstance(pageDecorator).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector],
    ['IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER', IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER],
    ['IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER', IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER]
  ]);

  pageDecorator.start(config.pageDecorators);

  const fieldDecorator = new FieldDecorator(config.globalDecoratorClasses.field).setFieldsToDecorate(nestedGroupsGenerator.getFieldIds());

  dependencyInjector.setTargetInstance(fieldDecorator).inject([
    ['$', $],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  fieldDecorator.start(config.fieldDecorators);

  const groupDecorator = new GroupDecorator(config.globalDecoratorClasses.group).setGroupsToDecorate(nestedGroupsGenerator.getGroupIds());

  dependencyInjector.setTargetInstance(groupDecorator).inject([
    ['$', $],
    ['QUICK_SELECTOR', quickSelector],
    ['PREFIX_GROUP', PREFIX_GROUP]
  ]);

  groupDecorator.start(config.groupDecorators);

  const elemRelocator = new ElemRelocator();

  dependencyInjector.setTargetInstance(elemRelocator).inject([
    ['$', $],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  elemRelocator.start(config.elemsToRelocate);

  const formEvents = new FormEvents();

  dependencyInjector.setTargetInstance(formEvents).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  formEvents.init();

  const fieldSynchronizer = new FieldSynchronizer();

  dependencyInjector.setTargetInstance(fieldSynchronizer).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector],
    ['FORM_EVENTS', formEvents],
    ['PREFIX_LOOKUP_ID', PREFIX_LOOKUP_ID],
    ['DECORATOR_LOOKUP_FIELD', DECORATOR_LOOKUP_FIELD]
  ]);

  fieldSynchronizer.init();

  const conditionals = new Conditionals();

  dependencyInjector.setTargetInstance(conditionals).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector],
    ['FORM_EVENTS', formEvents],
    ['PREFIX_GROUP', PREFIX_GROUP],
    ['DECORATOR_STATE_HIDDEN', DECORATOR_STATE_HIDDEN],
    ['DECORATOR_STATE_IGNORE', DECORATOR_STATE_IGNORE]
  ]);

  conditionals.init(config.dependencies);

  const paginator = new Paginator();

  dependencyInjector.setTargetInstance(paginator).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector],
    ['FORM_EVENTS', formEvents],
    ['PREFIX_GROUP', PREFIX_GROUP],
    ['DECORATOR_STATE_HIDDEN', DECORATOR_STATE_HIDDEN],
    ['IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER', IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER],
    ['IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER', IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER]
  ]);

  paginator.init(config.pages);

  const validator = new Validator();

  dependencyInjector.setTargetInstance(validator).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector],
    ['FORM_EVENTS', formEvents],
    ['DECORATOR_STATE_IGNORE', DECORATOR_STATE_IGNORE],
    ['PREFIX_LOOKUP_ID', PREFIX_LOOKUP_ID],
    ['DECORATOR_LOOKUP_FIELD', DECORATOR_LOOKUP_FIELD]
  ]);

  validator.init(config.validation);

  const inputMask = new InputMask();

  dependencyInjector.setTargetInstance(inputMask).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  inputMask.init(config.inputMask);

  const bugfix = new Bugfix();

  dependencyInjector.setTargetInstance(bugfix).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  bugfix.init();

  const nativeMethodOverrides = new NativeMethodOverrides();

  dependencyInjector.setTargetInstance(nativeMethodOverrides).inject([
    ['$', $],
    ['ID_FORM', ID_FORM],
    ['FORM_EVENTS', formEvents],
    ['QUICK_SELECTOR', quickSelector]
  ]);

  nativeMethodOverrides.init();

  quickSelector.emptyCache();

  require('./extra');
});