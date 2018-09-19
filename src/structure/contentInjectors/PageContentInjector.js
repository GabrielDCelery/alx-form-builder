'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class ContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'DECORATOR_ID_HEADING',
            'DECORATOR_ID_HEADING_INNER',
            'DECORATOR_ID_LOGO',
            'DECORATOR_ID_HEADING_INNER_TITLE',
            'DECORATOR_ID_MAIN',
            'DECORATOR_ID_MAIN_INNER',
            'DECORATOR_ID_MAIN_INNER_TITLE',
            'DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER',
            'DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT',
            'DECORATOR_ID_FOOTER',
            'DECORATOR_ID_FOOTER_INNER',
            'DECORATOR_ID_FOOTER_INNER_TITLE'
        ]);
    }

    injectHeading (_logo = '', _title = '') {
        const _$heading = this._generateWrapperDiv(this.DECORATOR_ID_HEADING);
        const _$headingInner = this._generateWrapperDiv(this.DECORATOR_ID_HEADING_INNER);
        const _$logo = this._generateContent(ContentInjector._isValidContent(_logo) ? 'img' : null, _logo);
        const _$logoWrapper = this._generateWrapperDiv(this.DECORATOR_ID_LOGO);
        const _$headingTitle = this._generateContent('text', _title, 'h1');
        const _$headingTitleWrapper = this._generateWrapperDiv(this.DECORATOR_ID_HEADING_INNER_TITLE);

        _$logoWrapper.append(_$logo);
        _$headingTitleWrapper.append(_$headingTitle);
        _$headingInner.append(_$logoWrapper).append(_$headingTitleWrapper);
        _$heading.append(_$headingInner);

        this.QUICK_SELECTOR.getBody().prepend(_$heading);

        return this;
    }

    injectMain (_title = '') {
        const _$main = this._generateWrapperDiv(this.DECORATOR_ID_MAIN);
        const _$mainInner = this._generateWrapperDiv(this.DECORATOR_ID_MAIN_INNER);
        const _$mainInnerTitle = this._generateContent('text', _title, 'h1');

        _$main.wrapInner(_$mainInner);
        _$mainInner.wrapInner(this.QUICK_SELECTOR.getForm().parent());
        _$mainInner.prepend(_$mainInnerTitle);

        this.QUICK_SELECTOR.getBody().prepend(_$main);

        return this;
    }

    injectFooter (_title = '') {
        const _$footer = this._generateWrapperDiv(this.DECORATOR_ID_FOOTER);
        const _$footerInner = this._generateWrapperDiv(this.DECORATOR_ID_FOOTER_INNER);
        const _$footerInnerTitle = this._generateContent('text', _title, 'h2');

        this.QUICK_SELECTOR.getBody().append(_$footer.append(_$footerInner.append(_$footerInnerTitle)));

        return this;
    }

    injectNavBarContainers () {
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN).before(this._generateWrapperDiv(this.DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER));
        this.QUICK_SELECTOR.getForm().append(this._generateWrapperDiv(this.DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER));

        return this;
    }

    injectSaveAndLoadButtonContainer () {
        const _$container = this._generateWrapperDiv(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER);
        const _$helperText = this._generateWrapperDiv(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT);

        _$container.append(_$helperText);

        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN).after(_$container.append(_$helperText));

        return this;
    }

    moveButtons () {
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(this.$('#target_form_logout'));
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(this.$('button[type="button"]'));
        this.$('#target_form_submit').remove();

        return this;
    }
}

module.exports = ContentInjector;
