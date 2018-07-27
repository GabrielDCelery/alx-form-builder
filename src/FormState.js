'use strict';

const _ = {
    forEach: require('lodash.foreach')
};

class FormState {
    _initFieldTypes (_fieldTypesConfig) {
        _.forEach(_fieldTypesConfig, (_fieldTypeConfig, _fieldId) => {
            this.FIELD_TYPE_FACTORY.initField(_fieldId, _fieldTypeConfig.type, _fieldTypeConfig.fieldConfig);
        });
    }

    init (_config) {
        this._initFieldTypes(_config.fieldTypes);
    }
}

module.exports = FormState;
