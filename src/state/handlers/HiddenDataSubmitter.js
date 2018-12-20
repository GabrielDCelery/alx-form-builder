'use strict';

// const _ = require('lodash-core');

class HiddenDataSubmitter {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'DECORATOR_CLASS_IGNORE'
        ]);
    }

    setFieldToAlwaysSubmit (_$field, _bAlwaysSubmit) {
        if (_bAlwaysSubmit === true) {
            return _$field.removeClass(this.DECORATOR_CLASS_IGNORE);
        }
    }

    setGroupToAlwaysSubmit (_$group, _$fieldsInGroup, _bAlwaysSubmit) {
        if (_bAlwaysSubmit === true) {
            return _$fieldsInGroup.removeClass(this.DECORATOR_CLASS_IGNORE);
        }
    }
}

module.exports = HiddenDataSubmitter;
