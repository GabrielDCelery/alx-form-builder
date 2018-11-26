'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class ContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'COLOUR_APPENDER',
            'ELEM_CONSTRUCTOR',
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
        if (_logo === '' && _title === '') {
            return;
        }

        const _$heading = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING);
        const _$headingInner = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING_INNER);
        const _$logo = this.ELEM_CONSTRUCTOR.createElem(ContentInjector._isValidContent(_logo) ? 'img' : null, _logo);
        const _$logoWrapper = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_LOGO);
        const _$headingTitle = this.ELEM_CONSTRUCTOR.createElem('text', _title, 'h1');
        const _$headingTitleWrapper = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING_INNER_TITLE);

        this.COLOUR_APPENDER
            .setElems(_$headingTitle)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_PAGE_TITLE);

        _$logoWrapper.append(_$logo);
        _$headingTitleWrapper.append(_$headingTitle);
        _$headingInner.append(_$logoWrapper).append(_$headingTitleWrapper);
        _$heading.append(_$headingInner);

        this.QUICK_SELECTOR.getBody().prepend(_$heading);

        return _$heading;
    }

    injectMain (_title = '') {
        const _$main = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_MAIN);
        const _$mainInner = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_MAIN_INNER);

        _$main.wrapInner(_$mainInner);
        _$mainInner.wrapInner(this.QUICK_SELECTOR.getForm().parent());

        this.QUICK_SELECTOR.getBody().prepend(_$main);

        return _$main;
    }

    injectFooter (_title = '') {
        if (_title === '') {
            return;
        }

        const _$footer = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_FOOTER);
        const _$footerInner = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_FOOTER_INNER);
        const _$footerInnerTitle = this.ELEM_CONSTRUCTOR.createElem('text', _title, 'h2');

        this.QUICK_SELECTOR.getBody().append(_$footer.append(_$footerInner.append(_$footerInnerTitle)));

        return _$footer;
    }

    injectNavBarContainers () {
        const _$topNavBarContainer = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER);
        const _$bottomNavBarContainer = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER);

        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN).before(_$topNavBarContainer);
        this.QUICK_SELECTOR.getForm().append(_$bottomNavBarContainer);
    }

    injectSaveAndLoadButtonContainer () {
        const _$container = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER);
        const _$helperText = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT);

        _$container.append(_$helperText);

        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN_INNER).append(_$container.append(_$helperText));

        return _$container;
    }

    moveButtons () {
        const _$saveAndLoadButtons = this.$('button[type="button"]');
        const _$logoutButton = this.$('#target_form_logout');

        this.COLOUR_APPENDER
            .setElems(_$saveAndLoadButtons)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_CONTROLLERS_BUTTON_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_CONTROLLERS_BUTTON_BORDER)
            .setElems(_$logoutButton)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_CONTROLLERS_BUTTON_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_CONTROLLERS_BUTTON_BORDER);

        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(_$logoutButton);
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(_$saveAndLoadButtons);
        this.$('#target_form_submit').remove();
    }
}

module.exports = ContentInjector;
