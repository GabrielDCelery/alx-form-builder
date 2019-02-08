'use strict';

const _ = require('lodash-core');

class QuickSelector {
    constructor (_dependencies) {
        this._cached = {};
        this._getElem = this._getElem.bind(this);
        this._getFieldWrapperDiv = this._getFieldWrapperDiv.bind(this);
        this._getLabelAndFieldWrapperDiv = this._getLabelAndFieldWrapperDiv.bind(this);
        this._getLabelOfField = this._getLabelOfField.bind(this);
        this._getLabelWrapperDivOfField = this._getLabelWrapperDivOfField.bind(this);
    }

    _getElemFromCache (_strLabel, _strFieldId, _funcFindElem) {
        let _$cached = _.get(this._cached, [_strLabel, _strFieldId], null);

        if (_$cached) {
            return _$cached;
        }

        const _$elem = _funcFindElem(_strFieldId);

        if (_$elem.length !== 0) {
            _.set(this._cached, [_strLabel, _strFieldId], _$elem);
        }

        return _$elem;
    }

    _getLabelOfField (_fieldSelector) {
        return $('label', this.getFieldWrapperDiv(_fieldSelector).prev());
    }

    _getLabelAndFieldWrapperDiv (_fieldSelector) {
        return this.getFieldWrapperDiv(_fieldSelector).parent();
    }

    _getLabelWrapperDivOfField (_fieldSelector) {
        return this.getFieldWrapperDiv(_fieldSelector).prev();
    }

    _getFieldWrapperDiv (_fieldSelector) {
        let _$fieldWrapperDiv = $(_fieldSelector).parent();

        if (_$fieldWrapperDiv.parent().hasClass('formfileinput')) {
            _$fieldWrapperDiv = _$fieldWrapperDiv.parent().parent();
        }

        return _$fieldWrapperDiv;
    }

    _getElem (_selector) {
        return $(_selector);
    }

    getLabelOfField (_field) {
        return this._getElemFromCache('label', this.generateIdSelector(_field), this._getLabelOfField);
    }

    getLabelAndFieldWrapperDiv (_field) {
        return this._getElemFromCache('labelAndFieldWrapperDiv', this.generateIdSelector(_field), this._getLabelAndFieldWrapperDiv);
    }

    getLabelWrapperDivOfField (_field) {
        return this._getElemFromCache('labelWrapperDiv', this.generateIdSelector(_field), this._getLabelWrapperDivOfField);
    }

    getFieldWrapperDiv (_field) {
        return this._getElemFromCache('fieldWrapperDiv', this.generateIdSelector(_field), this._getFieldWrapperDiv);
    }

    getElemById (_id) {
        return this._getElemFromCache('elemById', this.generateIdSelector(_id), this._getElem);
    }

    getElemsByClass (_class) {
        return this._getElemFromCache('elemsByClass', this.generateClassSelector(_class), this._getElem);
    }

    getElemsByClasses (_classess) {
        const _selector = _classess.map(_class => {
            return this.generateClassSelector(_class);
        }).join('');

        return this._getElemFromCache('elemsByClasses', _selector, this._getElem);
    }

    getElem (_selector) {
        return this._getElemFromCache('elem', _selector, this._getElem);
    }

    getForm () {
        return this._getElemFromCache('form', 'form', this._getElem);
    }

    getBody () {
        return this._getElemFromCache('body', 'body', this._getElem);
    }

    getWindow () {
        return this._getElem(window);
    }

    generateIdSelector (_selector) {
        return _selector[0] === '#' ? _selector : `#${_selector}`;
    }

    generateClassSelector (_selector) {
        return _selector[0] === '.' ? _selector : `.${_selector}`;
    }

    emptyCache () {
        this._cached = {};
    }
}

module.exports = new QuickSelector();
