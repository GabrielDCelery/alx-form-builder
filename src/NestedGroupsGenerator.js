'use strict';

const _ = {
    forEach: require('lodash.foreach')
};

const LOCAL_DECORATOR_FORM_GROUP = 'alx-form-group';

class NestedGroupsGenerator {
    constructor () {
        this._nestedGroups = [];
        this.groupIds = [];
        this.fieldIds = [];
    }

    _prepareFieldForNestedGrouping (_fieldId, _groups) {
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

    _generateNestedGroups () {
        this._nestedGroups.forEach(_groupIds => {
            _.forEach(_groupIds, (_v, _groupId) => {
                const _$wrapper = this.$('<div/>').attr('id', _groupId).addClass(LOCAL_DECORATOR_FORM_GROUP);
                const _$toWrap = this.$(`.${_groupId}`);

                _$toWrap.wrapAll(_$wrapper);
                _$toWrap.removeClass(_groupId);
            });
        });
    }

    _processGroupsOfTheLevel (_groupConfigs, _parentGroupIds) {
        _groupConfigs.forEach(_groupConfig => {
            const _groupIds = _parentGroupIds.slice(0);

            this.groupIds.push(_groupConfig.id);
            _groupIds.push(_groupConfig.id);

            _groupConfig.fields.forEach(_fieldId => {
                this.fieldIds.push(_fieldId);
                this._prepareFieldForNestedGrouping(_fieldId, _groupIds);
            });

            if (_groupConfig.children.length > 0) {
                return this._processGroupsOfTheLevel(_groupConfig.children, _groupIds);
            }
        });
    }

    getFieldIds () {
        return this.fieldIds;
    }

    getGroupIds () {
        return this.groupIds;
    }

    start (_groupConfigs) {
        this._processGroupsOfTheLevel(_groupConfigs, []);
        this._generateNestedGroups();
    }
}

module.exports = NestedGroupsGenerator;
