'use strict';

require('./Textarea.scss');

const DependencyInjector = require('../../helpers/DependencyInjector');
const _FieldInterface = require('./_FieldInterface');

class Textarea extends _FieldInterface {
    constructor (_dependencies) {
        super();
        DependencyInjector.inject(this, _dependencies, [
            '$',
            'DECORATOR_FORM_NON_RESIZABLE_TEXTAREA'
        ]);
    }
    destroy (_$field) {
        _$field.addClass(this.DECORATOR_FORM_NON_RESIZABLE_TEXTAREA);
        _$field.removeAttr('rows');
    }

    init (_$field, _fieldConfig = {}) {
        _$field.removeClass(this.DECORATOR_FORM_NON_RESIZABLE_TEXTAREA);
        _$field.attr('rows', _fieldConfig.rows || 1);
    }
}

module.exports = Textarea;
