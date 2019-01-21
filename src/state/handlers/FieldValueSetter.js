'use strict';

const _ = require('lodash-core');

class FieldValueSetter {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, []);
    }

    setFieldValue (_$field, _value) {
        if (_.isNil(_value)) {
            return;
        }

        const _fieldValue = _$field.val();

        if (_fieldValue === '' || _.isNil(_fieldValue)) {
            return _$field.val(_value);
        }
        /*
        if (_$field.is('textarea') || _$field.is('input') || _$field.is('select')) {
            return _$field.val(_value);
        }
        */
    }
}

module.exports = FieldValueSetter;
