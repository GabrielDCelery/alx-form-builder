'use strict';

const _ = {
    forEach: require('lodash.foreach')
};

const POSITION_METHOD_LOOKUP = {
    top: 'prepend',
    bottom: 'append',
    after: 'after'
};

class ElemRelocator {
    start (_elemsToRelocateConfig) {
        _.forEach(_elemsToRelocateConfig, (_elemToRelocateConfig, _toRelocate) => {
            const _moveMethod = ElemRelocator._getMoveMethod(_elemToRelocateConfig.position);

            this.QUICK_SELECTOR.getElemById(_elemToRelocateConfig.moveTo)[_moveMethod](this.QUICK_SELECTOR.getElemById(_toRelocate));
        });
    }

    static _getMoveMethod (_position) {
        const _moveMethod = POSITION_METHOD_LOOKUP[_position];

        if (!_moveMethod) {
            throw new Error(`Invalid position for element -> ${_position}`);
        }

        return _moveMethod;
    }
}

module.exports = ElemRelocator;
