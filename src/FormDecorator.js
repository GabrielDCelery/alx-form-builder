'use strict';

const _ = {
    get: require('lodash.get'),
    union: require('lodash.union')
}

class FormDecorator {
    _decorateElemWithCustomClasses(_$elem, _type, _localDecorators = {}, _globalDecorators = {}) {
        const _customClasses = _.union(_.get(_localDecorators, _type, []), _.get(_globalDecorators, _type, []));

        if (_customClasses.length === 0 || _$elem.length === 0) {
            return;
        }

        if (_customClasses) {
            _$elem.addClass(_customClasses.join(' '));
        }
    }

    _replaceFieldLabel(_fieldId, _newLabel) {
        if (!_newLabel) {
            return;
        }

        return this.QUICK_SELECTOR.getLabelOfField(_fieldId).text(_newLabel);
    }

    _replaceFieldPlaceholder(_fieldId, _placeholder) {
        if (!_placeholder) {
            return;
        }

        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$field.is('input')) {
            return _$field.attr('placeholder', _placeholder);
        }
    }

    init(_config) {
        this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getElemById(this.ID_FORM), 'form', null, _config.decoratorClasses);

        _config.fields.forEach(_fieldConfig => {
            this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getElemById(_fieldConfig.id),
                'field', _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldConfig.id),
                'fieldWrapperDiv', _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelOfField(_fieldConfig.id),
                'label', _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldConfig.id),
                'labelWrapperDiv', _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._decorateElemWithCustomClasses(this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldConfig.id),
                'labelAndFieldWrapperDiv', _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._replaceFieldLabel(_fieldConfig.id, _fieldConfig.label);
            this._replaceFieldPlaceholder(_fieldConfig.id, _fieldConfig.placeholder);
        });

        return this;
    }
}

module.exports = FormDecorator;