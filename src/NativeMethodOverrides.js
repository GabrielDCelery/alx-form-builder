'use strict';

class NativeMethodOverrides {
    _overrideJqueryVal() {
        const self = this;
        const _originalMethod = self.$.fn.val;

        self.$.fn.val = function () {
            const _returnValue = _originalMethod.apply(this, arguments);

            self.FORM_EVENTS.trigger(self.FORM_EVENTS.EVENT_FIELD_VALUE_CHANGED, [this, arguments]);

            return _returnValue;
        };
    }

    init() {
        this._overrideJqueryVal();

        return this;
    }
}

module.exports = NativeMethodOverrides;