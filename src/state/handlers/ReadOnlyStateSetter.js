'use strict';

class ReadOnlyStateSetter {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, []);
    }

    toggleFieldDisabledState (_$field, _bReadOnly) {
        if (_bReadOnly === true || _bReadOnly === false) {
            return _$field.attr('readonly', _bReadOnly);
        }
    }

    toggleGroupDisabledState (_$group, _$fieldsInGroup, _bReadOnly) {
        if (_bReadOnly === true || _bReadOnly === false) {
            return _$fieldsInGroup.attr('readonly', _bReadOnly);
        }
    }
}

module.exports = ReadOnlyStateSetter;
