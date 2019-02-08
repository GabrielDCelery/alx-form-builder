'use strict';

class Labeler {
    constructor () {
        this.ID_PAGE_HEADING_INNER_TITLE = 'alx-heading-inner-title';
        this.ID_PAGE_NAVIGATION_TOP_CONTAINER = 'alx-page-navigation-top-container';
        this.CLASS_BUTTON_SAVE_LOAD = 'alx-save-and-load-button';
        this.CLASS_BUTTON_LOGOUT = 'alx-logout-button';
        this.CLASS_GROUP_TITLE = 'alx-group-title';
        this.CLASS_GROUP_DESCRIPTION = 'alx-group-description';
        this.CLASS_FIELD_HELPER_TEXT = 'alx-form-field-helper-text';
        this.CLASS_FIELD_DESCRIPTION = 'alx-form-field-description';
        this.CLASS_INJECTED_CONTENT_TEXT = 'alx-injected-content-text';
        this.CLASS_INJECTED_CONTENT_HTML = 'alx-injected-content-html';
        this.CLASS_PAGE_NAV_BUTTON = 'alx-page-nav-button';
        this.CLASS_PAGE_NAV_MENU_ITEM = 'alx-page-nav-menu-item';
        this.CLASS_PAGE_NAV_MENU_ITEM_ACTIVE = 'alx-page-nav-menu-item-active';
        this.CLASS_STATE_ACTIVE = 'alx-state-active';
        this.ID_STICKY_NOTE = 'alx-sticky-note';
        this.ID_MAIN = 'alx-main';

        this.get = this.get.bind(this);
    }

    get (_label) {
        if (!this[_label]) {
            throw new Error(`Tried to get non-existent label -> ${_label}`);
        }

        return this[_label];
    }
}

module.exports = new Labeler();
