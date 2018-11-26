'use strict';

require('jquery-validation');
require('./Validator.scss');

const _ = require('lodash-core');

const LOCAL_DECORATOR_CLASS_REQUIRED = 'alx-required';
const LOCAL_DECORATOR_CLASS_TRIGGER_VALIDATE_FIELD = 'alx-validate-field';
const LOCAL_DECORATOR_CLASS_DOCUMENT_FIELD = 'alx-document-field';
const LOCAL_DECORATOR_DATA_OLD_VALUE = 'alx-old-value';

class Validator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'FORM_EVENTS',
            'ALX_PREFIX_LOOKUP_ID',
            'ALX_CLASS_BACKEND_ERROR',
            'DECORATOR_CLASS_IGNORE',
            'DECORATOR_CLASS_LOOKUP_FIELD'
        ]);

        this._validateField = this._validateField.bind(this);
        this._validateForm = this._validateForm.bind(this);

        this._extendValidatiorPluginWithCustomValidators();
        this._initValidatorPlugin();
        this._excludeLookupSelectsFromValidation();
        this._checkForBackendErrors();
        this._initGlobalEventListeners();
    }

    _extendValidatiorPluginWithCustomValidators () {
        this.$.validator.addMethod('pattern', (_value, _elem, _params) => {
            return new RegExp(_params).test(_value);
        }, 'Please enter a valid value in the correct format!');
    }

    _initValidatorPlugin () {
        this.QUICK_SELECTOR.getForm().validate({
            ignore: `.${this.DECORATOR_CLASS_IGNORE}`,
            success: _label => {
                return _label.remove();
            }
        });
    }

    _excludeLookupSelectsFromValidation () {
        this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_CLASS_LOOKUP_FIELD).each((_index, _field) => {
            const _lookupFieldId = `${this.ALX_PREFIX_LOOKUP_ID}${this.$(_field).attr('id')}`;

            return this.QUICK_SELECTOR.getElemById(_lookupFieldId).addClass(`${this.DECORATOR_CLASS_IGNORE}`);
        });
    }

    _checkForBackendErrors () {
        const _$backendErrors = this.QUICK_SELECTOR.getElemsByClass(this.ALX_CLASS_BACKEND_ERROR);

        if (_$backendErrors.length > 0) {
            return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_BACKEND_ERRORED, [_$backendErrors]);
        }
    }

    _initGlobalEventListeners () {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_VALIDATE_FORM, (_event, _bForSubmission) => {
            _event.preventDefault();

            return this._validateForm(_bForSubmission);
        });

        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_VALIDATE_FIELD, (_event, _fieldId) => {
            _event.preventDefault();

            return this._validateField(this.QUICK_SELECTOR.getElemById(_fieldId));
        });
    }

    _ignoreDocumentFieldIfHasAttachment (_$field) {
        if (_$field.attr('type') !== 'file') {
            return;
        }

        _$field.removeClass(this.DECORATOR_CLASS_IGNORE);

        const _bDocumentAttached = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_$field.attr('id'))
            .find('.formfileinput a').attr('href') !== '#';

        if (_bDocumentAttached) {
            _$field.addClass(this.DECORATOR_CLASS_IGNORE);
        }
    }

    _getErroredElements () {
        return this.$('.error', this.QUICK_SELECTOR.getForm());
    }

    _changeLocalEventListenersState (_onOrOff) {
        return this.$(`.${LOCAL_DECORATOR_CLASS_TRIGGER_VALIDATE_FIELD}`)[_onOrOff]('change', _event => {
            _event.preventDefault();

            return this._validateField(this.$(_event.target));
        });
    }

    _destroyFieldValidation (_$field) {
        _$field.removeClass(LOCAL_DECORATOR_CLASS_REQUIRED);
        _$field.removeClass(LOCAL_DECORATOR_CLASS_TRIGGER_VALIDATE_FIELD);
        _$field.removeClass(LOCAL_DECORATOR_CLASS_DOCUMENT_FIELD);
        _$field.rules('remove');
    }

    _initFieldValidation (_$field, _config) {
        if (_.isNil(_config)) {
            return;
        }

        _$field.addClass(LOCAL_DECORATOR_CLASS_REQUIRED);
        _$field.addClass(LOCAL_DECORATOR_CLASS_TRIGGER_VALIDATE_FIELD);

        if (_$field.attr('type') === 'file') {
            _$field.addClass(LOCAL_DECORATOR_CLASS_DOCUMENT_FIELD);
        }

        _$field.rules('add', _config);
    }

    _validateField (_$field) {
        if (!_$field.hasClass(LOCAL_DECORATOR_CLASS_TRIGGER_VALIDATE_FIELD)) {
            return;
        }

        const _oldValue = _$field.data(LOCAL_DECORATOR_DATA_OLD_VALUE);

        _$field.data(LOCAL_DECORATOR_DATA_OLD_VALUE, _$field.val());

        if (_$field.val() === '' || _$field.val() === _oldValue) {
            return;
        }

        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_$field.attr('id'))
            .find(`.${this.ALX_CLASS_BACKEND_ERROR}`)
            .parent()
            .remove();

        return _$field.valid();
    }

    _validateForm (_bForSubmission) {
        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_DOCUMENT_FIELD).each((_index, _elem) => {
            this._ignoreDocumentFieldIfHasAttachment(this.$(_elem));
        });

        const _bIsValid = this.QUICK_SELECTOR.getForm().valid();

        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_FORM_VALIDATED, [
            _bIsValid,
            _bForSubmission || false,
            this._getErroredElements()
        ]);
    }

    setFieldValidation (_$field, _config) {
        this._changeLocalEventListenersState('off');
        this._destroyFieldValidation(_$field);
        this._initFieldValidation(_$field, _config);
        this._changeLocalEventListenersState('on');
    }
}

module.exports = Validator;
