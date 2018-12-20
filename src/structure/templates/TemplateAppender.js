'use strict';

require('./css/reset.css');
require('./css/pure.css');
require('./css/datepicker.css');
require('./css/alx-general.css');
require('./css/alx-template-default.css');
require('./css/alx-template-vertical-1.css');

const TEMPLATES = {
    default: require('./config/alx-template-default.json'),
    vertical1: require('./config/alx-template-vertical-1.json')
};

class TemplateAppender {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'ALX_CLASS_BACKEND_ERROR',
            'DECORATOR_FORM_FIELD_WRAPPER',
            'DECORATOR_FORM_LABEL_WRAPPER',
            'DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER',
            'DECORATOR_FORM_FIELD_HELPER_TEXT',
            'DECORATOR_FORM_FIELD_DESCRIPTION',
            'DECORATOR_CLASS_GROUP_TITLE',
            'DECORATOR_CLASS_GROUP_DESCRIPTION',
            'DECORATOR_CLASS_BACKEND_ERROR',
            'DECORATOR_ID_LOGO',
            'DECORATOR_ID_HEADING',
            'DECORATOR_ID_HEADING_INNER',
            'DECORATOR_ID_HEADING_INNER_TITLE',
            'DECORATOR_ID_MAIN',
            'DECORATOR_ID_MAIN_INNER',
            'DECORATOR_ID_MAIN_INNER_TITLE',
            'DECORATOR_ID_FOOTER',
            'DECORATOR_ID_FOOTER_INNER',
            'DECORATOR_ID_FOOTER_INNER_TITLE',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT',
            'DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER',
            'DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER'
        ]);
    }

    _decorateElemsWithClasses (_$elem, _classes) {
        if (_$elem.length === 0 || _classes.length === 0) {
            return _$elem;
        }

        const _toAppend = typeof _classes === 'string' ? [_classes] : _classes;

        if (_toAppend.length === 0) {
            return _$elem;
        }

        return _$elem.addClass(_toAppend.join(' '));
    }

    setTemplate (_templateName = 'default') {
        if (!TEMPLATES[_templateName]) {
            throw new Error(`Template does not exist -> ${_templateName}`);
        }

        this.template = TEMPLATES[_templateName];

        return this;
    }

    decorateBodyAndHtml () {
        this._decorateElemsWithClasses($('html'), this.template.classes.general.html);
        this._decorateElemsWithClasses($('body'), this.template.classes.general.body);

        return this;
    }

    decorateFieldWithClasses (_fieldId) {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId), this.DECORATOR_FORM_FIELD_WRAPPER);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId), this.DECORATOR_FORM_LABEL_WRAPPER);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId), this.DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(_fieldId), this.template.classes.field.field);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId), this.template.classes.field.fieldWrapperDiv);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getLabelOfField(_fieldId), this.template.classes.field.label);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId), this.template.classes.field.labelWrapperDiv);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId), this.template.classes.field.labelAndFieldWrapperDiv);

        return this;
    }

    decorateHelperTextsWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_FORM_FIELD_HELPER_TEXT), this.template.classes.field.helperText);

        return this;
    }

    decorateFieldDescriptionsWithClasses () {
        this._decorateElemsWithClasses(this.$(`.${this.DECORATOR_FORM_FIELD_DESCRIPTION}`), this.template.classes.field.description);

        return this;
    }

    decorateGroupsWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_CLASS_GROUP_TITLE), this.template.classes.group.title);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_CLASS_GROUP_DESCRIPTION), this.template.classes.group.description);

        return this;
    }

    decorateBackendErrorMessagesWithClasses () {
        const _$backendErrorList = this.QUICK_SELECTOR.getElemsByClass(this.ALX_CLASS_BACKEND_ERROR);
        const _$backendErrorListContainers = _$backendErrorList.parent();
        const _$backendErrorItems = _$backendErrorList.find('li');

        this._decorateElemsWithClasses(_$backendErrorList, this.template.classes.error.backend.list);
        this._decorateElemsWithClasses(_$backendErrorListContainers, this.DECORATOR_CLASS_BACKEND_ERROR);
        this._decorateElemsWithClasses(_$backendErrorListContainers, this.template.classes.error.backend.container);
        this._decorateElemsWithClasses(_$backendErrorItems, this.template.classes.error.backend.listItem);

        return this;
    }

    decorateFormWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getForm(), this.template.classes.page.main.form);

        return this;
    }

    decorateHeadingWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_LOGO), this.template.classes.page.heading.logo);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_HEADING), this.template.classes.page.heading.heading);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_HEADING_INNER), this.template.classes.page.heading.inner);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_HEADING_INNER_TITLE), this.template.classes.page.heading.title);

        return this;
    }

    decorateMainWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN), this.template.classes.page.main.container);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN_INNER), this.template.classes.page.main.inner);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_MAIN_INNER_TITLE), this.template.classes.page.main.title);

        return this;
    }

    decorateFooterWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_FOOTER), this.template.classes.page.footer.footer);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_FOOTER_INNER), this.template.classes.page.footer.inner);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_FOOTER_INNER_TITLE), this.template.classes.page.footer.title);

        return this;
    }

    decorateSaveAndLoadButtonWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER), this.template.classes.page.saveAndLoadButton.container);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT), this.template.classes.page.saveAndLoadButton.helperText);

        return this;
    }

    decorateNavBarsWithClasses () {
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER), this.template.classes.page.navBar.top.container);
        this._decorateElemsWithClasses(this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER), this.template.classes.page.navBar.bottom.container);

        return this;
    }
}

module.exports = TemplateAppender;
