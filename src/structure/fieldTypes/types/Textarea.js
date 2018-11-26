'use strict';

require('./Textarea.scss');

const _FieldInterface = require('./_FieldTypeInterface');

class Textarea extends _FieldInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'DECORATOR_FORM_NON_RESIZABLE_TEXTAREA'
        ]);
    }
    destroy (_fieldId) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.addClass(this.DECORATOR_FORM_NON_RESIZABLE_TEXTAREA);
        _$field.removeAttr('rows');
    }

    init (_fieldId, _fieldConfig = {}) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.removeClass(this.DECORATOR_FORM_NON_RESIZABLE_TEXTAREA);
        _$field.attr('rows', _fieldConfig.rows || 5);

        return this;
    }
}

module.exports = Textarea;
