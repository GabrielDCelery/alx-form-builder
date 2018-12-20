'use strict';

const _ = require('lodash-core');

const VisibilityHandler = require('./handlers/VisibilityHandler');
const FieldValueSetter = require('./handlers/FieldValueSetter');
const ReadOnlyStateSetter = require('./handlers/ReadOnlyStateSetter');
const Validator = require('./handlers/Validator');
const Paginator = require('./handlers/Paginator');
const UniqueIdGenerator = require('./handlers/UniqueIdGenerator');
const QueryStringEvaluator = require('./handlers/QueryStringEvaluator');
const HiddenDataSubmitter = require('./handlers/HiddenDataSubmitter');

const LOCAL_DECORATOR_TRIGGER_STATE_CHANGE = 'alx-trigger-state-change';
const LOCAL_DECORATOR_STATE_CHANGE_DISABLED = 'alx-state-change-disabled';

class StateCoordinator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'PREFIX_GROUP',
            'QUICK_SELECTOR',
            'FORM_EVENTS'
        ]);

        this.visibilityHandler = new VisibilityHandler(_dependencies);
        this.fieldValueSetter = new FieldValueSetter(_dependencies);
        this.readOnlyStateSetter = new ReadOnlyStateSetter(_dependencies);
        this.validator = new Validator(_dependencies);
        this.paginator = new Paginator(_dependencies);
        this.uniqueIdGenerator = new UniqueIdGenerator(_dependencies);
        this.queryStringEvaluator = new QueryStringEvaluator(_dependencies);
        this.hiddenDataSubmitter = new HiddenDataSubmitter(_dependencies);
    }

    _toggleFieldAndDependeesDisabledState (_fieldId, _bDisable) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        _$field.toggleClass(LOCAL_DECORATOR_STATE_CHANGE_DISABLED, _bDisable);
        _$field.attr('readonly', _bDisable);

        if (this.fieldsToChangeMap[_fieldId]) {
            _.forEach(this.fieldsToChangeMap[_fieldId], _dependeeId => {
                return this._toggleFieldAndDependeesDisabledState(_dependeeId, _bDisable);
            });
        }
    }

    _isValidCriteria (_condition) {
        const _$elem = this.QUICK_SELECTOR.getElemById(_condition.target);

        if (_condition.values) {
            for (let _i = 0, _iMax = _condition.values.length; _i < _iMax; _i++) {
                if (_$elem.val() === _condition.values[_i]) {
                    return true;
                }
            }
        }

        if (_condition.not) {
            for (let _i = 0, _iMax = _condition.not.length; _i < _iMax; _i++) {
                if (_$elem.val() === _condition.not[_i]) {
                    return false;
                }
            }

            return true;
        }

        if (_condition.checked) {
            if (_$elem.attr('checked')) {
                return true;
            }
        }

        return false;
    }

    _isValidState (_state) {
        for (let _i = 0, _iMax = _state.conditions.length; _i < _iMax; _i++) {
            if (!this._isValidCriteria(_state.conditions[_i])) {
                return false;
            }
        }

        return true;
    }

    _getValidState (_stateConfig) {
        for (let _i = 0, _iMax = _stateConfig.other.length; _i < _iMax; _i++) {
            const _newState = _stateConfig.other[_i];

            if (this._isValidState(_newState)) {
                return this._mergeNewStateWithDefaultState(_newState, _stateConfig.default);
            }
        }

        return _stateConfig.default;
    }

    _mergeNewStateWithDefaultState (_newState, _defaultState) {
        return {
            value: _.isNil(_newState.value) ? _defaultState.value : _newState.value,
            visible: _.isNil(_newState.visible) ? _defaultState.visible : _newState.visible,
            validation: _.isNil(_newState.validation) ? _defaultState.validation : _newState.validation
        };
    }

    _buildDependenciesMap (_statesConfig = {}) {
        const _toChangeMap = {};
        const _toWatchMap = {};

        _.forEach(_statesConfig, (_stateConfig, _toChangeId) => {
            _.forEach(_.get(_stateConfig, 'other', []), _validState => {
                _.forEach(_.get(_validState, 'conditions', []), _condition => {
                    const _toWatchId = _condition.target;

                    if (_toWatchId && !_toWatchMap[_toWatchId]) {
                        this.QUICK_SELECTOR.getElemById(_toWatchId).addClass(LOCAL_DECORATOR_TRIGGER_STATE_CHANGE);
                    }

                    _.set(_toChangeMap, [_toChangeId, _toWatchId], true);
                    _.set(_toWatchMap, [_toWatchId, _toChangeId], true);
                });
            });
        });

        return {
            toChangeMap: _toChangeMap,
            toWatchMap: _toWatchMap
        };
    }

    _initLocalEventListeners () {
        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_TRIGGER_STATE_CHANGE).on('change', _event => {
            _event.preventDefault();

            return this._setStatesOnFieldChange(this.$(_event.target).attr('id'));
        });
    }

    _initGlobalEventListeners () {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_SWITCHED_TO_EDITMODE, (_event) => {
            _event.preventDefault();

            _.forEach(this.uniqueIdGenerator.getDependentOnFieldIds(), _dependentOnFieldId => {
                return this._toggleFieldAndDependeesDisabledState(_dependentOnFieldId, true);
            });
        });
    }

    _setStatesOnFieldChange (_fieldId) {
        if (!_.has(this.fieldsToWatchMap, _fieldId) && !_.has(this.groupsToWatchMap, _fieldId)) {
            return;
        }

        _.forEach(this.fieldsToWatchMap[_fieldId], (_v, _toChangeId) => {
            return this._setFieldState(_toChangeId, this._getValidState(_.get(this.statesConfig, ['single', 'fields', _toChangeId])));
        });

        _.forEach(this.groupsToWatchMap[_fieldId], (_v, _toChangeId) => {
            return this._setGroupState(_toChangeId, this._getValidState(_.get(this.statesConfig, ['single', 'groups', _toChangeId])));
        });

        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_STATE_CHANGED);
    }

    _setFieldState (_fieldId, _state) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);

        if (_$field.hasClass(LOCAL_DECORATOR_STATE_CHANGE_DISABLED)) {
            return;
        }

        const _$fieldWrapper = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        this.fieldValueSetter.setFieldValue(_$field, _state.value);
        this.visibilityHandler.setFieldVisibility(_$field, _$fieldWrapper, _state.visible);
        this.readOnlyStateSetter.toggleFieldDisabledState(_$field, _state.readonly);
        this.validator.setFieldValidation(_$field, _state.validation);
        this.hiddenDataSubmitter.setFieldToAlwaysSubmit(_$field, _state.alwaysSubmit);

        _$field.trigger('change');
    }

    _setGroupState (_groupId, _state) {
        const _$group = this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`);

        if (_$group.hasClass(LOCAL_DECORATOR_STATE_CHANGE_DISABLED)) {
            return;
        }

        const _$fieldsInGroup = this.$('input, select, textarea', _$group);

        this.visibilityHandler.setGroupVisibility(_$group, _$fieldsInGroup, _state.visible);
        this.readOnlyStateSetter.toggleGroupDisabledState(_$group, _$fieldsInGroup, _state.readonly);
        this.hiddenDataSubmitter.setGroupToAlwaysSubmit(_$group, _$fieldsInGroup, _state.alwaysSubmit);

        _$fieldsInGroup.trigger('change');
    }

    _setDefaultState () {
        _.forEach(_.get(this.statesConfig, ['single', 'fields'], {}), (_stateConfig, _toChangeId) => {
            return this._setFieldState(_toChangeId, _stateConfig.default);
        });

        _.forEach(_.get(this.statesConfig, ['single', 'groups'], {}), (_stateConfig, _toChangeId) => {
            return this._setGroupState(_toChangeId, _stateConfig.default);
        });

        return setTimeout(() => {
            return this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_TRIGGER_STATE_CHANGE).trigger('change');
        }, 0);
    }

    init (_statesConfig = {}, _structureConfig = {}, _pluginsConfig = {}) {
        this.statesConfig = _statesConfig;

        const _fieldDependenciesMap = this._buildDependenciesMap(_.get(this.statesConfig, ['single', 'fields'], {}));
        const _groupDependenciesMap = this._buildDependenciesMap(_.get(this.statesConfig, ['single', 'groups']), {});

        this.fieldsToWatchMap = _fieldDependenciesMap.toWatchMap;
        this.fieldsToChangeMap = _fieldDependenciesMap.toChangeMap;
        this.groupsToWatchMap = _groupDependenciesMap.toWatchMap;

        this._setDefaultState();
        this._initLocalEventListeners();
        this._initGlobalEventListeners();
        this.visibilityHandler.setStateToInitialized();
        this.paginator.init(_structureConfig.pages);
        this.queryStringEvaluator.process(window.location.href, _pluginsConfig.urlLookup);

        setTimeout(() => {
            this.uniqueIdGenerator.init(_pluginsConfig.uniqueId);
        }, 0);
    }
}

module.exports = StateCoordinator;
