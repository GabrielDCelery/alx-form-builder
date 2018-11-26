'use strict';

const _ = require('lodash-core');
const contrast = require('wcag-contrast');

const DEFAULT_SIMPLE_COLOUR_CONFIG = {
    primary: '#666',
    secondary: '#000'
};

const DEFAULT_DETAILED_COLOUR_CONFIG = {
    page: {
        title: null,
        footer: null
    },
    navigation: {
        background: null,
        tabs: {
            text: null,
            background: null,
            active: {
                background: null,
                text: null
            }
        },
        buttons: {
            background: null,
            text: null
        }
    },
    controls: {
        buttons: {
            border: null,
            text: null
        }
    },
    groups: {
        heading: {
            text: null,
            background: null
        },
        description: {
            text: null,
            background: null
        }
    },
    fields: {
        helperText: {
            text: null,
            background: null
        }
    }
};

class ColourAppender {
    constructor (_colourConfig = {}) {
        this.simpleConfig = _.defaultsDeep({}, _colourConfig.simple, DEFAULT_SIMPLE_COLOUR_CONFIG);
        this.detailedConfig = _.defaultsDeep({}, _colourConfig.detailed, DEFAULT_DETAILED_COLOUR_CONFIG);

        this.COLOUR_WHITE = 'white';
        this.COLOUR_BLACK = 'black';
        this.COLOUR_NONE = 'none';

        this.COLOUR_PAGE_TITLE = 'page-title';

        this.COLOUR_NAVIGATION = 'navigation';
        this.COLOUR_NAVIGATION_TAB_BACKGROUND = 'navigation-tab-background';
        this.COLOUR_NAVIGATION_TAB_BACKGROUND_ACTIVE = 'navigation-tab-background-active';
        this.COLOUR_NAVIGATION_TAB_TEXT = 'navigation-tab-text';
        this.COLOUR_NAVIGATION_TAB_TEXT_ACTIVE = 'navigation-tab-text-active';
        this.COLOUR_NAVIGATION_BUTTON_BACKGROUND = 'navigation-button-background';
        this.COLOUR_NAVIGATION_BUTTON_TEXT = 'navigation-button-text';
        this.COLOUR_NAVIGATION_BUTTON_BORDER = 'navigation-button-border';

        this.COLOUR_CONTROLLERS_BUTTON_BORDER = 'controllers-button-border';
        this.COLOUR_CONTROLLERS_BUTTON_TEXT = 'controllers-button-text';

        this.COLOUR_GROUPS_HEADING_TEXT = 'groups-heading-text';
        this.COLOUR_GROUPS_HEADING_BACKGROUND = 'groups-heading-background';
        this.COLOUR_GROUPS_HEADING_BORDER = 'groups-heading-border';

        this.COLOUR_GROUPS_DESCRIPTION_TEXT = 'groups-description-text';
        this.COLOUR_GROUPS_DESCRIPTION_BACKGROUND = 'groups-description-background';
        this.COLOUR_GROUPS_DESCRIPTION_BORDER = 'groups-description-border';

        this.COLOUR_FIELDS_HELPER_TEXT = 'groups-helper-text';
        this.COLOUR_FIELDS_HELPER_BACKGROUND = 'groups-helper-background';
        this.COLOUR_FIELDS_HELPER_BORDER = 'groups-helper-border';

        this.PROPERTY_COLOUR = 'color';
        this.PROPERTY_BACKGROUND_COLOUR = 'background-color';
        this.PROPERTY_BORDER_COLOUR = 'border-color';

        this.colours = {
            [this.COLOUR_NONE]: '',
            [this.COLOUR_WHITE]: '#FFF',
            [this.COLOUR_BLACK]: '#000',
            [this.COLOUR_PAGE_TITLE]: () => {
                return this._pickMostContrastingValidColour(
                    this.colours[this.COLOUR_WHITE],
                    [this.simpleConfig.secondary, this.simpleConfig.primary],
                    this.detailedConfig.page.title
                );
            },
            [this.COLOUR_NAVIGATION_TAB_BACKGROUND]: this.detailedConfig.navigation.tabs.background || this.simpleConfig.primary,
            [this.COLOUR_NAVIGATION_TAB_BACKGROUND_ACTIVE]: this.detailedConfig.navigation.tabs.active.background || this.simpleConfig.secondary,
            [this.COLOUR_NAVIGATION_TAB_TEXT]: () => this.detailedConfig.navigation.tabs.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_NAVIGATION_TAB_BACKGROUND]),
            [this.COLOUR_NAVIGATION_TAB_TEXT_ACTIVE]: () => this.detailedConfig.navigation.tabs.active.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_NAVIGATION_TAB_BACKGROUND_ACTIVE]),
            [this.COLOUR_NAVIGATION_BUTTON_BACKGROUND]: this.detailedConfig.navigation.buttons.background || this.simpleConfig.secondary,
            [this.COLOUR_NAVIGATION_BUTTON_TEXT]: () => this.detailedConfig.navigation.buttons.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_NAVIGATION_BUTTON_BACKGROUND]),
            [this.COLOUR_NAVIGATION_BUTTON_BORDER]: () => ColourAppender._lightenOrDarkenColor(this.colours[this.COLOUR_NAVIGATION_BUTTON_BACKGROUND], -30),
            [this.COLOUR_CONTROLLERS_BUTTON_BORDER]: () => {
                return this._pickMostContrastingValidColour(
                    this.colours[this.COLOUR_WHITE],
                    [this.simpleConfig.primary, this.simpleConfig.secondary],
                    this.detailedConfig.controls.buttons.border
                );
            },
            [this.COLOUR_CONTROLLERS_BUTTON_TEXT]: () => {
                return this._pickMostContrastingValidColour(
                    this.colours[this.COLOUR_WHITE],
                    [this.simpleConfig.secondary, this.simpleConfig.primary],
                    this.detailedConfig.controls.buttons.text
                );
            },
            [this.COLOUR_GROUPS_HEADING_BACKGROUND]: this.detailedConfig.groups.heading.background || this.simpleConfig.primary,
            [this.COLOUR_GROUPS_HEADING_TEXT]: () => this.detailedConfig.groups.heading.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_GROUPS_HEADING_BACKGROUND]),
            [this.COLOUR_GROUPS_HEADING_BORDER]: () => ColourAppender._lightenOrDarkenColor(this.colours[this.COLOUR_GROUPS_HEADING_BACKGROUND], -30),
            [this.COLOUR_GROUPS_DESCRIPTION_BACKGROUND]: this.detailedConfig.groups.description.background || this.simpleConfig.secondary,
            [this.COLOUR_GROUPS_DESCRIPTION_TEXT]: () => this.detailedConfig.groups.description.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_GROUPS_DESCRIPTION_BACKGROUND]),
            [this.COLOUR_GROUPS_DESCRIPTION_BORDER]: () => ColourAppender._lightenOrDarkenColor(this.colours[this.COLOUR_GROUPS_DESCRIPTION_BACKGROUND], -30),
            [this.COLOUR_FIELDS_HELPER_BACKGROUND]: this.detailedConfig.fields.helperText.background || this.simpleConfig.secondary,
            [this.COLOUR_FIELDS_HELPER_TEXT]: () => this.detailedConfig.fields.helperText.text || this._chooseBlackOrWhiteBasedOnContrast(this.colours[this.COLOUR_FIELDS_HELPER_BACKGROUND]),
            [this.COLOUR_FIELDS_HELPER_BORDER]: () => ColourAppender._lightenOrDarkenColor(this.colours[this.COLOUR_FIELDS_HELPER_BACKGROUND], -30)
        };

        this.$elem = null;
    }

    _chooseBlackOrWhiteBasedOnContrast (_colour) {
        const c1 = contrast.hex(_colour, this.colours[this.COLOUR_WHITE]);
        const c2 = contrast.hex(_colour, this.colours[this.COLOUR_BLACK]);

        return c2 > c1 ? this.colours[this.COLOUR_BLACK] : this.colours[this.COLOUR_WHITE];
    }

    _chooseMostConstrastingColour (_colourToCheckAgainst, _colours) {
        let _mostContrastingColour = null;
        let _mostContrastingColourContrast = 0;

        _.forEach(_colours, _colour => {
            const _contrast = contrast.hex(_colourToCheckAgainst, _colour);

            if (_contrast > _mostContrastingColourContrast) {
                _mostContrastingColour = _colour;
                _mostContrastingColourContrast = _contrast;
            }
        });

        return _mostContrastingColour;
    }

    _getMostContrastingValidColour (_colourToCheckAgainst, _coloursToCheck) {
        if (typeof _coloursToCheck === 'string') {
            _coloursToCheck = [_coloursToCheck];
        }

        const _filteredColours = _coloursToCheck.filter(ColourAppender._isContrastingEnough(_colourToCheckAgainst));

        if (_filteredColours.length === 0) {
            return this._chooseBlackOrWhiteBasedOnContrast(_colourToCheckAgainst);
        }

        return this._chooseMostConstrastingColour(_colourToCheckAgainst, _filteredColours);
    }

    _pickMostContrastingValidColour (_backgroundColour, _textColours, _overrideColour) {
        if (_overrideColour) {
            return _overrideColour;
        }

        return this._getMostContrastingValidColour(_backgroundColour, _textColours);
    }

    getElems () {
        return this.$elems;
    }

    setElems (_$elems) {
        this.$elems = _$elems;

        return this;
    }

    appendColourToElems (_type, _colour) {
        this.$elems.css(_type, this.colours[_colour]);

        return this;
    }

    static _isContrastingEnough (_colourToCheckAgainst) {
        return (_colourToCheck) => {
            return contrast.hex(_colourToCheckAgainst, _colourToCheck) > 4.5;
        };
    }

    static _lightenOrDarkenColor (_colorCode, _amount) {
        let _usePound = false;

        if (_colorCode[0] === '#') {
            _colorCode = _colorCode.slice(1);

            if (_colorCode.length === 3) {
                _colorCode = _colorCode + _colorCode;
            }

            _usePound = true;
        }

        var num = parseInt(_colorCode, 16);

        var r = (num >> 16) + _amount;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        var b = ((num >> 8) & 0x00FF) + _amount;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        var g = (num & 0x0000FF) + _amount;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        return (_usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
}

module.exports = ColourAppender;
