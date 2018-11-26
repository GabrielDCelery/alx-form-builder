'use strict';

const _ = require('lodash-core');

const LOCAL_ALX_FIELD_ID_PREFIX = 'id_';
const LOCAL_ALX_TARGET_FIELD_REGEXP = /^field_\w*$/;

const DEFAULT_CONFIG = {
    parent: null,
    children: []
};

class AlxAjaxRequestsProcessor {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'FORM_EVENTS'
        ]);
    }

    _extractFieldIds (_targetGroupRecord) {
        const _fieldIds = [];

        _.forEach(_targetGroupRecord, (_v, _column) => {
            if (!LOCAL_ALX_TARGET_FIELD_REGEXP.test(_column)) {
                return;
            }

            _fieldIds.push(`${LOCAL_ALX_FIELD_ID_PREFIX}${_column}`);
        });

        return _fieldIds;
    }

    _isParentTargetGroupRecord (_targetGroupRecord) {
        return !this.config.parent || _targetGroupRecord.type === this.config.parent;
    }

    init (_config) {
        this.config = _.defaultsDeep({}, _config, DEFAULT_CONFIG);

        this.$(document).ajaxSend((_event, _jqxhr, _settings) => {
            const _requestUrl = _settings.url;

            if (_requestUrl.indexOf('/targets/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_FETCHING_TARGET_DETAILS, [_settings]);
            }

            if (_requestUrl.indexOf('/targetsearch/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_FETCHING_TARGET_LIST, [_settings]);
            }
        });

        this.$(document).ajaxSuccess((_event, _xhr, _settings, _data) => {
            const _requestUrl = _settings.url;

            if (_requestUrl.indexOf('/targets/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_TARGET_DETAILS_FETCHED, [
                    this._isParentTargetGroupRecord(_data),
                    this._extractFieldIds(_data)
                ]);
            }

            if (_requestUrl.indexOf('/targetsearch/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_TARGET_LIST_FETCHED, [_settings, _data]);
            }
        });
    }
}

module.exports = AlxAjaxRequestsProcessor;
