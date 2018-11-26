'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class ContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'PREFIX_GROUP',
            'QUICK_SELECTOR',
            'COLOUR_APPENDER',
            'DECORATOR_CLASS_GROUP_TITLE',
            'DECORATOR_CLASS_GROUP_DESCRIPTION'
        ]);
    }

    injectDescription (_groupId, _type, _value) {
        if (!ContentInjector._isValidContent(_value)) {
            return this;
        }

        const _$groupDescription = this._generateContent(_type, _value, 'p');

        _$groupDescription.addClass(this.DECORATOR_CLASS_GROUP_DESCRIPTION);

        if (!this._isCustomContent(_type)) {
            this.COLOUR_APPENDER
                .setElems(_$groupDescription)
                .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_DESCRIPTION_TEXT)
                .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_DESCRIPTION_BACKGROUND)
                .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_DESCRIPTION_BORDER);
        }

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupDescription);

        return _$groupDescription;
    }

    injectTitle (_groupId, _type, _value) {
        if (!ContentInjector._isValidContent(_value)) {
            return this;
        }

        const _$groupTitle = this._generateContent(_type, _value, 'h2');

        _$groupTitle.addClass(this.DECORATOR_CLASS_GROUP_TITLE);

        this.COLOUR_APPENDER
            .setElems(_$groupTitle)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_HEADING_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_HEADING_BACKGROUND)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_GROUPS_HEADING_BORDER);

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupTitle);

        return _$groupTitle;
    }
}

module.exports = ContentInjector;
