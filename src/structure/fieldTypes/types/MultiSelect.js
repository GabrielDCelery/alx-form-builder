'use strict';

require('multiselect/css/multi-select.css');
require('multiselect');
require('./MultiSelect.scss');

const _FieldInterface = require('./_FieldTypeInterface');

class MultiSelect extends _FieldInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR'
        ]);
    }

    destroy (_fieldId) {
    }

    init (_fieldId, _fieldConfig = {}) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.multiSelect();

        return this;
    }
}

module.exports = MultiSelect;
