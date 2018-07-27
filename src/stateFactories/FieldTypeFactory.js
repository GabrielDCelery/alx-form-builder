'use strict';

require('jquery-datepicker');

const datePickerUk = require('jquery-datepicker/i18n/jquery.ui.datepicker-en-GB');

const VALID_FIELD_TYPES = {
    date: require('./fieldTypes/DateField')
};

class FieldTypeFactory {
    constructor () {
        this.fields = {};
    }

    init () {
        return datePickerUk(this.$);
    }

    initField (_fieldId, _type, _fieldConfig = {}) {
        if (!VALID_FIELD_TYPES[_type]) {
            throw new Error(`Invalid field type -> ${_type}`);
        }

        if (this.fields[_fieldId]) {
            this.fields[_fieldId].destroy();
        }

        this.fields[_fieldId] = new VALID_FIELD_TYPES[_type](this.$).init(this.QUICK_SELECTOR.getElemById(_fieldId), _fieldConfig);
    }
}

module.exports = FieldTypeFactory;
