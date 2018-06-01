'use strict';

const LOOKUP_ID_PREFIX = '_acl_';

class LookupFieldSynchronizer {
    constructor() {
        this._checkIfLookupFieldNeedsSyncing = this._checkIfLookupFieldNeedsSyncing.bind(this);
    }

    _initGlobalEventListeners() {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHECK_IF_FIELD_NEEDS_SYNCING, (_event, _$field, _newVal) => {
            _event.preventDefault();

            return this._checkIfLookupFieldNeedsSyncing(_$field, _newVal);
        });
    }

    _checkIfLookupFieldNeedsSyncing(_$field, _newVal) {
        if (_newVal !== undefined && _$field.attr('id') === this.primaryField) {
            const _$lookupSelector = this.QUICK_SELECTOR.getElemById(`${this.PREFIX_LOOKUP_ID}${this.primaryField}`);
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
                fieldsToValidate: [this.primaryField, `${this.PREFIX_LOOKUP_ID}${this.primaryField}`]
            }]);
        }
    }

    init(_lookupConfigs) {
        this.primaryField = _lookupConfigs.primary;
        this._initGlobalEventListeners();

        return this;
    }
}

module.exports = LookupFieldSynchronizer;