'use strict';

const _ = {
    forEach: require('lodash.foreach')
}

class ElemRelocator {
    start(_elemsToRelocateConfig) {
        _.forEach(_elemsToRelocateConfig, (_elemToRelocateConfig, _toRelocate) => {
            const _moveMethod = ElemRelocator._getMoveMethod(_elemToRelocateConfig.position);

            this.QUICK_SELECTOR.getElemById(_elemToRelocateConfig.moveTo)[_moveMethod](this.QUICK_SELECTOR.getElemById(_toRelocate));
        });
    }

    static _getMoveMethod(_position) {
        if (_position === 'top') {
            return 'prepend';
        }

        if (_position === 'bottom') {
            return 'append';
        }

        if (_position === 'after') {
            return 'after';
        }

        throw new Error(`Invalid position for element -> ${_position}`);
    }
}

module.exports = ElemRelocator;