'use strict';

class FieldSynchronizer {
    constructor() {
        this._lookupFieldIds = {};
        this._checkIfLookupFieldNeedsSyncing = this._checkIfLookupFieldNeedsSyncing.bind(this);
    }

    _cacheIdsOfLookupFields() {
        this.QUICK_SELECTOR.getElemsByClass(this.DECORATOR_LOOKUP_FIELD).each((_index, _field) => {
            this._lookupFieldIds[this.$(_field).attr('id')] = true;
        });
    }

    _initGlobalEventListeners() {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHECK_IF_FIELD_NEEDS_SYNCING, (_event, _$field, _newVal) => {
            _event.preventDefault();
            
            return this._checkIfLookupFieldNeedsSyncing(_$field, _newVal);
        });
    }

    _isLookupValueFromTheSystem(_$lookupFieldDropDown, _value) {
        if (_$lookupFieldDropDown.length === 0) {
            return false;
        }

        const _listedValuesInDropDown = this.$('option', _$lookupFieldDropDown).toArray().map(_elem => {
            return this.$(_elem).text();
        });

        return _listedValuesInDropDown.indexOf(_value.toString()) !== -1;
    }

    _checkIfLookupFieldNeedsSyncing(_$field, _newVal) {
        const _fieldId = _$field.attr('id');

        if (_newVal !== undefined && this._lookupFieldIds[_fieldId] === true) {
            const _lookupDropDownId = `${this.PREFIX_LOOKUP_ID}${_fieldId}`;

            if (this._isLookupValueFromTheSystem(this.QUICK_SELECTOR.getElemById(_lookupDropDownId), _newVal)) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, [true]);
            }

            return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, [false, [_fieldId, _lookupDropDownId]]);
        }
    }

    init(_lookupConfigs) {
        this._cacheIdsOfLookupFields();
        this._initGlobalEventListeners();

        return this;
    }
}

module.exports = FieldSynchronizer;