'use strict';

require('jquery-datepicker');

const _FieldInterface = require('./_FieldTypeInterface');

class Date extends _FieldInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR'
        ]);
    }

    destroy (_fieldId) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.attr('readonly', false);
        _$field.datepicker('destroy');
    }

    init (_fieldId, _fieldConfig = {}) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.attr('readonly', true);

        _$field.datepicker(this.$.extend({
            yearRange: '1900:2100',
            changeYear: true,
            changeMonth: true
        }, this.$.datepicker.regional[_fieldConfig.region || 'en-GB']));

        return this;
    }
}

module.exports = Date;
