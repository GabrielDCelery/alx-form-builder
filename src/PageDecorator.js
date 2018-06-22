'use strict';

const Decorator = require('./Decorator');

const _ = {
    get: require('lodash.get'),
    defaultsDeep: require('lodash.defaultsdeep')
}

const DEFAULT_GLOBAL_DECORATOR_CLASSES_PAGE = {
    form: [],
    logo: [],
    heading: [],
    headingInner: [],
    headingInnerTitle: [],
    main: [],
    mainInner: [],
    mainInnerTitle: [],
    footer: [],
    footerInner: [],
    footerInnerTitle: [],
    saveAndLoadButtonContainer: [],
    saveAndLoadButtonHelperText: []
};

const LOCAL_IDENTIFIER_BODY = 'alx-body';
const LOCAL_IDENTIFIER_HEADING = 'alx-heading';
const LOCAL_IDENTIFIER_HEADING_INNER = 'alx-heading-inner';
const LOCAL_IDENTIFIER_LOGO = 'alx-logo';
const LOCAL_IDENTIFIER_HEADING_INNER_TITLE = 'alx-heading-inner-title';
const LOCAL_IDENTIFIER_MAIN = 'alx-main';
const LOCAL_IDENTIFIER_MAIN_INNER = 'alx-main-inner';
const LOCAL_IDENTIFIER_MAIN_INNER_TITLE = 'alx-main-inner-title';
const LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER = 'alx-save-load-button-container';
const LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_HELPER_TEXT = 'alx-save-load-button-helper-text';
const LOCAL_IDENTIFIER_FOOTER = 'alx-footer';
const LOCAL_IDENTIFIER_FOOTER_INNER = 'alx-footer-inner';
const LOCAL_IDENTIFIER_FOOTER_INNER_TITLE = 'alx-footer-inner-text';

const DEFAULT_CONTENT_CONFIG_LOGO = {
    type: 'img',
    value: null,
    localDecoratorClasses: {
        logo: []
    },
    plainTextWrapper: null
};

const DEFAULT_DECORATOR_CONFIG_HEADING_TITLE = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'h1'
};

const DEFAULT_DECORATOR_CONFIG_MAIN_TITLE = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'h1'
};

const DEFAULT_DECORATOR_CONFIG_SAVE_AND_LOAD_BUTTON_HELPER_TEXT = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'p'
};

const DEFAULT_DECORATOR_CONFIG_FOOTER_TITLE = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'p'
};

class FormDecorator extends Decorator {
    constructor(_globalDecoratorClasses) {
        super();

        this.globalDecoratorClasses = _.defaultsDeep({}, _globalDecoratorClasses, DEFAULT_GLOBAL_DECORATOR_CLASSES_PAGE);
    }

    _generateHeading(_logoConfig, _headingTitleConfig) {
        const _$heading = this._generateDecoratedDivWithContent('heading', LOCAL_IDENTIFIER_HEADING, {});
        const _$headingInner = this._generateDecoratedDivWithContent('headingInner', LOCAL_IDENTIFIER_HEADING_INNER, {});
        const _$logo = this._generateDecoratedDivWithContent('logo', LOCAL_IDENTIFIER_LOGO, _logoConfig);
        const _$headingTitle = this._generateDecoratedDivWithContent('headingTitle', LOCAL_IDENTIFIER_HEADING_INNER_TITLE, _headingTitleConfig);

        _$headingInner.append(_$logo).append(_$headingTitle);
        _$heading.append(_$headingInner);

        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_BODY).prepend(_$heading);
    }

    _generateMain(_mainTitleConfig) {
        const _$main = this._generateDecoratedDivWithContent('main', LOCAL_IDENTIFIER_MAIN, {});
        const _$mainInner = this._generateDecoratedDivWithContent('mainInner', LOCAL_IDENTIFIER_MAIN_INNER, {});
        const _$mainInnerTitle = this._generateDecoratedDivWithContent('mainTitle', LOCAL_IDENTIFIER_MAIN_INNER_TITLE, _mainTitleConfig);

        _$main.wrapInner(_$mainInner);
        _$mainInner.wrapInner(this.QUICK_SELECTOR.getElemById(this.ID_FORM).parent());
        _$mainInner.prepend(_$mainInnerTitle);

        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_BODY).prepend(_$main);
    }

    _generateSaveAndLoadButtonContainer(_saveAndLoadButtonHelperTextConfig) {
        const _$container = this._generateDecoratedDivWithContent('saveAndLoadButtonContainer', LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER, {});
        const _$helperText = this._generateDecoratedDivWithContent('saveAndLoadButtonHelperText', LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_HELPER_TEXT, _saveAndLoadButtonHelperTextConfig);

        _$container.append(_$helperText);

        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_MAIN).after(_$container);
    }

    _generateFooter(_footerTitleConfig) {
        const _$footer = this._generateDecoratedDivWithContent('footer', LOCAL_IDENTIFIER_FOOTER, {});
        const _$footerInner = this._generateDecoratedDivWithContent('footerInner', LOCAL_IDENTIFIER_FOOTER_INNER, {});
        const _$footerInnerTitle = this._generateDecoratedDivWithContent('footerInnerTitle', LOCAL_IDENTIFIER_FOOTER_INNER_TITLE, _footerTitleConfig);

        _$footerInner.append(_$footerInnerTitle);
        _$footer.append(_$footerInner);

        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_BODY).append(_$footer);
    }

    _moveButtons() {
        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(this.$('#target_form_logout'));
        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(this.$('button[type="button"]'));
    }

    _removeSubmitButton() {
        this.$('#target_form_submit').remove();
    }

    _appendPageNavBarContainers() {
        this.QUICK_SELECTOR.getElemById(LOCAL_IDENTIFIER_MAIN).before(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER));
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).append(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER));
    }

    start(_pageDecoratorsConfig) {
        const _mainTitleConfig = FormDecorator._generateDecoratorConfig(_pageDecoratorsConfig, 'mainTitle', DEFAULT_DECORATOR_CONFIG_MAIN_TITLE);
        const _logoConfig = FormDecorator._generateDecoratorConfig(_pageDecoratorsConfig, 'logo', DEFAULT_CONTENT_CONFIG_LOGO);
        const _headingTitleConfig = FormDecorator._generateDecoratorConfig(_pageDecoratorsConfig, 'headingTitle', DEFAULT_DECORATOR_CONFIG_HEADING_TITLE);
        const _saveAndLoadButtonHelperTextConfig = FormDecorator._generateDecoratorConfig(_pageDecoratorsConfig, 'saveAndLoadButtonHelperText', DEFAULT_DECORATOR_CONFIG_SAVE_AND_LOAD_BUTTON_HELPER_TEXT);
        const _footerTitleConfig = FormDecorator._generateDecoratorConfig(_pageDecoratorsConfig, 'footerTitle', DEFAULT_DECORATOR_CONFIG_FOOTER_TITLE);

        this.$('body').attr('id', LOCAL_IDENTIFIER_BODY);
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getElemById(this.ID_FORM), 'form');
        this._generateMain(_mainTitleConfig);
        this._generateHeading(_logoConfig, _headingTitleConfig);
        this._appendPageNavBarContainers();
        this._generateSaveAndLoadButtonContainer(_saveAndLoadButtonHelperTextConfig);
        this._generateFooter(_footerTitleConfig);
        this._moveButtons();
        this._removeSubmitButton();
    }

    static _generateDecoratorConfig(_config, _name, _defaultValue) {
        return _.defaultsDeep({}, _.get(_config, _name, null), _defaultValue);
    }
}

module.exports = FormDecorator;