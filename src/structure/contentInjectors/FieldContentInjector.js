'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class FieldContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'DECORATOR_FORM_FIELD_HELPER_TEXT'
        ]);
    }

    replaceLabel (_fieldId, _newLabel) {
        if (!FieldContentInjector._isValidContent(_newLabel)) {
            return;
        }

        return this.QUICK_SELECTOR.getLabelOfField(_fieldId).text(_newLabel);
    }

    replacePlaceholder (_fieldId, _placeholder) {
        if (!FieldContentInjector._isValidContent(_placeholder)) {
            return;
        }

        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$field.is('textarea') || _$field.is('input')) {
            _$field.attr('placeholder', _placeholder);

            return _$field;
        }
    }

    injectHelperText (_fieldId, _type, _value) {
        if (!FieldContentInjector._isValidContent(_value)) {
            return;
        }

        const _$helperText = this._generateContent(_type, _value, 'p');

        _$helperText.addClass(this.DECORATOR_FORM_FIELD_HELPER_TEXT);

        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId).append(_$helperText);

        return _$helperText;
    }
}

module.exports = FieldContentInjector;
