'use strict';

require('./FieldDecorator.scss');

const Decorator = require('./Decorator');

const _ = {
    get: require('lodash.get'),
    defaultsDeep: require('lodash.defaultsdeep')
};

const DEFAULT_GLOBAL_DECORATOR_CLASSES_FIELD = {
    field: [],
    fieldWrapperDiv: [],
    label: [],
    labelWrapperDiv: [],
    labelAndFieldWrapperDiv: []
};

const DEFAULT_DECORATOR_CONFIG_FIELD = {
    bIsLookupField: false,
    bIsTextArea: false,
    label: null,
    palceholder: null,
    helperText: {
        type: 'text',
        value: null,
        decoratorClasses: [],
        plainTextWrapper: 'p'
    },
    decoratorClasses: {
        field: [],
        fieldWrapperDiv: [],
        label: [],
        labelWrapperDiv: [],
        labelAndFieldWrapperDiv: []
    }
};

const LOCAL_DECORATOR_HELPER_TEXT = 'alx-helper-text';
const LOCAL_DECORATOR_FORM_FIELD_WRAPPER = 'alx-form-input-wrapper';
const LOCAL_DECORATOR_FORM_LABEL_WRAPPER = 'alx-form-label-wrapper';
const LOCAL_DECORATOR_NON_RESIZABLE_TEXTAREA = 'alx-non-resizable-textarea';

class FieldDecorator extends Decorator {
    constructor (_globalFieldDecoratorClasses) {
        super();

        this.globalDecoratorClasses = _.defaultsDeep({}, _globalFieldDecoratorClasses, DEFAULT_GLOBAL_DECORATOR_CLASSES_FIELD);
    }

    _markLookupField (_fieldId, _bIsLookupField) {
        if (!_bIsLookupField) {
            return;
        }

        this.QUICK_SELECTOR.getElemById(_fieldId).addClass(this.DECORATOR_LOOKUP_FIELD);
    }

    _treatFreeformAsNormalInput (_fieldId, _textAreaRows) {
        if (_textAreaRows) {
            return this.QUICK_SELECTOR.getElemById(_fieldId).attr('rows', _textAreaRows);
        }

        this.QUICK_SELECTOR.getElemById(_fieldId).addClass(LOCAL_DECORATOR_NON_RESIZABLE_TEXTAREA);
    }

    _decorateFieldWithHelperClasses (_fieldId) {
        this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId).addClass(LOCAL_DECORATOR_FORM_FIELD_WRAPPER);
        this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId).addClass(LOCAL_DECORATOR_FORM_LABEL_WRAPPER);
        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId)
            .addClass(this.DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER)
            .attr('data-input-id', this.QUICK_SELECTOR.getElemById(_fieldId).attr('id'));
    }

    _decorateFieldRelatedElems (_fieldId, _localDecoratorClasses) {
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getElemById(_fieldId), 'field', _localDecoratorClasses.field);
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId), 'fieldWrapperDiv', _localDecoratorClasses.fieldWrapperDiv);
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelOfField(_fieldId), 'label', _localDecoratorClasses.label);
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId), 'labelWrapperDiv', _localDecoratorClasses.labelWrapperDiv);
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId), 'labelAndFieldWrapperDiv', _localDecoratorClasses.labelAndFieldWrapperDiv);
    }

    _replaceFieldLabel (_fieldId, _newLabel) {
        if (!_newLabel) {
            return;
        }

        return this.QUICK_SELECTOR.getLabelOfField(_fieldId).text(_newLabel);
    }

    _replaceFieldPlaceholder (_fieldId, _placeholder) {
        if (!_placeholder) {
            return;
        }

        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$field.is('textarea') || _$field.is('input')) {
            return _$field.attr('placeholder', _placeholder);
        }
    }

    _appendHelperTextToField (_fieldId, _helperTextConfig) {
        if (!_helperTextConfig.value) {
            return;
        }

        const _$helperText = this._generateDecoratedElem('helperText', null, _helperTextConfig);

        _$helperText.addClass(LOCAL_DECORATOR_HELPER_TEXT);

        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId).append(_$helperText);
    }

    setFieldsToDecorate (_fieldIds) {
        this.fieldIds = _fieldIds;

        return this;
    }

    start (_fieldDecoratorsConfig) {
        this.fieldIds.forEach(_fieldId => {
            const _fieldDecoratorConfig = FieldDecorator._generateDecoratorConfig(_fieldDecoratorsConfig, _fieldId);

            this._markLookupField(_fieldId, _fieldDecoratorConfig.bIsLookupField);
            this._treatFreeformAsNormalInput(_fieldId, _fieldDecoratorConfig.textAreaRows);
            this._decorateFieldRelatedElems(_fieldId, _fieldDecoratorConfig.decoratorClasses);
            this._decorateFieldWithHelperClasses(_fieldId);
            this._replaceFieldLabel(_fieldId, _fieldDecoratorConfig.label);
            this._replaceFieldPlaceholder(_fieldId, _fieldDecoratorConfig.placeholder);
            this._appendHelperTextToField(_fieldId, _fieldDecoratorConfig.helperText);
        });

        return this;
    }

    static _generateDecoratorConfig (_fieldDecoratorsConfig, _fieldId) {
        const _config = _.get(_fieldDecoratorsConfig, _fieldId, null);

        if (!_config) {
            return DEFAULT_DECORATOR_CONFIG_FIELD;
        }

        return _.defaultsDeep({}, _config, DEFAULT_DECORATOR_CONFIG_FIELD);
    }
}

module.exports = FieldDecorator;
