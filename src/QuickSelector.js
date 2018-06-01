'use strict';

const _ = {
    get: require('lodash.get'),
    set: require('lodash.set')
}

class QuickSelector {
    constructor() {
        this.cached = {};
        this._getElem = this._getElem.bind(this);
        this._getFieldWrapperDiv = this._getFieldWrapperDiv.bind(this);
        this._getLabelAndFieldWrapperDiv = this._getLabelAndFieldWrapperDiv.bind(this);
        this._getLabelOfField = this._getLabelOfField.bind(this);
        this._getLabelWrapperDivOfField = this._getLabelWrapperDivOfField.bind(this);
    }

    _getElemFromCache(_strLabel, _strFieldId, _funcFindElem) {
        let _$cached = _.get(this.cached, [_strLabel, _strFieldId], null);

        if (_$cached) {
            return _$cached;
        }

        const _$elem = _funcFindElem(_strFieldId);

        if (_$elem.length !== 0) {
            _.set(this.cached, [_strLabel, _strFieldId], _$elem);
        }

        return _$elem;
    }

    _getLabelOfField(_fieldSelector) {
        return this.$('label', this.getFieldWrapperDiv(_fieldSelector).prev());
    }

    _getLabelAndFieldWrapperDiv(_fieldSelector) {
        return this.getFieldWrapperDiv(_fieldSelector).parent();
    }

    _getLabelWrapperDivOfField(_fieldSelector) {
        return this.getFieldWrapperDiv(_fieldSelector).prev();
    }

    _getFieldWrapperDiv(_fieldSelector) {
        let _$fieldWrapperDiv = this.$(_fieldSelector).parent();

        if (_$fieldWrapperDiv.parent().hasClass('formfileinput')) {
            _$fieldWrapperDiv = _$fieldWrapperDiv.parent().parent();
        }

        return _$fieldWrapperDiv;
    }

    _getElem(_selector) {
        return this.$(_selector);
    }

    getLabelOfField(_field) {
        return this._getElemFromCache('label', this.generateIdSelector(_field), this._getLabelOfField);
    }

    getLabelAndFieldWrapperDiv(_field) {
        return this._getElemFromCache('labelAndFieldWrapperDiv', this.generateIdSelector(_field), this._getLabelAndFieldWrapperDiv);
    }

    getLabelWrapperDivOfField(_field) {
        return this._getElemFromCache('labelWrapperDiv', this.generateIdSelector(_field), this._getLabelWrapperDivOfField);
    }

    getFieldWrapperDiv(_field) {
        return this._getElemFromCache('fieldWrapperDiv', this.generateIdSelector(_field), this._getFieldWrapperDiv);
    }

    getElemById(_id) {
        return this._getElemFromCache('elemById', this.generateIdSelector(_id), this._getElem);
    }

    getElemsByClass(_class) {
        return this._getElemFromCache('elemsByClass', this.generateClassSelector(_class), this._getElem);
    }

    generateIdSelector(_selector) {
        return _selector[0] === '#' ? _selector : `#${_selector}`;
    }

    generateClassSelector(_selector) {
        return _selector[0] === '.' ? _selector : `.${_selector}`;
    }

    emptyCache() {
        this.cached = {};
    }
}

module.exports = QuickSelector;