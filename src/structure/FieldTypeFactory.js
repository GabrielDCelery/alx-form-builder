'use strict';

require('jquery-datepicker');
require('./FieldTypeModifier.scss');

const _ = require('lodash-core');
const datePickerUk = require('jquery-datepicker/i18n/jquery.ui.datepicker-en-GB');

const VALID_FIELD_TYPES = {
    date: require('./fieldTypes/Date'),
    textarea: require('./fieldTypes/Textarea')
};

class FieldTypeFactory {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'DECORATOR_FORM_NON_RESIZABLE_TEXTAREA'
        ]);
        datePickerUk(this.$);
        this._initializedFields = {};
        this._dependencies = _dependencies;
    }

    convertTextareaToNormalInput (_fieldId) {
        // This is necessary because the backend renders all the normal input fields as textarea
        this.QUICK_SELECTOR.getElemById(_fieldId).addClass(this.DECORATOR_FORM_NON_RESIZABLE_TEXTAREA);
    }

    init (_fieldId, _type, _fieldConfig = {}) {
        if (_.isNil(_type)) {
            return;
        }

        if (!VALID_FIELD_TYPES[_type]) {
            throw new Error(`Invalid field type -> ${_type}`);
        }

        if (this._initializedFields[_fieldId]) {
            this._initializedFields[_fieldId].destroy();
        }

        this._initializedFields[_fieldId] = new VALID_FIELD_TYPES[_type](this._dependencies).init(this.QUICK_SELECTOR.getElemById(_fieldId), _fieldConfig);
    }
}

module.exports = FieldTypeFactory;
