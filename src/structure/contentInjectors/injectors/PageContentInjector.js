'use strict';

const _ = require('lodash-core');
const _ContentInjectorInterface = require('./_ContentInjectorInterface');
const labeler = require('../../../helpers/labeler');

class ContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'QUICK_SELECTOR',
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

        _.set(window, ['alx', 'pageContentInjector', 'injectLogo'], this.injectLogo.bind(this));
    }

    injectHeading (_logo = '', _title = '') {
        if (_logo === '' && _title === '') {
            return;
        }

        const _$heading = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING);
        const _$headingInner = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING_INNER);
        const _$logoWrapper = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_LOGO);
        const _$headingTitle = this.ELEM_CONSTRUCTOR.createElem('text', _title, 'h1');
        const _$headingTitleWrapper = this.ELEM_CONSTRUCTOR.createWrapperDiv(this.DECORATOR_ID_HEADING_INNER_TITLE);

        _$headingTitleWrapper.append(_$headingTitle);
        _$headingInner.append(_$logoWrapper).append(_$headingTitleWrapper);
        _$heading.append(_$headingInner);

        this.QUICK_SELECTOR.getBody().prepend(_$heading);
        this.injectLogo(_logo);

        return _$heading;
    }

    injectLogo (_logo = '') {
        const _$logoWrapper = this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_LOGO);

        _$logoWrapper.empty();

        const _$logo = this.ELEM_CONSTRUCTOR.createElem(ContentInjector._isValidContent(_logo) ? 'img' : null, _logo);

        _$logoWrapper.append(_$logo);

        return _$logo;
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
        const _$saveAndLoadButtons = $('button[type="button"]').addClass(labeler.get('CLASS_BUTTON_SAVE_LOAD'));
        const _$logoutButton = $('#target_form_logout').addClass(labeler.get('CLASS_BUTTON_LOGOUT'));

        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(_$logoutButton);
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER).prepend(_$saveAndLoadButtons);

        $('#target_form_submit').remove();
    }
}

module.exports = ContentInjector;
