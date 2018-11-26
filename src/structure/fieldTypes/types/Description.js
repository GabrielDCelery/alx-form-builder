'use strict';

const _FieldInterface = require('./_FieldTypeInterface');

class Description extends _FieldInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'CONTENT_INJECTOR_FACTORY',
            'DECORATOR_FORM_FIELD_DESCRIPTION',
            'TEMPLATE_APPENDER'
        ]);
    }
    destroy (_fieldId) {
        const _$labelWrapperDiv = this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId);
        const _$fieldWrapperDiv = this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId);
        const _$labelAndFieldWrapperDiv = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        _$labelAndFieldWrapperDiv.find(`.${this.DECORATOR_FORM_FIELD_DESCRIPTION}`).remove();

        _$labelWrapperDiv.show();
        _$fieldWrapperDiv.show();
    }

    init (_fieldId, _fieldConfig = {}) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);
        const _$labelWrapperDiv = this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId);
        const _$fieldWrapperDiv = this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId);

        _$labelWrapperDiv.hide();
        _$fieldWrapperDiv.hide();

        this.CONTENT_INJECTOR_FACTORY.getInjector('field').injectDescription(_fieldId, 'text', _$field.val());
        this.TEMPLATE_APPENDER.decorateFieldDescriptionsWithClasses();

        return this;
    }
}

module.exports = Description;
