'use strict';

const _ = require('lodash-core');

const NestedGroupsGenerator = require('./structure/NestedGroupsGenerator');
const TemplateAppender = require('./structure/TemplateAppender');
const FieldTypeModifier = require('./structure/FieldTypeModifier');
const ContentInjectorFactory = require('./structure/ContentInjectorFactory');

const DEFAULT_MULTIPLE_GROUPS_CONFIG = {
    titles: [],
    descriptions: []
};

const DEFAULT_MULTIPLE_FIELDS_CONFIG = {
    labels: [],
    placeholders: [],
    helperTexts: [],
    types: []
};

const DEFAULT_SINGLE_GROUP_CONFIG = {
    title: {
        type: null,
        value: null
    },
    description: {
        type: null,
        value: null
    }
};

const DEFAULT_SINGLE_FIELD_CONFIG = {
    label: null,
    placeholder: null,
    helperText: {
        type: null,
        value: null
    },
    type: {
        value: null,
        config: {}
    }
};

class StructureBuilder {
    constructor (_dependencies, _templateName) {
        this.nestedGroupsGenerator = new NestedGroupsGenerator(_dependencies);
        this.templateAppender = new TemplateAppender(_dependencies);
        this.fieldTypeModifier = new FieldTypeModifier(_dependencies);
        this.contentInjectorFactory = new ContentInjectorFactory(_dependencies);
    }

    _doPageModifications (_pageConfig) {
        this.contentInjectorFactory.getInjector('page')
            .injectMain(_pageConfig.heading)
            .injectHeading(_pageConfig.logo, _pageConfig.title)
            .injectNavBarContainers()
            .injectSaveAndLoadButtonContainer()
            .injectFooter(_pageConfig.footer)
            .moveButtons();
    }

    _doMultipleGroupModifications (_multipleGroupConfigs) {
        _.forEach(_multipleGroupConfigs.descriptions, _descriptionConfig => {
            _.forEach(_descriptionConfig.groups, _groupId => {
                this.contentInjectorFactory
                    .getInjector('group')
                    .injectDescription(_groupId, _descriptionConfig.type, _descriptionConfig.value);
            });
        });

        _.forEach(_multipleGroupConfigs.titles, _titleConfig => {
            _.forEach(_titleConfig.groups, _groupId => {
                this.contentInjectorFactory
                    .getInjector('group')
                    .injectTitle(_groupId, _titleConfig.type, _titleConfig.value);
            });
        });
    }

    _doMultipleFieldModifications (_multipleFieldConfigs) {
        _.forEach(_multipleFieldConfigs.labels, _labelConfig => {
            _.forEach(_labelConfig.fields, _fieldId => {
                this.contentInjectorFactory
                    .getInjector('field')
                    .replaceLabel(_fieldId, _labelConfig.value);
            });
        });

        _.forEach(_multipleFieldConfigs.placeholders, _placeholderConfig => {
            _.forEach(_placeholderConfig.fields, _fieldId => {
                this.contentInjectorFactory
                    .getInjector('field')
                    .replacePlaceholder(_fieldId, _placeholderConfig.value);
            });
        });

        _.forEach(_multipleFieldConfigs.helperTexts, _helperTextConfig => {
            _.forEach(_helperTextConfig.fields, _fieldId => {
                this.contentInjectorFactory
                    .getInjector('field')
                    .injectHelperText(_fieldId, _helperTextConfig.type, _helperTextConfig.value);
            });
        });

        _.forEach(_multipleFieldConfigs.types, _fieldTypeConfig => {
            _.forEach(_fieldTypeConfig.fields, _fieldId => {
                this.fieldTypeModifier.init(_fieldId, _fieldTypeConfig.type, _fieldTypeConfig.config);
            });
        });
    }

    _doSingleGroupModifications (_singleGroupConfigs) {
        _.forEach(_singleGroupConfigs, (_localGroupConfig, _groupId) => {
            const _config = _.defaultsDeep({}, _localGroupConfig, DEFAULT_SINGLE_GROUP_CONFIG);

            this.contentInjectorFactory.getInjector('group')
                .injectTitle(_groupId, _config.title.type, _config.title.value)
                .injectDescription(_groupId, _config.description.type, _config.description.value);
        });
    }

    _doSingleFieldModifications (_singleFieldConfigs) {
        _.forEach(_singleFieldConfigs, (_localFieldConfig, _fieldId) => {
            const _config = _.defaultsDeep({}, _localFieldConfig, DEFAULT_SINGLE_FIELD_CONFIG);

            this.contentInjectorFactory.getInjector('field')
                .replaceLabel(_fieldId, _config.label)
                .replacePlaceholder(_fieldId, _config.placeholder)
                .injectHelperText(_fieldId, _config.helperText.type, _config.helperText.value);
            this.fieldTypeModifier.init(_fieldId, _config.type.value, _config.type.config);
        });
    }

    build (_template, _structureConfig = {}, _contentConfig = {}) {
        this.templateAppender.setTemplate(_template);

        this.nestedGroupsGenerator
            .build(_.get(_structureConfig, 'groups', []))
            .getFieldIds()
            .forEach(_fieldId => {
                // This is necessary because the backend renders all the normal input fields as textarea
                this.fieldTypeModifier.convertTextareaToNormalInput(_fieldId);
                this.templateAppender.decorateFieldWithClasses(_fieldId);
            });

        this._doPageModifications(_contentConfig.page || {});

        const _multipleGroupConfigs = _.defaultsDeep({}, _.get(_contentConfig, ['multiple', 'groups'], {}), DEFAULT_MULTIPLE_GROUPS_CONFIG);
        const _multipleFieldConfigs = _.defaultsDeep({}, _.get(_contentConfig, ['multiple', 'fields'], {}), DEFAULT_MULTIPLE_FIELDS_CONFIG);
        const _singleGroupConfigs = _.get(_contentConfig, ['single', 'groups'], {});
        const _singleFieldConfigs = _.get(_contentConfig, ['single', 'fields'], {});

        this._doMultipleGroupModifications(_multipleGroupConfigs);
        this._doMultipleFieldModifications(_multipleFieldConfigs);
        this._doSingleGroupModifications(_singleGroupConfigs);
        this._doSingleFieldModifications(_singleFieldConfigs);

        this.templateAppender
            .decorateFormWithClasses()
            .decorateHeadingWithClasses()
            .decorateHelperTextsWithClasses()
            .decorateGroupsWithClasses()
            .decorateBackendErrorMessagesWithClasses();
    }
}

module.exports = StructureBuilder;
