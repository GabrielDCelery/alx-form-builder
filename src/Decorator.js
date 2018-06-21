'use strict';

const _ = {
    get: require('lodash.get'),
    union: require('lodash.union')
}

class Decorator {
    constructor() {
        this.globalDecoratorClasses = {};
    }

    _generateHtmlContent(_type, _value, _plainTextWrapper) {
        if (_type === 'text') {
            return this.$(`<${_plainTextWrapper}/>`).text(_value);
        }

        if (_type === 'html') {
            return _value;
        }

        if (_type === 'img') {
            const _imgSrc = _value.indexOf('http') === -1 ? `data:image/png;base64, ${_value}` : _value;

            return this.$(`<img src="${_imgSrc}"></div>`);
        }

        throw new Error(`Invalid content type -> ${_type}`);
    }

    _generateDecoratedDivWithContent(_type, _id, _config) {
        const _$div = this.$('<div/>');

        if (_id) {
            _$div.attr('id', _id);
        }

        if (_config.value) {
            _$div.append(this._generateHtmlContent(_config.type, _config.value, _config.plainTextWrapper));
        }

        return this._decorateElemWithCustomClasses(_$div, _type, _config.decoratorClasses);
    }

    _generateDecoratedElem(_type, _id, _config) {
        const _$elem = this._generateHtmlContent(_config.type, _config.value, _config.plainTextWrapper);

        if (_id) {
            _$elem.attr('id', _id);
        }

        return this._decorateElemWithCustomClasses(_$elem, _type, _config.decoratorClasses);
    }

    _decorateElemWithCustomClasses(_$elem, _type, _localDecoratorClasses) {
        if (_$elem.length === 0) {
            return _$elem;
        }

        const _classes = _.union(_localDecoratorClasses, _.get(this.globalDecoratorClasses, _type, []));

        if (_classes.length === 0) {
            return _$elem;
        }

        return _$elem.addClass(_classes.join(' '));
    }
}

module.exports = Decorator;