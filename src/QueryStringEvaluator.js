'use strict';

const queryString = require('querystring');

const _ = require('lodash-core');

class QueryStringEvaluator {
    constructor (_queryToFieldIdMap) {
        this.queryToFieldIdMap = _queryToFieldIdMap || {};
        this.oneTimeInitialized = false;
        this.numOfRequestsToWaitFor = 0;
        this.numOfReqestsCameBack = 0;
    }

    _initGlobalEventListeners (_fieldIdsToLookup) {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, (_event) => {
            this.numOfReqestsCameBack++;

            if (this.oneTimeInitialized || this.numOfReqestsCameBack < this.numOfRequestsToWaitFor) {
                return false;
            }

            _event.preventDefault();

            this.oneTimeInitialized = true;

            _.forEach(_fieldIdsToLookup, _fieldIdToLookup => {
                return this.QUICK_SELECTOR.getElemById(_fieldIdToLookup).trigger('change');
            });
        });
    }

    process (_url) {
        const _indexOfQueryString = _url.indexOf('?');

        if (!_indexOfQueryString) {
            return;
        }

        const _queryString = _url.slice(_indexOfQueryString + 1);
        const _queryObj = queryString.parse(_queryString);

        const _fieldsToLookup = [];

        _.forEach(_queryObj, (_value, _key) => {
            const _fieldId = this.queryToFieldIdMap[_key];

            if (_fieldId) {
                _fieldsToLookup.push({
                    id: _fieldId,
                    value: _value
                });
            }
        });

        this.numOfRequestsToWaitFor = _fieldsToLookup.length;

        if (this.numOfRequestsToWaitFor === 0) {
            return;
        }

        this._initGlobalEventListeners(_fieldsToLookup.map(_field => { return _field.id; }));

        _.forEach(_fieldsToLookup, _fieldToLookup => {
            this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldToLookup.id).find('.chosen-search-input').val(_fieldToLookup.value).keyup().blur();
        });
    }
}

module.exports = QueryStringEvaluator;
