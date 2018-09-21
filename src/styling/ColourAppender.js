'use strict';

const _ = require('lodash-core');
const REGEXP_COLOUR_HEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

const DEFAULT_COLOURS = {
    PRIMARY: '#000',
    SECONDARY: '#aaa',
    TERTIARY: 'eee'
};

class ColourAppender {
    constructor (_colourConfig = {}) {
        this.COLOR_PRIMARY = 'primary';
        this.COLOR_SECONDARY = 'secondary';
        this.COLOR_TERTIARY = 'tertiary';
        this.COLOR_WHITE = 'white';
        this.COLOR_NONE = 'none';

        this.PROPERTY_COLOUR = 'color';
        this.PROPERTY_BACKGROUND_COLOUR = 'background-color';

        this.colours = {};
        this.colours[this.COLOR_NONE] = '';
        this.colours[this.COLOR_PRIMARY] = ColourAppender._convertColourToHex(_.get(_colourConfig, 'primary')) || DEFAULT_COLOURS.PRIMARY;
        this.colours[this.COLOR_SECONDARY] = ColourAppender._convertColourToHex(_.get(_colourConfig, 'secondary')) || DEFAULT_COLOURS.SECONDARY;
        this.colours[this.COLOR_TERTIARY] = ColourAppender._convertColourToHex(_.get(_colourConfig, 'tertiary')) || DEFAULT_COLOURS.TERTIARY;
        this.colours[this.COLOR_WHITE] = '#fff';
    }

    appendColourToElems (_$elems, _type, _colour) {
        _$elems.css(_type, this.colours[_colour]);

        return _$elems;
    }

    static _convertColourToHex (_colour) {
        if (REGEXP_COLOUR_HEX.test(_colour)) {
            return _colour;
        }

        return null;
    }
}

module.exports = ColourAppender;
