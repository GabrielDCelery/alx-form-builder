'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class FieldContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'COLOUR_APPENDER',
            'DECORATOR_FORM_FIELD_HELPER_TEXT',
            'DECORATOR_FORM_FIELD_DESCRIPTION'
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

        this.COLOUR_APPENDER
            .setElems(_$helperText)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_BACKGROUND)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_BORDER);

        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId).append(_$helperText);

        return _$helperText;
    }

    injectDescription (_fieldId, _type, _value) {
        if (!FieldContentInjector._isValidContent(_value)) {
            return;
        }

        const _$description = this._generateContent(_type, _value, 'p');

        _$description.addClass(this.DECORATOR_FORM_FIELD_DESCRIPTION);

        this.COLOUR_APPENDER
            .setElems(_$description)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_BACKGROUND)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_FIELDS_HELPER_BORDER);

        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId).append(_$description);

        return _$description;
    }
}

module.exports = FieldContentInjector;
