'use strict';

const _ = require('lodash-core');

const LOCAL_DECORATOR_FORM_GROUP = 'alx-form-group';

class NestedGroupsGenerator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'PREFIX_GROUP'
        ]);
        this._nestedGroups = [];
        this._groupIds = [];
        this._fieldIds = [];
    }

    _prepareFieldForNestedGrouping (_fieldId, _groups) {
        if (!_groups) {
            return;
        }

        const _$labelAndFieldWrapperDiv = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        _.forEach(_groups, (_group, _level) => {
            if (!this._nestedGroups[_level]) {
                this._nestedGroups[_level] = {};
            }

            const _groupId = `${this.PREFIX_GROUP}${_group}`;

            _$labelAndFieldWrapperDiv.addClass(_groupId);

            this._nestedGroups[_level][_groupId] = true;
        });
    }

    _generateNestedGroups () {
        _.forEach(this._nestedGroups, _groupIds => {
            _.forEach(_groupIds, (_v, _groupId) => {
                const _$wrapper = this.$('<div/>').attr('id', _groupId).addClass(LOCAL_DECORATOR_FORM_GROUP);
                const _$toWrap = this.$(`.${_groupId}`);

                _$toWrap.wrapAll(_$wrapper);
                _$toWrap.removeClass(_groupId);
            });
        });
    }

    _processGroupsOfTheLevel (_groupConfigs, _parentGroupIds) {
        _.forEach(_groupConfigs, _groupConfig => {
            const _groupIds = _parentGroupIds.slice(0);

            this._groupIds.push(_groupConfig.id);
            _groupIds.push(_groupConfig.id);

            _.forEach(_groupConfig.fields, _fieldId => {
                this._fieldIds.push(_fieldId);
                this._prepareFieldForNestedGrouping(_fieldId, _groupIds);
            });

            if (Array.isArray(_groupConfig.children) && _groupConfig.children.length > 0) {
                return this._processGroupsOfTheLevel(_groupConfig.children, _groupIds);
            }
        });
    }

    getFieldIds () {
        return this._fieldIds;
    }

    getGroupIds () {
        return this._groupIds;
    }

    build (_groupConfigs = []) {
        this._processGroupsOfTheLevel(_groupConfigs, []);
        this._generateNestedGroups();

        return this;
    }
}

module.exports = NestedGroupsGenerator;
