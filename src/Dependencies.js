'use strict';

const _ = {
    forEach: require('lodash.foreach'),
    set: require('lodash.set')
};

const LOCAL_DECORATOR_TRIGGER_CONDITIONAL_CHANGE = 'alx-trigger-conditional-change';
const LOCAL_ANIMATION_HIDE = 'slideUp';
const LOCAL_ANIMATION_SHOW = 'slideDown';

class Dependencies {
    constructor () {
        this.validStatesConfigs = null;
        this.conditionalsMap = {};
        this.bInitialized = false;
        this.animationConfig = {
            duration: 0
        };
    }

    _setDefaultStateAndBuildDependencyMap (_validStatesConfigs) {
        this.validStatesConfigs = _validStatesConfigs;

        _.forEach(this.validStatesConfigs, (_validStateConfig, _toChangeId) => {
            this._setState(_validStateConfig.type, _toChangeId, _validStateConfig.defaultState);

            _validStateConfig.validStates.forEach(_validState => {
                _validState.criterias.forEach(_criteria => {
                    if (!this.conditionalsMap.hasOwnProperty(_criteria.target)) {
                        this.QUICK_SELECTOR.getElemById(_criteria.target).addClass(LOCAL_DECORATOR_TRIGGER_CONDITIONAL_CHANGE);
                    }

                    _.set(this.conditionalsMap, [_criteria.target, _toChangeId], true);
                });
            });
        });
    }

    _initEventListeners () {
        this.$(`.${LOCAL_DECORATOR_TRIGGER_CONDITIONAL_CHANGE}`).on('change', _event => {
            _event.preventDefault();

            return this._setConditionalsOnFieldChange(this.$(_event.target).attr('id'));
        });
    }

    _setConditionalsOnFieldChange (_fieldId) {
        if (!this.conditionalsMap.hasOwnProperty(_fieldId)) {
            return;
        }

        _.forEach(this.conditionalsMap[_fieldId], (_v, _toChangeId) => {
            const _type = this.validStatesConfigs[_toChangeId].type;
            const _state = this._getValidState(this.validStatesConfigs[_toChangeId]);

            this._setState(_type, _toChangeId, _state);
        });

        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_DEPENDENCY_CHANGED);
    }

    _setState (_type, _toChangeId, _state) {
        if (_type === 'field') {
            return this._setFieldState(_toChangeId, _state);
        }

        if (_type === 'group') {
            return this._setGroupState(this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_toChangeId}`), _state);
        }

        throw new Error(`Invalid type -> ${_type}`);
    }

    _setFieldState (_toChangeId, _state) {
        const _$field = this.QUICK_SELECTOR.getElemById(_toChangeId);

        if (_state.hasOwnProperty('visible')) {
            const _$wrapper = this.QUICK_SELECTOR.getLabelAndFieldWrapperDiv(_toChangeId);
            const _method = _state.visible === true ? LOCAL_ANIMATION_SHOW : LOCAL_ANIMATION_HIDE;

            if (!this.bInitialized) {
                _$wrapper.attr('style', 'display: none;');
            }

            _$field.toggleClass(this.DECORATOR_STATE_IGNORE, _state.visible === false);
            _$field.prop('disabled', _state.visible === false);
            _$wrapper.toggleClass(this.DECORATOR_STATE_HIDDEN, _state.visible === false);
            _$wrapper[_method](this.animationConfig);
        }

        if (_state.value || _state.value === '') {
            _$field.val(_state.value);
        }

        _$field.trigger('change');
    }

    _setGroupState (_$group, _state) {
        if (_state.hasOwnProperty('visible')) {
            const _method = _state.visible === true ? LOCAL_ANIMATION_SHOW : LOCAL_ANIMATION_HIDE;

            if (!this.bInitialized) {
                _$group.attr('style', 'display: none;');
            }

            const _$fieldsInGroup = this.$('input, select, textarea', _$group);

            _$fieldsInGroup.toggleClass(this.DECORATOR_STATE_IGNORE, _state.visible === false);
            _$fieldsInGroup.prop('disabled', _state.visible === false);
            _$group.toggleClass(this.DECORATOR_STATE_HIDDEN, _state.visible === false);
            _$group[_method](this.animationConfig);
        }
    }

    _isValidCriteria (_criteria) {
        const _value = this.QUICK_SELECTOR.getElemById(_criteria.target).val();

        if (_criteria.values) {
            for (let _i = 0, _iMax = _criteria.values.length; _i < _iMax; _i++) {
                if (_value === _criteria.values[_i]) {
                    return true;
                }
            }
        }

        if (_criteria.not) {
            for (let _i = 0, _iMax = _criteria.not.length; _i < _iMax; _i++) {
                if (_value === _criteria.not[_i]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    _isValidState (_state) {
        for (let _i = 0, _iMax = _state.criterias.length; _i < _iMax; _i++) {
            if (!this._isValidCriteria(_state.criterias[_i])) {
                return false;
            }
        }

        return true;
    }

    _getValidState (_dependencyConfig) {
        for (let _i = 0, _iMax = _dependencyConfig.validStates.length; _i < _iMax; _i++) {
            const _state = _dependencyConfig.validStates[_i];

            if (this._isValidState(_state)) {
                return _state;
            }
        }

        return _dependencyConfig.defaultState;
    }

    init (_validStatesConfig) {
        this._setDefaultStateAndBuildDependencyMap(_validStatesConfig);
        this._initEventListeners();
        this.bInitialized = true;
        this.animationConfig = {
            duration: 600
        };

        return this;
    }
}

module.exports = Dependencies;
