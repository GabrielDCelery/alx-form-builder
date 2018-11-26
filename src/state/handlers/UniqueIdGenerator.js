'use strict';

const _ = require('lodash-core');
const dateFormat = require('dateformat');

const DEFAULT_CONFIG = {
    field: null,
    separator: '.',
    components: []
};
const COMPONENT_GENERATORS = {
    field: '_createFieldComponent',
    date: '_createDateComponent',
    random: '_createRandomString'
};
const CHARACTER_SET = {
    numeric: '0123456789',
    alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
};

const CHARACTER_MODIFIERS = {
    uppercase: 'toUpperCase',
    lowercase: 'toLowerCase'
};

class UniqueIdGenerator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'QUICK_SELECTOR',
            'FORM_STATE'
        ]);

        this.dependentOnFieldIds = [];
    }

    _createRandomString (_component) {
        if (!CHARACTER_SET[_component.charset]) {
            return '';
        }

        let _randomString = '';

        _.times(_component.length, () => {
            _randomString += CHARACTER_SET[_component.charset].charAt(Math.floor(Math.random() * CHARACTER_SET[_component.charset].length));
        });

        return _randomString;
    }

    _createDateComponent (_component) {
        return dateFormat(new Date(), _component.format);
    }

    _createFieldComponent (_component) {
        if (_component.map) {
            const _fieldValue = this.QUICK_SELECTOR.getElemById(_component.id).val();

            return _component.map[_fieldValue] || _fieldValue;
        }

        let _fieldValue = this.QUICK_SELECTOR.getElemById(_component.id).val() || '';
        let _replaceWhiteSpaceWith = _.get(_component, ['replace', 'whitespace']);

        if (_replaceWhiteSpaceWith) {
            _fieldValue = _fieldValue.replace(/\s/g, _replaceWhiteSpaceWith);
        }

        let _characterReplacer = _.get(_component, ['replace', 'characters']);

        if (_characterReplacer) {
            _fieldValue = _fieldValue[CHARACTER_MODIFIERS[_characterReplacer]]();
        }

        return _fieldValue;
    }

    _initLocalEventListeners (_component) {
        _.forEach(this.config.components, _component => {
            if (_component.type !== 'field') {
                return;
            }

            this.dependentOnFieldIds.push(_component.id);

            this.QUICK_SELECTOR.getElemById(_component.id).on('change', _event => {
                _event.preventDefault();

                return this._generateUniqueId();
            });
        });
    }

    _generateUniqueId () {
        if (this.FORM_STATE.isAjaxRequestInProgress() || this.FORM_STATE.isInEditMode()) {
            return;
        }

        const _uniqueId = this.config.components.map((_component, _index) => {
            if (!COMPONENT_GENERATORS[_component.type]) {
                return '';
            }

            return this[COMPONENT_GENERATORS[_component.type]](_component);
        }).join(this.config.separator);

        this.QUICK_SELECTOR.getElemById(this.config.field).val(_uniqueId).trigger('change');
    }

    getDependentOnFieldIds () {
        return this.dependentOnFieldIds;
    }

    init (_config = {}) {
        if (!_config.field) {
            return;
        }

        this.config = _.defaultsDeep({}, _config, DEFAULT_CONFIG);
        this._initLocalEventListeners();
        // this._generateUniqueId();
    }
}

module.exports = UniqueIdGenerator;
