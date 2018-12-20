'use strict';

const _ = require('lodash-core');

const DependencyInjector = require('./helpers/DependencyInjector');
const quickSelector = require('./helpers/quickSelector');
const ElemConstructor = require('./helpers/ElemConstructor');
const colourAppender = require('./helpers/colourAppender');

const FormEvents = require('./FormEvents');
const FormState = require('./FormState');
const AlxAjaxRequestsProcessor = require('./AlxAjaxRequestsProcessor');

const StructureBuilder = require('./structure/StructureBuilder');
const StateCoordinator = require('./state/StateCoordinator');

const FORM_CONFIG_LOCATION = 'alx_dynamic_form_config';

const ALX_PREFIX_LOOKUP_ID = '_acl_';
const ALX_CLASS_BACKEND_ERROR = 'errorlist';
const ALX_ID_API_KEY_FIELD = 'id_api_key';

const PREFIX_GROUP = 'alx-group-';
const PREFIX_FIELD_ID = 'id_';

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
const DECORATOR_FORM_FIELD_DESCRIPTION = 'alx-form-field-description';
const DECORATOR_FORM_NON_RESIZABLE_TEXTAREA = 'alx-form-non-resizable-textarea';

const DECORATOR_CLASS_GROUP_TITLE = 'alx-group-title';
const DECORATOR_CLASS_GROUP_DESCRIPTION = 'alx-group-description';
const DECORATOR_CLASS_BACKEND_ERROR = 'alx-backend-error';
const DECORATOR_CLASS_HIDDEN = 'alx-hidden';
const DECORATOR_CLASS_IGNORE = 'alx-ignore';
const DECORATOR_CLASS_LOOKUP_FIELD = 'alx-lookup-field';

const DECORATOR_CLASS_INPUT_TYPE_CHECKBOX = 'alx-checkbox';

$(document).ready(() => {
    const config = window[FORM_CONFIG_LOCATION] === 'string' ? JSON.parse(window[FORM_CONFIG_LOCATION]) : window[FORM_CONFIG_LOCATION] || {};

    const elemConstructor = new ElemConstructor({
        DependencyInjector: DependencyInjector,
        $: $
    });

    colourAppender.appendConfig(_.get(config, ['styling', 'colours']));

    const formState = new FormState();
    const formEvents = new FormEvents({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        FORM_STATE: formState
    });

    new AlxAjaxRequestsProcessor({
        DependencyInjector: DependencyInjector,
        $: $,
        FORM_EVENTS: formEvents
    }).init(config.targetGroups);

    new StructureBuilder({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        FORM_EVENTS: formEvents,
        COLOUR_APPENDER: colourAppender,
        ELEM_CONSTRUCTOR: elemConstructor,
        ALX_CLASS_BACKEND_ERROR: ALX_CLASS_BACKEND_ERROR,
        ALX_ID_API_KEY_FIELD: ALX_ID_API_KEY_FIELD,
        PREFIX_GROUP: PREFIX_GROUP,
        PREFIX_FIELD_ID: PREFIX_FIELD_ID,
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
        DECORATOR_FORM_FIELD_DESCRIPTION: DECORATOR_FORM_FIELD_DESCRIPTION,
        DECORATOR_FORM_NON_RESIZABLE_TEXTAREA: DECORATOR_FORM_NON_RESIZABLE_TEXTAREA,
        DECORATOR_CLASS_GROUP_TITLE: DECORATOR_CLASS_GROUP_TITLE,
        DECORATOR_CLASS_GROUP_DESCRIPTION: DECORATOR_CLASS_GROUP_DESCRIPTION,
        DECORATOR_CLASS_BACKEND_ERROR: DECORATOR_CLASS_BACKEND_ERROR,
        DECORATOR_CLASS_INPUT_TYPE_CHECKBOX: DECORATOR_CLASS_INPUT_TYPE_CHECKBOX
    }).build(config.template, config.structure, config.content);

    new StateCoordinator({
        DependencyInjector: DependencyInjector,
        $: $,
        QUICK_SELECTOR: quickSelector,
        FORM_EVENTS: formEvents,
        FORM_STATE: formState,
        ELEM_CONSTRUCTOR: elemConstructor,
        ALX_CLASS_BACKEND_ERROR: ALX_CLASS_BACKEND_ERROR,
        ALX_PREFIX_LOOKUP_ID: ALX_PREFIX_LOOKUP_ID,
        PREFIX_GROUP: PREFIX_GROUP,
        DECORATOR_CLASS_HIDDEN: DECORATOR_CLASS_HIDDEN,
        DECORATOR_CLASS_IGNORE: DECORATOR_CLASS_IGNORE,
        DECORATOR_CLASS_LOOKUP_FIELD: DECORATOR_CLASS_LOOKUP_FIELD,
        DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER,
        DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER: DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER
    }).init(config.state, config.structure, config.plugins);

    (() => {
        const viewPortTag = document.createElement('meta');

        viewPortTag.id = 'viewport';
        viewPortTag.name = 'viewport';
        viewPortTag.content = 'width=device-width, initial-scale=1';
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
    })();
});
