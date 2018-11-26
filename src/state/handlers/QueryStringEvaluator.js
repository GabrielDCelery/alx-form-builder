'use strict';

const queryString = require('querystring');

const _ = require('lodash-core');

class QueryStringEvaluator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'QUICK_SELECTOR',
            'FORM_EVENTS'
        ]);

        this.initialized = false;
        this.numOfRequestsToWaitFor = 0;
        this.numOfReqestsCameBack = 0;
    }

    _initGlobalEventListeners (_fieldsToLookup) {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_SYNC_LOOKUP_FIELD, (_event) => {
            _event.preventDefault();

            this.numOfReqestsCameBack++;

            if (this.initialized || this.numOfReqestsCameBack < this.numOfRequestsToWaitFor) {
                return false;
            }

            this.initialized = true;

            _.forEach(_fieldsToLookup, _fieldToLookup => {
                return this.QUICK_SELECTOR.getElemById(_fieldToLookup.id).val(_fieldToLookup.value).trigger('change');
            });
        });
    }

    process (_url, _queryToFieldIdMap) {
        if (_.size(_queryToFieldIdMap) === 0) {
            return;
        }

        this.queryToFieldIdMap = _queryToFieldIdMap || {};

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

        this._initGlobalEventListeners(_fieldsToLookup);

        _.forEach(_fieldsToLookup, _fieldToLookup => {
            this.QUICK_SELECTOR.getFieldWrapperDiv(_fieldToLookup.id).find('.chosen-search-input').val(_fieldToLookup.value).keyup().blur();
        });
    }
}

module.exports = QueryStringEvaluator;
