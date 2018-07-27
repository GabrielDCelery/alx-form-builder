'use strict';

class FieldInterface {
    constructor (_$) {
        this.$ = _$;
    }

    destroy () {
        throw new Error('This method should be overriden! -> destroy');
    }

    init () {
        throw new Error('This method should be overriden! -> init');
    }
}

module.exports = FieldInterface;
