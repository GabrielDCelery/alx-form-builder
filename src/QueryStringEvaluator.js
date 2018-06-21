'use strict';

const queryString = require('querystring');

const _ = {
    forEach: require('lodash.foreach')
}

class QueryStringEvaluator {
    constructor(_lookupMap) {
        this.lookupMap = _lookupMap || {};
    }

    process(_url) {
        const _indexOfQueryString = _url.indexOf('?');

        if (!_indexOfQueryString) {
            return;
        }

        const _queryString = _url.slice(_indexOfQueryString + 1);
        const _parsedValues = queryString.parse(_queryString);

        _.forEach(_parsedValues, (_value, _key) => {
            const _fieldId = this.lookupMap[_key];

            if (_fieldId) {
                this.QUICK_SELECTOR.getElemById(_fieldId).val(_value);

                return setTimeout(() => {
                    this.QUICK_SELECTOR.getElemById(_fieldId).trigger('change');
                }, 1000);
            }
        });
    }
}

module.exports = QueryStringEvaluator;