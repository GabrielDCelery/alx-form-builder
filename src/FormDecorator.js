'use strict';

const LOCAL_IDENTIFIER_LOGO_CONTAINER = 'alx-logo';
const LOCAL_IDENTIFIER_PAGE_TITLE_CONTAINER = 'alx-page-title';

class FormDecorator {
    _removeSubmitButton() {
        this.$('#target_form_submit').remove();
    }

    _appendHeadingAndLogo(_config) {
        const _$heading = this.$('<heading/>');
        const _$logo = '<div id="logo"></div>';

        const _logoSrc = _config.logo.indexOf('http') === -1 ? `data:image/png;base64, ${_config.logo}` : _config.logo;

        _$heading.append(`<div id="${LOCAL_IDENTIFIER_LOGO_CONTAINER}"><img src="${_logoSrc}"></div>`);
        _$heading.append(`<div id="${LOCAL_IDENTIFIER_PAGE_TITLE_CONTAINER}"><h1>${_config.pageTitle}</h1></div>`);

        this.$('body').prepend(_$heading);
    }

    _appendMain() {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).parent().wrapAll('<main/>')
    }

    _appendFooter() {
        this.$('body').append(this.$('<footer/>'));
    }

    _appendPageNavBarContainers() {
        this.$('main').prepend(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER));
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).append(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER));
    }

    _appendSaveAndLoadButtonContainers() {
        this.$('main').append(this.$('<div/>').attr('id', this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER));
    }

    _moveButtons() {
        this.$('button[type="button"]').appendTo(`#${this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER}`)
        this.$('#target_form_logout').appendTo(`#${this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER}`);
    }

    _appendFormTitle(_formTitle = '') {
        const _$elem = this.$('<div/>');

        _$elem.attr('id', this.IDENTIFIER_FORM_TITLE_CONTAINER);
        _$elem.append(`<h2>${_formTitle}</h2>`);

        this.QUICK_SELECTOR.getElemById(this.ID_FORM).prepend(_$elem);
    }

    init(_config) {
        this._removeSubmitButton();
        this._appendHeadingAndLogo(_config);
        this._appendMain();
        this._appendPageNavBarContainers();
        this._appendSaveAndLoadButtonContainers();
        this._moveButtons();
        this._appendFooter();
        this._appendFormTitle(_config.formTitle);

        return this;
    }
}

module.exports = FormDecorator;