'user strict';

class DependencyInjector {
    setTargetInstance(_targetInstance) {
        this.targetInstance = _targetInstance;

        return this;
    }

    inject(_injectConfigs) {
        _injectConfigs.forEach(_injectConfig => {
            if (this.targetInstance.hasOwnProperty(_injectConfig[0])) {
                throw new Error(`Invalid dependency injection, key already exists -> ${JSON.stringify(_injectConfig[0])}`);
            }

            return Object.defineProperty(this.targetInstance, _injectConfig[0], {
                value: _injectConfig[1],
                configurable: false,
                writable: false
            });
        });
    }
}

module.exports = DependencyInjector;