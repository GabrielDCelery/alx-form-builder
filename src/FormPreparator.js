'use strict';

const _ = {
    forEach: require('lodash.foreach')
};

class FormPreparator {
    constructor() {
        this.nestedGroups = [];
    }

    _replaceField(_fieldId, _replaceConfig) {
        if (!_replaceConfig) {
            return;
        }

        if (_replaceConfig.type === 'textarea') {
            const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);
            const _$textArea = this.$('<textarea></textarea>');

            _$textArea.attr('id', _fieldId);
            _$textArea.attr('name', _$field.attr('name'));

            _.forEach(_replaceConfig.attributes, (_value, _attribute) => {
                _$textArea.attr(_attribute, _value);
            });

            _$field.replaceWith(_$textArea);
        }
    }

    _decorateFieldWithHelperClasses(_fieldId, _fieldDecoratorClassess = {}, _decoratorClassess) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);
        const _$fieldWrapper = this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId);
        const _$label = this.QUICK_SELECTOR.getLabelOfField(_fieldId);
        const _$labelWrapper = this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId);
        const _$labelAndFieldWrapper = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        FormPreparator._appendClassesToElem(_$fieldWrapper, this.DECORATOR_FORM_FIELD_WRAPPER);
        FormPreparator._appendClassesToElem(_$labelWrapper, this.DECORATOR_FORM_LABEL_WRAPPER);
        FormPreparator._appendClassesToElem(_$labelAndFieldWrapper, this.DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER);

        FormPreparator._appendClassesToElem(_$field, _decoratorClassess.field);
        FormPreparator._appendClassesToElem(_$fieldWrapper, _decoratorClassess.fieldWrapperDiv);
        FormPreparator._appendClassesToElem(_$labelWrapper, _decoratorClassess.labelWrapperDiv);
        FormPreparator._appendClassesToElem(_$labelAndFieldWrapper, _decoratorClassess.labelAndFieldWrapperDiv);

        FormPreparator._appendClassesToElem(_$field, _fieldDecoratorClassess.field);
        FormPreparator._appendClassesToElem(_$fieldWrapper, _fieldDecoratorClassess.fieldWrapperDiv);
        FormPreparator._appendClassesToElem(_$labelWrapper, _fieldDecoratorClassess.labelWrapperDiv);
        FormPreparator._appendClassesToElem(_$labelAndFieldWrapper, _fieldDecoratorClassess.labelAndFieldWrapperDiv);

        _$labelAndFieldWrapper.attr('data-input-id', _$field.attr('id'));

        if (_$field.prop('required')) {
            _$labelAndFieldWrapper.addClass('required');
        }
    }

    _prepareFieldForNestedGrouping(_fieldId, _groups) {
        if (!_groups) {
            return;
        }

        const _$labelAndFieldWrapperDiv = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        _groups.forEach((_group, _level) => {
            if (!this.nestedGroups[_level]) {
                this.nestedGroups[_level] = {};
            }

            _$labelAndFieldWrapperDiv.addClass(_group);

            this.nestedGroups[_level][_group] = true;
        });
    }

    _editFieldLabel(_fieldId, _newLabel) {
        if (!_newLabel) {
            return;
        }

        const _$label = this.QUICK_SELECTOR.getLabelOfField(_fieldId);

        _$label.text(_newLabel);
    }

    _editFieldPlaceholder(_fieldId, _placeholder) {
        if (!_placeholder) {
            return;
        }

        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$field.is('input')) {
            return _$field.attr('placeholder', _placeholder);
        }
    }

    _generateNestedGroups() {
        this.nestedGroups.forEach(_groups => {
            _.forEach(_groups, (_v, _group) => {
                const _$wrapper = this.$('<div/>').attr('id', _group).addClass(this.DECORATOR_FORM_GROUP);

                this.$(`.${_group}`).wrapAll(_$wrapper);
            });
        });
    }

    init(_config) {
        FormPreparator._appendClassesToElem(this.QUICK_SELECTOR.getElemById(this.ID_FORM), _config.decoratorClasses.form);

        _config.fields.forEach(_fieldConfig => {
            this._replaceField(_fieldConfig.id, _fieldConfig.replaceConfig);
            this._decorateFieldWithHelperClasses(_fieldConfig.id, _fieldConfig.decoratorClasses, _config.decoratorClasses);
            this._prepareFieldForNestedGrouping(_fieldConfig.id, _fieldConfig.groups);
            this._editFieldLabel(_fieldConfig.id, _fieldConfig.label);
            this._editFieldPlaceholder(_fieldConfig.id, _fieldConfig.placeholder);
        });

        this._generateNestedGroups();

        return this;
    }

    static _appendClassesToElem(_$elem, _classes) {
        if (_$elem.length === 0) {
            return;
        }

        if (typeof _classes === 'string') {
            return _$elem.addClass(_classes);
        }

        if (Array.isArray(_classes)) {
            if (_classes.length === 0) {
                return;
            }

            return _$elem.addClass(_classes.join(' '));
        }
    }
}

module.exports = FormPreparator;