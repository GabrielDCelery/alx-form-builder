'use strict';

const _ = require('lodash-core');

const LOCAL_ANIMATION_DURATION_UNINITALIZED = 0;
const LOCAL_ANIMATION_DURATION_INITIALIZED = 600;
const LOCAL_ANIMATION_HIDE = 'slideUp';
const LOCAL_ANIMATION_SHOW = 'slideDown';

class VisibilityHandler {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'DECORATOR_CLASS_HIDDEN',
            'DECORATOR_CLASS_IGNORE'
        ]);

        this.bInitialized = false;
        this.animationConfig = { duration: LOCAL_ANIMATION_DURATION_UNINITALIZED };
    }

    setFieldVisibility (_$field, _$wrapper, _bVisible) {
        if (_.isNil(_bVisible)) {
            return;
        }

        const _animation = _bVisible === true ? LOCAL_ANIMATION_SHOW : LOCAL_ANIMATION_HIDE;

        if (!this.bInitialized) {
            _$wrapper.attr('style', 'display: none;');
        }

        _$field.toggleClass(this.DECORATOR_CLASS_IGNORE, !_bVisible);
        _$field.prop('disabled', !_bVisible);
        _$wrapper.toggleClass(this.DECORATOR_CLASS_HIDDEN, !_bVisible);
        _$wrapper[_animation](this.animationConfig);
    }

    setGroupVisibility (_$group, _$fieldsInGroup, _bVisible) {
        if (_.isNil(_bVisible)) {
            return;
        }

        const _animation = _bVisible === true ? LOCAL_ANIMATION_SHOW : LOCAL_ANIMATION_HIDE;

        if (!this.bInitialized) {
            _$group.attr('style', 'display: none;');
        }

        _$fieldsInGroup.toggleClass(this.DECORATOR_CLASS_IGNORE, !_bVisible);
        _$fieldsInGroup.prop('disabled', !_bVisible);
        _$group.toggleClass(this.DECORATOR_CLASS_HIDDEN, !_bVisible);
        _$group[_animation](this.animationConfig);
    }

    setStateToInitialized () {
        this.bInitialized = true;
        this.animationConfig = { duration: LOCAL_ANIMATION_DURATION_INITIALIZED };

        return this;
    }
}

module.exports = VisibilityHandler;
