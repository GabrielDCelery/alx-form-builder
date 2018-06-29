'use strict';

class Bugfix {
    _fixEnterTryingToSubmit () {
        this.QUICK_SELECTOR.getElemById(this.ID_FORM).keypress(_event => {
            if (_event.which === 13 && !this.$(_event.target).is('textarea')) {
                return false;
            }
        });
    }

    init () {
        this._fixEnterTryingToSubmit();
    }
}

module.exports = Bugfix;
