'use strict';

const Sticky = require('sticky-js');

class StickyNote {
    init (_selector) {
        return new Sticky(_selector, { marginTop: 20 });
    }
}

module.exports = StickyNote;
