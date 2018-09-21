'use strict';

const _ = require('lodash-core');

class ElemConstructor {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$'
        ]);
    }

    createElem (_type, _value, _plainTextWrapper) {
        if (_type === 'text') {
            return this.$(`<${_plainTextWrapper}>${_value}</${_plainTextWrapper}>`);
        }

        if (_type === 'html') {
            return this.$(_value);
        }

        if (_type === 'img') {
            const _imgSrc = _value.indexOf('http') === -1 ? `data:image/png;base64, ${_value}` : _value;

            return this.$(`<img src="${_imgSrc}"></div>`);
        }
    }

    createWrapperDiv (_id) {
        const _$div = this.$('<div/>');

        if (_id) {
            _$div.attr('id', _id);
        }

        return _$div;
    }

    createWrapperElem (_type, _id) {
        const _$elem = this.$(`<${_type}/>`);

        if (_id) {
            _$elem.attr('id', _id);
        }

        return _$elem;
    }

    static _isValidContent (_content) {
        return _content !== '' && !_.isNil(_content);
    }
}

module.exports = ElemConstructor;
