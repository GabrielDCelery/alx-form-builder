'use strict';

require('jquery-validation');
require('./Validator.scss');

const _ = {
    forEach: require('lodash.foreach')
};

const LOCAL_DECORATOR_STATE_REQUIRED = 'alx-required';
const LOCAL_DECORATOR_TRIGGER_VALIDATE_FIELD = 'alx-validate-field';
const LOCAL_DECORATOR_DATA_OLD_VALUE = 'alx-old-value';

class Validator {
    constructor () {
        this._validateElem = this._validateElem.bind(this);
        this._validateForm = this._validateForm.bind(this);
    }

    _extendValidatiorPluginWithCustomValidators () {
        this.$.validator.addMethod('pattern', (_value, _elem, _params) => {
            return new RegExp(_params).test(_value);
        }, 'Please enter a valid value in the correct format!');
    }

    _initValidatorPlugin () {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).validate({
            ignore: `.${this.DECORATOR_STATE_IGNORE}`,
            success: _label => {
                return _label.remove();
            }
        });
    }

    _decorateFieldForValidation (_fieldId, _config) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.addClass(LOCAL_DECORATOR_STATE_REQUIRED);
        _$field.rules('add', _config);
        _$field.addClass(LOCAL_DECORATOR_TRIGGER_VALIDATE_FIELD);
    }

    _excludeLookupSelectsFromValidation () {
        this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_LOOKUP_FIELD).each((_index, _field) => {
            this.QUICK_SELECTOR.getElemById(`${this.PREFIX_LOOKUP_ID}${this.$(_field).attr('id')}`).addClass(`${this.DECORATOR_STATE_IGNORE}`);
        });
    }

    _initLocalEventListeners () {
        this.$(`.${LOCAL_DECORATOR_TRIGGER_VALIDATE_FIELD}`).on('change', _event => {
            _event.preventDefault();

            return this._validateElem(this.$(_event.target));
        });
    }

    _initGlobalEventListeners () {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_VALIDATE_FORM, (_event, _bForSubmission) => {
            _event.preventDefault();

            return this._validateForm(_bForSubmission);
        });

        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_VALIDATE_FIELD, (_event, _fieldId) => {
            _event.preventDefault();

            return this._validateElem(this.QUICK_SELECTOR.getElemById(_fieldId));
        });
    }

    _getErroredElements () {
        return this.$('.error', this.QUICK_SELECTOR.getElemById(this.ID_FORM));
    }

    _validateElem (_$elem) {
        const _oldValue = _$elem.data(LOCAL_DECORATOR_DATA_OLD_VALUE);

        _$elem.data(LOCAL_DECORATOR_DATA_OLD_VALUE, _$elem.val());

        if (_$elem.val() === '' || _$elem.val() === _oldValue) {
            return;
        }

        _$elem.closest(`.${this.DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER}`)
            .find(`.${this.ALX_CLASS_BACKEND_ERROR}`)
            .parent()
            .remove();

        return _$elem.valid();
    }

    _validateForm (_bForSubmission) {
        const _bIsValid = this.QUICK_SELECTOR.getElemById(this.ID_FORM).valid();

        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_FORM_VALIDATED, [
            _bIsValid,
            _bForSubmission || false,
            this._getErroredElements()
        ]);
    }

    _checkForBackendErrors() {
        const _$backendErrors = this.QUICK_SELECTOR.getElemsByClass(this.ALX_CLASS_BACKEND_ERROR);

        if (_$backendErrors.length > 0) {
            return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_BACKEND_ERRORED, [_$backendErrors]);
        }
    }

    init (_fieldValidatorConfigs, _lookupFields) {
        this._extendValidatiorPluginWithCustomValidators();
        this._initValidatorPlugin();

        _.forEach(_fieldValidatorConfigs, (_fieldValidatorConfig, _fieldId) => {
            this._decorateFieldForValidation(_fieldId, _fieldValidatorConfig);
        });

        this._excludeLookupSelectsFromValidation();
        this._initLocalEventListeners();
        this._initGlobalEventListeners();
        this._checkForBackendErrors();

        return this;
    }
}

module.exports = Validator;
