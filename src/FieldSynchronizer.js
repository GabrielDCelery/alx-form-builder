'use strict';

const LOOKUP_ID_PREFIX = '_acl_';

class FieldSynchronizer {
    constructor() {
        this._lookupFieldIds = {};
        this._checkIfLookupFieldNeedsSyncing = this._checkIfLookupFieldNeedsSyncing.bind(this);
    }

    _cacheIdsOfLookupFields() {
        this.$(`.${this.DECORATOR_LOOKUP_FIELD}`).each((_index, _field) => {
            this._lookupFieldIds[this.$(_field).attr('id')] = true;
        });
    }

    _initGlobalEventListeners() {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHECK_IF_FIELD_NEEDS_SYNCING, (_event, _$field, _newVal) => {
            _event.preventDefault();

            return this._checkIfLookupFieldNeedsSyncing(_$field, _newVal);
        });
    }

    _checkIfLookupFieldNeedsSyncing(_$field, _newVal) {
        const _fieldId = _$field.attr('id');

        if (_newVal !== undefined && this._lookupFieldIds[_fieldId] === true) {
            const _$lookupSelector = this.QUICK_SELECTOR.getElemById(`${this.PREFIX_LOOKUP_ID}${_fieldId}`);
            const _listedValuesInLookupSelector = this.$('option', _$lookupSelector).toArray().map(_elem => {
                return this.$(_elem).text();
            });

            if (_listedValuesInLookupSelector.indexOf(_$field.val().toString()) !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, [{
                    bValidateForm: true,
                    fieldsToValidate: null
                }]);
            }

            return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, [{
                bValidateForm: false,
                fieldsToValidate: [_fieldId, `${this.PREFIX_LOOKUP_ID}${_fieldId}`]
            }]);
        }
    }

    init(_lookupConfigs) {
        this._cacheIdsOfLookupFields();
        this._initGlobalEventListeners();

        return this;
    }
}

module.exports = FieldSynchronizer;