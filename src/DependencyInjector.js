'user strict';

class DependencyInjector {
    setTargetInstance(_targetInstance) {
        this.targetInstance = _targetInstance;

        return this;
    }

    inject(_injectConfigs) {
        _injectConfigs.forEach(_injectConfig => {
            if (this.targetInstance.hasOwnProperty(_injectConfig.key)) {
                throw new Error(`Invalid dependency injection, key already exists -> ${JSON.stringify(_injectConfig)}`);
            }

            return Object.defineProperty(this.targetInstance, _injectConfig.key, {
                value: _injectConfig.value,
                configurable: false,
                writable: false
            });
        });
    }
}

module.exports = DependencyInjector;