'user strict';

class DependencyInjector {
    static inject (_instance, _dependencies, _toInjects) {
        _toInjects.forEach(_toInject => {
            if (_instance.hasOwnProperty(_toInject)) {
                throw new Error(`Invalid dependency injection, key already exists -> ${_toInject}`);
            }

            if (!_dependencies.hasOwnProperty(_toInject)) {
                throw new Error(`Invalid dependency injection, dependency not defined -> ${_toInject}`);
            }

            Object.defineProperty(_instance, _toInject, {
                value: _dependencies[_toInject],
                configurable: false,
                writable: false
            });
        });

        return _instance;
    }
}

module.exports = DependencyInjector;
