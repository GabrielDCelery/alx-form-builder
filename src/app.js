'use strict';

const _ = require('lodash-core');

const DependencyInjector = require('./helpers/DependencyInjector');
const QuickSelector = require('./helpers/QuickSelector');
const FormEvents = require('./FormEvents');

const ElemConstructor = require('./styling/ElemConstructor');
const ColourAppender = require('./styling/ColourAppender');

const AjaxRequestsObserver = require('./AjaxRequestsObserver');
const Paginator = require('./Paginator');
const StructureBuilder = require('./StructureBuilder');
const StateCoordinator = require('./StateCoordinator');
const QueryStringEvaluator = require('./QueryStringEvaluator');
const TargetGroupRecordProcessor = require('./TargetGroupRecordProcessor');

const FORM_CONFIG_LOCATION = 'alx_dynamic_form_config';

const ALX_PREFIX_LOOKUP_ID = '_acl_';
const ALX_POSTFIX_LOOKUP_ID_CHOSEN = '_chosen';
const ALX_CLASS_BACKEND_ERROR = 'errorlist';

const PREFIX_GROUP = 'alx-group-';

const DECORATOR_ID_HEADING = 'alx-heading';
const DECORATOR_ID_HEADING_INNER = 'alx-heading-inner';
const DECORATOR_ID_HEADING_INNER_TITLE = 'alx-heading-inner-title';
const DECORATOR_ID_LOGO = 'alx-logo';
const DECORATOR_ID_MAIN = 'alx-main';
const DECORATOR_ID_MAIN_INNER = 'alx-main-inner';
const DECORATOR_ID_MAIN_INNER_TITLE = 'alx-main-inner-title';
const DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER = 'alx-page-navigation-top-container';
const DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER = 'alx-page-navigation-bottom-container';
const DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER = 'alx-save-load-button-container';
const DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT = 'alx-save-load-button-helper-text';
const DECORATOR_ID_FOOTER = 'alx-footer';
const DECORATOR_ID_FOOTER_INNER = 'alx-footer-inner';
const DECORATOR_ID_FOOTER_INNER_TITLE = 'alx-footer-inner-text';

const DECORATOR_FORM_FIELD_WRAPPER = 'alx-form-input-wrapper';
const DECORATOR_FORM_LABEL_WRAPPER = 'alx-form-label-wrapper';
const DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER = 'alx-form-element';
const DECORATOR_FORM_FIELD_HELPER_TEXT = 'alx-form-field-helper-text';
const DECORATOR_FORM_NON_RESIZABLE_TEXTAREA = 'alx-form-non-resizable-textarea';

const DECORATOR_CLASS_GROUP_TITLE = 'alx-group-title';
const DECORATOR_CLASS_GROUP_DESCRIPTION = 'alx-group-description';
const DECORATOR_CLASS_BACKEND_ERROR = 'alx-backend-error';
const DECORATOR_CLASS_HIDDEN = 'alx-hidden';
const DECORATOR_CLASS_IGNORE = 'alx-ignore';
const DECORATOR_CLASS_LOOKUP_FIELD = 'alx-lookup-field';

