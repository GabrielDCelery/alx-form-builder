'use strict';

const _ = require('lodash-core');

const LOCAL_ALX_FIELD_ID_PREFIX = 'id_';
const LOCAL_ALX_TARGET_FIELD_REGEXP = /^field_\w*$/;

class TargetGroupRecordProcessor {
    executeMethodOnTargetFields (_targetGroupRecord, _methodToExecute) {
        _.forEach(_targetGroupRecord, (_v, _column) => {
            if (!LOCAL_ALX_TARGET_FIELD_REGEXP.test(_column)) {
                return;
            }

            return _methodToExecute(`${LOCAL_ALX_FIELD_ID_PREFIX}${_column}`);
        });
    }
}

module.exports = TargetGroupRecordProcessor;
