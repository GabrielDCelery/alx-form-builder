'use strict';

class AjaxRequestsObserver {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'FORM_EVENTS'
        ]);
    }

    init () {
        this.$(document).ajaxSuccess((_event, _xhr, _settings, _data) => {
            const _requestUrl = _settings.url;

            if (_requestUrl.indexOf('/targets/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_TARGET_DETAILS_FETCHED, [_settings, _data]);
            }

            if (_requestUrl.indexOf('/targetsearch/') !== -1) {
                return this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_AJAX_TARGET_LIST_FETCHED, [_settings, _data]);
            }
        });
    }
}

module.exports = AjaxRequestsObserver;
