'use strict';

class FormEvents {
    constructor() {
        this.EVENT_DEPENDENCY_CHANGED = 'alx-event-dependency-changed';
        this.EVENT_PAGINATION_CHANGED = 'alx-event-pagination-changed';
        this.EVENT_CHANGE_PAGINATION = 'alx-event-submit-form';
        this.EVENT_VALIDATE_FIELD = 'alx-event-validate-field';
        this.EVENT_VALIDATE_FORM = 'alx-event-validate-form';
        this.EVENT_FORM_VALIDATED = 'alx-event-form-validated';
        this.EVENT_SUBMIT_FORM = 'alx-event-change-pagination';
        this.EVENT_MOVE_TO_ELEM_PAGE = 'alx-event-move-to-elem-page';
        this.EVENT_CHECK_IF_FIELD_NEEDS_SYNCING = 'alx-event-sync-lookup-field';
        this.EVENT_SYNC_LOOKUP_FIELD = 'alx-event-lookup-field-synced';
        this.EVENT_FIELD_VALUE_CHANGED = 'alx-event-field-value-changed';
    }

    registerToFormEvent(_eventName, _methodToExecute) {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).on(_eventName, _methodToExecute);
    }

    trigger(_formEventName, _variables) {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).trigger(_formEventName, _variables);
    }

    _initDependencyChangedListener(_$form) {
        _$form.on(this.EVENT_DEPENDENCY_CHANGED, _event => {
            _event.preventDefault();

            _$form.trigger(this.EVENT_CHANGE_PAGINATION, []);
        });
    }

    _initPaginationChangedListener(_$form) {
        _$form.on(this.EVENT_PAGINATION_CHANGED, _event => {
            _event.preventDefault();
        });
    }

    _initSubmitFormListener(_$form) {
        _$form.on(this.EVENT_SUBMIT_FORM, _event => {
            _event.preventDefault();

            _$form.trigger(this.EVENT_VALIDATE_FORM, [true]);
        });
    }

    _initFormValidatedListener(_$form) {
        _$form.on(this.EVENT_FORM_VALIDATED, (_event, _bIsValid, _bForSubmission, _$erroredElems) => {
            _event.preventDefault();

            if (_bIsValid) {
                if (_bForSubmission) {
                    return this.QUICK_SELECTOR.getElemById(this.ID_FORM).submit();
                }

                return;
            }

            _$form.trigger(this.EVENT_MOVE_TO_ELEM_PAGE, [_$erroredElems.eq(0)]);
        });
    }

    _initFieldValueChangedLister(_$form) {
        _$form.on(this.EVENT_FIELD_VALUE_CHANGED, (_event, _this, _arguments) => {
            _event.preventDefault();

            _$form.trigger(this.EVENT_CHECK_IF_FIELD_NEEDS_SYNCING, [this.$(_this), _arguments[0]]);
        });
    }

    _initSyncLookupFieldListener(_$form) {
        _$form.on(this.EVENT_SYNC_LOOKUP_FIELD, (_event, _config) => {
            _event.preventDefault();

            if (_config.bValidateForm === true) {
                return _$form.trigger(this.EVENT_VALIDATE_FORM, [false]);
            }

            if (_config.fieldsToValidate) {
                _config.fieldsToValidate.forEach(_fieldToValidate => {
                    return _$form.trigger(this.EVENT_VALIDATE_FIELD, [_fieldToValidate]);
                });
            }
        });
    }

    init() {
        const _$form = this.QUICK_SELECTOR.getElemById(this.ID_FORM);

        this._initDependencyChangedListener(_$form);
        this._initPaginationChangedListener(_$form);
        this._initSubmitFormListener(_$form);
        this._initFormValidatedListener(_$form);
        this._initFieldValueChangedLister(_$form);
        this._initSyncLookupFieldListener(_$form);

        return this;
    }
}

module.exports = FormEvents;