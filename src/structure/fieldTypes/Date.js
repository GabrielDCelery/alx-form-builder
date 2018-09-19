'use strict';

const DependencyInjector = require('../../helpers/DependencyInjector');
const _FieldInterface = require('./_FieldInterface');

class Date extends _FieldInterface {
    constructor (_dependencies) {
        super();
        DependencyInjector.inject(this, _dependencies, [
            '$'
        ]);
    }

    destroy (_$field) {
        _$field.attr('readonly', false);
        _$field.datepicker('destroy');
    }

    init (_$field, _fieldConfig = {}) {
        _$field.attr('readonly', true);

        _$field.datepicker(this.$.extend({
            yearRange: '1900:2100',
            changeYear: true,
            changeMonth: true
        }, this.$.datepicker.regional[_fieldConfig.region || 'en-GB']));
    }
}

module.exports = Date;
