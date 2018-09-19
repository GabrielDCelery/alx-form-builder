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

        if (_$field.is('textarea') || _$field.is('input')) {
            return _$field.val(_value);
        }
    }
}

module.exports = FieldValueSetter;