$(document).ready(() => {
    if (!window[FORM_CONFIG_LOCATION]) {
        return;
    }

    const config = typeof window[FORM_CONFIG_LOCATION] === 'string' ? JSON.parse(window[FORM_CONFIG_LOCATION]) : window[FORM_CONFIG_LOCATION];

    const quickSelector = new QuickSelector({
        DependencyInjector: DependencyInjector,
        $: $
    });
    const elemConstructor = new ElemConstructor({
        DependencyInjector: DependencyInjector,
        $: $
    });
    const colourAppender = new ColourAppender(_.get(config, ['styling', 'colours']));
    const targetGroupRecordProcessor = new TargetGroupRecordProcessor();

    const formEvents = new FormEvents({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        TARGET_GROUP_RECORD_PROCESSOR: targetGroupRecordProcessor
    });

    new AjaxRequestsObserver({
        DependencyInjector: DependencyInjector,
        $: $,
        FORM_EVENTS: formEvents
    }).init();

    new StructureBuilder({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        COLOUR_APPENDER: colourAppender,
        ELEM_CONSTRUCTOR: elemConstructor,
        ALX_CLASS_BACKEND_ERROR: ALX_CLASS_BACKEND_ERROR,
        PREFIX_GROUP: PREFIX_GROUP,
        DECORATOR_ID_HEADING: DECORATOR_ID_HEADING,
        DECORATOR_ID_HEADING_INNER: DECORATOR_ID_HEADING_INNER,
        DECORATOR_ID_HEADING_INNER_TITLE: DECORATOR_ID_HEADING_INNER_TITLE,
        DECORATOR_ID_LOGO: DECORATOR_ID_LOGO,
        DECORATOR_ID_MAIN: DECORATOR_ID_MAIN,
        DECORATOR_ID_MAIN_INNER: DECORATOR_ID_MAIN_INNER,
        DECORATOR_ID_MAIN_INNER_TITLE: DECORATOR_ID_MAIN_INNER_TITLE,
        DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER,
        DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER,
        DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER: DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER,
        DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT: DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT,
        DECORATOR_ID_FOOTER: DECORATOR_ID_FOOTER,
        DECORATOR_ID_FOOTER_INNER: DECORATOR_ID_FOOTER_INNER,
        DECORATOR_ID_FOOTER_INNER_TITLE: DECORATOR_ID_FOOTER_INNER_TITLE,
        DECORATOR_FORM_FIELD_WRAPPER: DECORATOR_FORM_FIELD_WRAPPER,
        DECORATOR_FORM_LABEL_WRAPPER: DECORATOR_FORM_LABEL_WRAPPER,
        DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER: DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER,
        DECORATOR_FORM_FIELD_HELPER_TEXT: DECORATOR_FORM_FIELD_HELPER_TEXT,
        DECORATOR_FORM_NON_RESIZABLE_TEXTAREA: DECORATOR_FORM_NON_RESIZABLE_TEXTAREA,
        DECORATOR_CLASS_GROUP_TITLE: DECORATOR_CLASS_GROUP_TITLE,
        DECORATOR_CLASS_GROUP_DESCRIPTION: DECORATOR_CLASS_GROUP_DESCRIPTION,
        DECORATOR_CLASS_BACKEND_ERROR: DECORATOR_CLASS_BACKEND_ERROR
    }).build(config.template, config.structure, config.content);

    new StateCoordinator({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        FORM_EVENTS: formEvents,
        ALX_CLASS_BACKEND_ERROR: ALX_CLASS_BACKEND_ERROR,
        ALX_PREFIX_LOOKUP_ID: ALX_PREFIX_LOOKUP_ID,
        PREFIX_GROUP: PREFIX_GROUP,
        DECORATOR_CLASS_HIDDEN: DECORATOR_CLASS_HIDDEN,
        DECORATOR_CLASS_IGNORE: DECORATOR_CLASS_IGNORE,
        DECORATOR_CLASS_LOOKUP_FIELD: DECORATOR_CLASS_LOOKUP_FIELD
    }).init(config.state);

    new Paginator({
        DependencyInjector: DependencyInjector,
        $: $,
        COLOUR_APPENDER: colourAppender,
        ELEM_CONSTRUCTOR: elemConstructor,
        PREFIX_GROUP: PREFIX_GROUP,
        QUICK_SELECTOR: quickSelector,
        FORM_EVENTS: formEvents,
        DECORATOR_CLASS_HIDDEN: DECORATOR_CLASS_HIDDEN,
        DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER,
        DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER
    }).init(config.structure.pages);

    new QueryStringEvaluator({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        FORM_EVENTS: formEvents,
        ALX_PREFIX_LOOKUP_ID: ALX_PREFIX_LOOKUP_ID,
        ALX_POSTFIX_LOOKUP_ID_CHOSEN: ALX_POSTFIX_LOOKUP_ID_CHOSEN
    }).process(window.location.href);
});
