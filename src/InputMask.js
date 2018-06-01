'use strict';

const Inputmask = require('inputmask')
const _ = {
    forEach: require('lodash.foreach')
};

class InputMask {
    init(_config) {
        _.forEach(_config, (_maskConfig, _fieldId) => {
            const _fieldConfig = {
                onincomplete: this._onInCompleteWrapper()
            };

            if (_maskConfig.mask) {
                _fieldConfig.mask = _maskConfig.mask;
            }

            return new Inputmask(_fieldConfig).mask(this.QUICK_SELECTOR.generateIdSelector(_fieldId));
        });
    }

    _onInCompleteWrapper() {
        return _event => {
            return this.$(_event.target).val('');
        }
    }
}

module.exports = InputMask;