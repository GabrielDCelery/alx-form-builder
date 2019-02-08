'use strict';

const _ContentInjectorInterface = require('./_ContentInjectorInterface');
const labeler = require('../../../helpers/labeler');

class PluginContentInjector extends _ContentInjectorInterface {
    constructor (_dependencies) {
        super();
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            'QUICK_SELECTOR',
            'ELEM_CONSTRUCTOR',
            'DECORATOR_ID_HEADING',
            'DECORATOR_ID_HEADING_INNER',
            'DECORATOR_ID_LOGO',
            'DECORATOR_ID_HEADING_INNER_TITLE',
            'DECORATOR_ID_MAIN',
            'DECORATOR_ID_MAIN_INNER',
            'DECORATOR_ID_MAIN_INNER_TITLE',
            'DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER',
            'DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_CONTAINER',
            'DECORATOR_ID_SAVE_AND_LOAD_BUTTON_HELPER_TEXT',
            'DECORATOR_ID_FOOTER',
            'DECORATOR_ID_FOOTER_INNER',
            'DECORATOR_ID_FOOTER_INNER_TITLE'
        ]);
    }

    injectStickyNote (_type, _value) {
        const _$stickyNoteWrapper = this._generateWrapperDiv(labeler.get('ID_STICKY_NOTE'));
        const _$stickyNote = this._generateContent(_type, _value, 'p');

        this.QUICK_SELECTOR.getElemById(labeler.get('ID_MAIN')).prepend(_$stickyNoteWrapper.append(_$stickyNote));

        return _$stickyNoteWrapper;
    }
}

module.exports = PluginContentInjector;
