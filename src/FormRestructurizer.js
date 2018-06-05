'use strict';

const LOCAL_IDENTIFIER_LOGO_CONTAINER = 'alx-logo';
const LOCAL_IDENTIFIER_PAGE_TITLE_CONTAINER = 'alx-page-title';
const LOCAL_IDENTIFIER_FORM_TITLE_CONTAINER = 'alx-form-title-container';

class FormRestructurizer {
    _appendHeadingAndLogo(_logo, _pageTitle) {
        const _$heading = this.$('<heading/>');
        const _$logo = '<div id="logo"></div>';
        const _logoSrc = _logo.indexOf('http') === -1 ? `data:image/png;base64, ${_logo}` : _logo;

        _$heading.append('<div class="header-inner"></div>');

        this.$('.header-inner', _$heading).append(`<div id="${LOCAL_IDENTIFIER_LOGO_CONTAINER}"><img src="${_logoSrc}"></div>`);
        this.$('.header-inner', _$heading).append(`<div id="${LOCAL_IDENTIFIER_PAGE_TITLE_CONTAINER}"><h1>${_pageTitle}</h1></div>`);
        this.$('body').prepend(_$heading);
    }

    _appendMain() {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).parent().wrapAll('<div class="main-inner"></div>')
        this.QUICK_SELECTOR.getElemsByClass('main-inner').wrapAll('<main></main/>');
    }

    _appendPageNavBarContainers() {
        this.QUICK_SELECTOR.getElemsByClass('main-inner')
            .prepend(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER));
        this.QUICK_SELECTOR.getElemById(this.ID_FORM)
            .append(this.$('<div/>').attr('id', this.IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER));
    }

    _appendSaveAndLoadButtonContainer() {
        this.QUICK_SELECTOR.getElemsByClass('main-inner')
            .append(this.$('<div/>').attr('id', this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER));
    }

    _removeSubmitButton() {
        this.$('#target_form_submit').remove();
    }

    _moveButtons() {
        this.$('button[type="button"]').appendTo(`#${this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER}`)
        this.$('#target_form_logout').appendTo(`#${this.IDENTIFIER_SAVE_AND_LOAD_BUTTON_CONTAINER}`);
    }

    _appendFooter() {
        this.$('body').append(this.$('<footer/>'));
    }

    _appendFormTitle(_formTitle = '') {
        const _$elem = this.$('<div/>');

        _$elem.attr('id', LOCAL_IDENTIFIER_FORM_TITLE_CONTAINER);
        _$elem.append(`<h2>${_formTitle}</h2>`);

        this.QUICK_SELECTOR.getElemById(this.ID_FORM).prepend(_$elem);
    }

    init(_config) {
        this._appendHeadingAndLogo(_config.logo, _config.pageTitle);
        this._appendMain();
        this._appendPageNavBarContainers();
        this._appendSaveAndLoadButtonContainer();
        this._removeSubmitButton();
        this._moveButtons();
        this._appendFooter();
        this._appendFormTitle(_config.formTitle);

        return this;
    }
}

module.exports = FormRestructurizer;