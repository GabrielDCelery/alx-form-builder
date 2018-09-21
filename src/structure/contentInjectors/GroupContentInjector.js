'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');

class ContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'PREFIX_GROUP',
            'QUICK_SELECTOR',
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

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupDescription);

        return _$groupDescription;
    }

    injectTitle (_groupId, _type, _value) {
        if (!ContentInjector._isValidContent(_value)) {
            return this;
        }

        const _$groupTitle = this._generateContent(_type, _value, 'h2');

        _$groupTitle.addClass(this.DECORATOR_CLASS_GROUP_TITLE);

        this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_groupId}`).prepend(_$groupTitle);

        return _$groupTitle;
    }
}

module.exports = ContentInjector;
