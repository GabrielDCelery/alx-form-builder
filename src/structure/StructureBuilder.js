'use strict';

const _ = require('lodash-core');

const NestedGroupsGenerator = require('./layout/NestedGroupsGenerator');
const TemplateAppender = require('./templates/TemplateAppender');
const FieldTypeFactory = require('./fieldTypes/FieldTypeFactory');
const ContentInjectorFactory = require('./contentInjectors/ContentInjectorFactory');

const DEFAULT_MULTIPLE_GROUPS_CONFIG = {
    headings: [],
    descriptions: []
};

const DEFAULT_MULTIPLE_FIELDS_CONFIG = {
    labels: [],
    placeholders: [],
    helperTexts: [],
    types: []
};

const DEFAULT_SINGLE_GROUP_CONFIG = {
    heading: {
        type: null,
        value: null
    },
    description: {
        type: null,
        value: null
    },
    descriptionAfter: {
        type: null,
        value: null
    }
};

const DEFAULT_SINGLE_FIELD_CONFIG = {
    label: null,
    placeholder: null,
    helperText: {
        type: 'text',
        value: null
    },
    type: {
        value: null,
        config: {}
    }
};

class StructureBuilder {
    constructor (_dependencies, _templateName) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'FORM_EVENTS',
            'QUICK_SELECTOR',
            'DECORATOR_CLASS_INPUT_TYPE_CHECKBOX',
            'DECORATOR_CLASS_BACKEND_ERROR'
        ]);

        this.nestedGroupsGenerator = new NestedGroupsGenerator(_dependencies);
        this.templateAppender = new TemplateAppender(_dependencies);
        this.contentInjectorFactory = new ContentInjectorFactory(_dependencies);

        _dependencies.CONTENT_INJECTOR_FACTORY = this.contentInjectorFactory;
        _dependencies.TEMPLATE_APPENDER = this.templateAppender;

        this.fieldTypeFactory = new FieldTypeFactory(_dependencies);
    }

    _initGlobalEventListeners () {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHANGE_FIELD_TYPE, (_event) => {
            _event.preventDefault();

            _.forEach(this.multipleFieldConfigs.types, _fieldTypeConfig => {
                _.forEach(_fieldTypeConfig.ids, _fieldId => {
                    this.fieldTypeFactory.init(_fieldId, _fieldTypeConfig.type, _fieldTypeConfig.config);
                });
            });

            _.forEach(this.singleFieldConfigs, (_localFieldConfig, _fieldId) => {
                const _config = _.defaultsDeep({}, _localFieldConfig, DEFAULT_SINGLE_FIELD_CONFIG);
                const _fieldTypeConfig = StructureBuilder._normalizeFieldTypeConfig(_config.type);

                this.fieldTypeFactory.init(_fieldId, _fieldTypeConfig.value, _fieldTypeConfig.config);
            });
        });
    }

    _markSpecialFieldType (_fieldId) {
        const _$elem = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$elem.attr('type') === 'checkbox') {
            this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId).addClass(this.DECORATOR_CLASS_INPUT_TYPE_CHECKBOX);
        }
    }

    _doPageModifications (_pageConfig) {
        const _pageContentInjector = this.contentInjectorFactory.getInjector('page');

        _pageContentInjector.injectMain(_pageConfig.heading);
        _pageContentInjector.injectHeading(_pageConfig.logo, _pageConfig.title);
        _pageContentInjector.injectNavBarContainers();
        _pageContentInjector.injectSaveAndLoadButtonContainer();
        _pageContentInjector.injectFooter(_pageConfig.footer);
        _pageContentInjector.moveButtons();
    }

    _doMultipleGroupModifications () {
        const _groupContentInjector = this.contentInjectorFactory.getInjector('group');

        _.forEach(this.multipleGroupConfigs.descriptions, _descriptionConfig => {
            _.forEach(_descriptionConfig.ids, _groupId => {
                _groupContentInjector.injectDescription(_groupId, _descriptionConfig.type || 'text', _descriptionConfig.value);
            });
        });

        _.forEach(this.multipleGroupConfigs.headings, _titleConfig => {
            _.forEach(_titleConfig.ids, _groupId => {
                _groupContentInjector.injectTitle(_groupId, _titleConfig.type || 'text', _titleConfig.value);
            });
        });
    }

    _doMultipleFieldModifications () {
        const _fieldContentInjector = this.contentInjectorFactory.getInjector('field');

        _.forEach(this.multipleFieldConfigs.labels, _labelConfig => {
            _.forEach(_labelConfig.ids, _fieldId => {
                _fieldContentInjector.replaceLabel(_fieldId, _labelConfig.value);
            });
        });

        _.forEach(this.multipleFieldConfigs.placeholders, _placeholderConfig => {
            _.forEach(_placeholderConfig.ids, _fieldId => {
                _fieldContentInjector.replacePlaceholder(_fieldId, _placeholderConfig.value);
            });
        });

        _.forEach(this.multipleFieldConfigs.helperTexts, _helperTextConfig => {
            _.forEach(_helperTextConfig.ids, _fieldId => {
                _fieldContentInjector.injectHelperText(_fieldId, _helperTextConfig.type || 'text', _helperTextConfig.value);
            });
        });

        _.forEach(this.multipleFieldConfigs.types, _fieldTypeConfig => {
            _.forEach(_fieldTypeConfig.ids, _fieldId => {
                this.fieldTypeFactory.init(_fieldId, _fieldTypeConfig.type, _fieldTypeConfig.config);
            });
        });
    }

    _doSingleGroupModifications () {
        const _groupContentInjector = this.contentInjectorFactory.getInjector('group');

        _.forEach(this.singleGroupConfigs, (_localGroupConfig, _groupId) => {
            const _config = _.defaultsDeep({}, _localGroupConfig, DEFAULT_SINGLE_GROUP_CONFIG);

            const _heading = StructureBuilder._normalizeContentInjectionConfig(_config.heading);
            const _description = StructureBuilder._normalizeContentInjectionConfig(_config.description);
            const _descriptionAfter = StructureBuilder._normalizeContentInjectionConfig(_config.descriptionAfter);

            _groupContentInjector.injectDescriptionAfter(_groupId, _descriptionAfter.type, _descriptionAfter.value);
            _groupContentInjector.injectDescription(_groupId, _description.type, _description.value);
            _groupContentInjector.injectTitle(_groupId, _heading.type, _heading.value);
        });
    }

    _doSingleFieldModifications () {
        const _fieldContentInjector = this.contentInjectorFactory.getInjector('field');

        _.forEach(this.singleFieldConfigs, (_localFieldConfig, _fieldId) => {
            const _config = _.defaultsDeep({}, _localFieldConfig, DEFAULT_SINGLE_FIELD_CONFIG);
            const _helperText = StructureBuilder._normalizeContentInjectionConfig(_config.helperText);

            _fieldContentInjector.replaceLabel(_fieldId, _config.label);
            _fieldContentInjector.replacePlaceholder(_fieldId, _config.placeholder);
            _fieldContentInjector.injectHelperText(_fieldId, _helperText.type, _helperText.value);

            const _fieldTypeConfig = StructureBuilder._normalizeFieldTypeConfig(_config.type);

            this.fieldTypeFactory.init(_fieldId, _fieldTypeConfig.value, _fieldTypeConfig.config);
        });
    }

    build (_template, _structureConfig = {}, _contentConfig = {}) {
        this.templateAppender.setTemplate(_template);

        this.nestedGroupsGenerator
            .build(_.get(_structureConfig, 'groups', []))
            .getFieldIds()
            .forEach(_fieldId => {
                this.fieldTypeFactory.convertTextareaToNormalInput(_fieldId); // This is necessary because the backend renders all the normal input fields as textarea
                this.templateAppender.decorateFieldWithClasses(_fieldId);
                this._markSpecialFieldType(_fieldId);
            });

        this._doPageModifications(_contentConfig.page || {});

        this.multipleGroupConfigs = _.defaultsDeep({}, _.get(_contentConfig, ['multiple', 'groups'], {}), DEFAULT_MULTIPLE_GROUPS_CONFIG);
        this.multipleFieldConfigs = _.defaultsDeep({}, _.get(_contentConfig, ['multiple', 'fields'], {}), DEFAULT_MULTIPLE_FIELDS_CONFIG);
        this.singleGroupConfigs = _.get(_contentConfig, ['single', 'groups'], {});
        this.singleFieldConfigs = _.get(_contentConfig, ['single', 'fields'], {});

        this._doMultipleGroupModifications();
        this._doMultipleFieldModifications();
        this._doSingleGroupModifications();
        this._doSingleFieldModifications();

        this.templateAppender
            .decorateBodyAndHtml()
            .decorateFormWithClasses()
            .decorateHeadingWithClasses()
            .decorateHelperTextsWithClasses()
            .decorateFieldDescriptionsWithClasses()
            .decorateMainWithClasses()
            .decorateGroupsWithClasses()
            .decorateBackendErrorMessagesWithClasses()
            .decorateNavBarsWithClasses();

        this._initGlobalEventListeners();

        this.QUICK_SELECTOR.getForm().removeClass(this.DECORATOR_CLASS_BACKEND_ERROR); // Fix for backend error
    }

    static _normalizeContentInjectionConfig (_config) {
        if (typeof _config === 'string') {
            return {
                type: 'text',
                value: _config
            };
        }

        return _config;
    }

    static _normalizeFieldTypeConfig (_config) {
        if (typeof _config === 'string') {
            return {
                value: _config,
                config: {}
            };
        }

        return _config;
    }
}

module.exports = StructureBuilder;
