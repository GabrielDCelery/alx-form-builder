'use strict';

const _ = require('lodash-core');

const VisibilityHandler = require('./state/VisibilityHandler');
const FieldValueSetter = require('./state/FieldValueSetter');
const Validator = require('./state/Validator');

const LOCAL_DECORATOR_TRIGGER_STATE_CHANGE = 'alx-trigger-state-change';

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
        this.validator = new Validator(_dependencies);
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
            value: _newState.value || _defaultState.value,
            visible: _newState.visible || _defaultState.visible,
            validation: _newState.validation || _defaultState.validation
        };
    }

    _buildStatesMap (_statesConfig = {}) {
        const _statesMap = {};

        _.forEach(_statesConfig, (_stateConfig, _toChangeId) => {
            _.forEach(_.get(_stateConfig, 'other', []), _validState => {
                _.forEach(_.get(_validState, 'conditions', []), _condition => {
                    const _toWatchId = _condition.target;

                    if (_toWatchId && !_statesMap[_toWatchId]) {
                        this.QUICK_SELECTOR.getElemById(_toWatchId).addClass(LOCAL_DECORATOR_TRIGGER_STATE_CHANGE);
                    }

                    _.set(_statesMap, [_toWatchId, _toChangeId], true);
                });
            });
        });

        return _statesMap;
    }

    _initEventListeners () {
        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_TRIGGER_STATE_CHANGE).on('change', _event => {
            _event.preventDefault();

            return this._setStatesOnFieldChange(this.$(_event.target).attr('id'));
        });
    }

    _setStatesOnFieldChange (_fieldId) {
        if (!_.has(this.fieldStatesMap, _fieldId) && !_.has(this.groupStatesMap, _fieldId)) {
            return;
        }

        _.forEach(this.fieldStatesMap[_fieldId], (_v, _toChangeId) => {
            return this._setFieldState(_toChangeId, this._getValidState(_.get(this.statesConfig, ['single', 'fields', _toChangeId])));
        });

        _.forEach(this.groupStatesMap[_fieldId], (_v, _toChangeId) => {
            return this._setGroupState(_toChangeId, this._getValidState(_.get(this.statesConfig, ['single', 'groups', _toChangeId])));
        });

        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_STATE_CHANGED);
    }

    _setFieldState (_fieldId, _state) {
        const _$field = this.QUICK_SELECTOR.getElemById(_fieldId);
        const _$fieldWrapper = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_fieldId);

        this.fieldValueSetter.setFieldValue(_$field, _state.value);
        this.visibilityHandler.setFieldVisibility(_$field, _$fieldWrapper, _state.visible);
        this.validator.setFieldValidation(_$field, _state.validation);

        _$field.trigger('change');
    }

    _setGroupState (_groupId, _state) {
        const _$group = this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`);
        const _$fieldsInGroup = this.$('input, select, textarea', _$group);

        this.visibilityHandler.setGroupVisibility(_$group, _$fieldsInGroup, _state.visible);

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

    init (_statesConfig = {}) {
        this.statesConfig = _statesConfig;
        this.fieldStatesMap = this._buildStatesMap(_.get(this.statesConfig, ['single', 'fields'], {}));
        this.groupStatesMap = this._buildStatesMap(_.get(this.statesConfig, ['single', 'groups']), {});
        this._setDefaultState();
        this._initEventListeners();
        this.visibilityHandler.setStateToInitialized();
    }
}

module.exports = StateCoordinator;
