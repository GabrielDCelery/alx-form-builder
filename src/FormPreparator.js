'use strict';

require('./FormPreparator.scss');

const _ = {
    forEach: require('lodash.foreach')
};

const LOCAL_DECORATOR_FORM_FIELD_WRAPPER = 'alx-form-input-wrapper';
const LOCAL_DECORATOR_FORM_LABEL_WRAPPER = 'alx-form-label-wrapper';
const LOCAL_DECORATOR_FORM_GROUP = 'alx-form-group';
const LOCAL_DECORATOR_NON_RESIZABLE_TEXTAREA = 'alx-non-resizable-textarea';
const LOCAL_DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER = 'alx-form-element';

class FormPreparator {
    constructor() {
        this._nestedGroups = [];
    }

    _markLookupField(_fieldId, _bIsLookupField) {
        if (!_bIsLookupField) {
            return;
        }

        this.QUICK_SELECTOR.getElemById(_fieldId).addClass(this.DECORATOR_LOOKUP_FIELD);
    }

    _treatFreeformAsNormalInput(_fieldId, _bIsTextArea) {
        if (_bIsTextArea) {
            return;
        }

        this.QUICK_SELECTOR.getElemById(_fieldId).addClass(LOCAL_DECORATOR_NON_RESIZABLE_TEXTAREA);
    }

    _decorateFieldWithHelperClasses(_fieldId) {
        this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldId).addClass(LOCAL_DECORATOR_FORM_FIELD_WRAPPER);
        this.QUICK_SELECTOR.getLabelWrapperDivOfField(_fieldId).addClass(LOCAL_DECORATOR_FORM_LABEL_WRAPPER);
        this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId)
            .addClass(LOCAL_DECORATOR_FORM_LABEL_AND_FIELD_WRAPPER)
            .attr('data-input-id', this.QUICK_SELECTOR.getElemById(_fieldId).attr('id'));
    }

    _prepareFieldForNestedGrouping(_fieldId, _groups) {
        if (!_groups) {
            return;
        }

        const _$labelAndFieldWrapperDiv = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        _groups.forEach((_group, _level) => {
            if (!this._nestedGroups[_level]) {
                this._nestedGroups[_level] = {};
            }

            const _groupId = `${this.PREFIX_GROUP}${_group}`;

            _$labelAndFieldWrapperDiv.addClass(_groupId);

            this._nestedGroups[_level][_groupId] = true;
        });
    }

    _generateNestedGroups() {
        this._nestedGroups.forEach(_groupIds => {
            _.forEach(_groupIds, (_v, _groupId) => {
                const _$wrapper = this.$('<div/>').attr('id', _groupId).addClass(LOCAL_DECORATOR_FORM_GROUP);
                const _$toWrap = this.$(`.${_groupId}`);

                _$toWrap.wrapAll(_$wrapper);
                _$toWrap.removeClass(_groupId);
            });
        });
    }

    init(_fieldConfigs) {
        _fieldConfigs.forEach(_fieldConfig => {
            this._markLookupField(_fieldConfig.id, _fieldConfig.bIsLookupField);
            this._treatFreeformAsNormalInput(_fieldConfig.id, _fieldConfig.bIsTextArea);
            this._decorateFieldWithHelperClasses(_fieldConfig.id);
            this._prepareFieldForNestedGrouping(_fieldConfig.id, _fieldConfig.groups);
        });

        this._generateNestedGroups();

        return this;
    }
}

module.exports = FormPreparator;