'use strict';

const _ = require('lodash-core');

class FormEvents {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'QUICK_SELECTOR',
            'FORM_STATE'
        ]);

        this.EVENT_STATE_CHANGED = 'alx-event-state-changed';
        this.EVENT_PAGINATION_CHANGED = 'alx-event-pagination-changed';
        this.EVENT_CHANGE_PAGINATION = 'alx-event-submit-form';
        this.EVENT_VALIDATE_FIELD = 'alx-event-validate-field';
        this.EVENT_VALIDATE_TARGET_GROUP_FIELDS = 'alx-event-validate-target-group-fields';
        this.EVENT_VALIDATE_FORM = 'alx-event-validate-form';
        this.EVENT_FORM_VALIDATED = 'alx-event-form-validated';
        this.EVENT_SUBMIT_FORM = 'alx-event-change-pagination';
        this.EVENT_MOVE_TO_ELEM_PAGE = 'alx-event-move-to-elem-page';
        this.EVENT_BACKEND_ERRORED = 'alx-event-backend-errored';
        this.EVENT_AJAX_FETCHING_TARGET_DETAILS = 'alx-event-fetch-target-details';
        this.EVENT_AJAX_TARGET_DETAILS_FETCHED = 'alx-event-target-details-fetched';
        this.EVENT_AJAX_FETCHING_TARGET_LIST = 'alx-event-fetch-target-list';
        this.EVENT_AJAX_TARGET_LIST_FETCHED = 'alx-event-target-list-fetched';
        this.EVENT_SYNC_LOOKUP_FIELD = 'alx-event-sync-lookup-field';
        this.EVENT_SWITCHED_TO_EDITMODE = 'alx-event-switched-to-editmode';
        this.EVENT_CHANGE_FIELD_TYPE = 'alx-event-change-field-type';

        this.$form = this.QUICK_SELECTOR.getForm();

        this._initEventListeners();
    }

    _initEventListeners () {
        this._initStateChangedListener();
        this._initPaginationChangedListener();
        this._initSubmitFormListener();
        this._initFormValidatedListener();
        this._initAjaxFetchingTargetDetailsListener();
        this._initAjaxTargetListFetchedListener();
        this._initAjaxTargetDetailsFetchedListener();
        this._initBackendErroredListener();
    }

    _initStateChangedListener () {
        this.$form.on(this.EVENT_STATE_CHANGED, _event => {
            _event.preventDefault();

            this.$form.trigger(this.EVENT_CHANGE_PAGINATION, []);
        });
    }

    _initPaginationChangedListener () {
        this.$form.on(this.EVENT_PAGINATION_CHANGED, _event => {
            _event.preventDefault();
        });
    }

    _initSubmitFormListener () {
        this.$form.on(this.EVENT_SUBMIT_FORM, _event => {
            _event.preventDefault();

            this.$form.trigger(this.EVENT_VALIDATE_FORM, [true]);
        });
    }

    _initFormValidatedListener () {
        this.$form.on(this.EVENT_FORM_VALIDATED, (_event, _bIsValid, _bForSubmission, _$erroredElems) => {
            _event.preventDefault();

            if (!_bIsValid) {
                return this.$form.trigger(this.EVENT_MOVE_TO_ELEM_PAGE, [_$erroredElems.eq(0)]);
            }

            if (_bForSubmission) {
                return this.$form.submit();
            }
        });
    }

    _initAjaxFetchingTargetDetailsListener () {
        this.$form.on(this.EVENT_AJAX_FETCHING_TARGET_DETAILS, () => {
            this.FORM_STATE.toggleAjaxRequestState(true);
        });
    }

    _initAjaxTargetListFetchedListener () {
        this.$form.on(this.EVENT_AJAX_TARGET_LIST_FETCHED, () => {
            this.$form.trigger(this.EVENT_SYNC_LOOKUP_FIELD, []);
        });
    }

    _initAjaxTargetDetailsFetchedListener () {
        this.$form.on(this.EVENT_AJAX_TARGET_DETAILS_FETCHED, (_event, _bIsParentTargetGroupRecord, _fieldIds) => {
            if (_bIsParentTargetGroupRecord) {
                this.FORM_STATE.setToEditMode();
                this.$form.trigger(this.EVENT_SWITCHED_TO_EDITMODE);
            }

            _.forEach(_fieldIds, _fieldId => {
                this.$form.trigger(this.EVENT_VALIDATE_FIELD, [_fieldId]);
            });

            this.$form.trigger(this.EVENT_CHANGE_FIELD_TYPE);

            this.FORM_STATE.toggleAjaxRequestState(false);
        });
    }

    _initBackendErroredListener () {
        this.$form.on(this.EVENT_BACKEND_ERRORED, (_event, _$erroredElems) => {
            return this.$form.trigger(this.EVENT_MOVE_TO_ELEM_PAGE, [_$erroredElems.eq(0)]);
        });
    }

    registerToFormEvent (_eventName, _methodToExecute) {
        this.$form.on(_eventName, function () {
            return setTimeout(() => {
                return _methodToExecute.apply(undefined, arguments);
            }, 0);
        });
    }

    trigger (_formEventName, _variables) {
        this.$form.trigger(_formEventName, _variables);
    }
}

module.exports = FormEvents;
