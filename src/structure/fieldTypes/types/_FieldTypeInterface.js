'use strict';

class _FieldInterface {
    destroy () {
        throw new Error('This method should be overriden! -> destroy');
    }

    init () {
        throw new Error('This method should be overriden! -> init');
    }
}

module.exports = _FieldInterface;
