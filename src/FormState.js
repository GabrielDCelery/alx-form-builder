'use strict';

class FormState {
    constructor () {
        this.bInEditMode = false;
        this.ajaxRequestInProgress = false;
    }

    toggleAjaxRequestState (_bNewState) {
        this.ajaxRequestInProgress = _bNewState;
    }

    setToEditMode () {
        this.bInEditMode = true;
    }

    isAjaxRequestInProgress () {
        return this.ajaxRequestInProgress;
    }

    isNewSubmission () {
        return !this.bInEditMode;
    }

    isInEditMode () {
        return this.bInEditMode;
    }
}

module.exports = FormState;
