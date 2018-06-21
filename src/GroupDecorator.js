'use strict';

const Decorator = require('./Decorator');

const LOCAL_DECORATOR_GROUP_TITLE = 'alx-group-title';
const LOCAL_DECORATOR_GROUP_DESCRIPTION = 'alx-group-description';

const _ = {
    get: require('lodash.get'),
    forEach: require('lodash.foreach'),
    defaultsDeep: require('lodash.defaultsdeep')
}

const DEFAULT_GLOBAL_DECORATOR_CLASSES_GROUP = {
    groupTitle: [],
    groupDescription: []
};

const DEFAULT_DECORATOR_CONFIG_GROUP_TITLE = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'h2'
}

const DEFAULT_DECORATOR_CONFIG_GROUP_DESCRIPTION = {
    type: 'text',
    value: null,
    decoratorClasses: [],
    plainTextWrapper: 'p'
}

class GroupDecorator extends Decorator {
    constructor(_globalGroupDecoratorClasses) {
        super();

        this.globalDecoratorClasses = _.defaultsDeep({}, _globalGroupDecoratorClasses, DEFAULT_GLOBAL_DECORATOR_CLASSES_GROUP);
    }

    _prependTitleToGroup(_groupId, _groupDecoratorConfig) {
        if (!_groupDecoratorConfig.value) {
            return;
        }

        const _$groupTitle = this._generateDecoratedElem('groupTitle', null, _groupDecoratorConfig);

        _$groupTitle.addClass(LOCAL_DECORATOR_GROUP_TITLE);

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupTitle);
    }

    _prependDescriptionToGroup(_groupId, _groupDecoratorConfig) {
        if (!_groupDecoratorConfig.value) {
            return;
        }

        const _$groupDescription = this._generateDecoratedElem('groupDescription', null, _groupDecoratorConfig);

        _$groupDescription.addClass(LOCAL_DECORATOR_GROUP_DESCRIPTION);

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupDescription);
    }

    setGroupsToDecorate(_groupIds) {
        this.groupIds = _groupIds;

        return this;
    }

    start(_groupDecoratorsConfig) {
        this.groupIds.forEach(_groupId => {
            const _groupDescriptionConfig = GroupDecorator._generateDecoratorConfig(_groupId, 'description', _groupDecoratorsConfig, DEFAULT_DECORATOR_CONFIG_GROUP_DESCRIPTION);
            const _groupTitleConfig = GroupDecorator._generateDecoratorConfig(_groupId, 'title', _groupDecoratorsConfig, DEFAULT_DECORATOR_CONFIG_GROUP_TITLE);

            this._prependDescriptionToGroup(_groupId, _groupDescriptionConfig);
            this._prependTitleToGroup(_groupId, _groupTitleConfig);
        });

        return this;
    }

    static _generateDecoratorConfig(_id, _type, _decoratorsConfig = {}, _defaultConfig) {
        const _customConfig = _.get(_decoratorsConfig, [_id, _type], null);

        if (!_customConfig) {
            return _defaultConfig;
        }

        return _.defaultsDeep({}, _customConfig, _defaultConfig);
    }
}

module.exports = GroupDecorator;