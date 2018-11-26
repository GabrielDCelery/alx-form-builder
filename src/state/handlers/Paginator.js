'use strict';

require('./Paginator.scss');

const LOCAL_DECORATOR_CLASS_TRIGGER_MOVE_TO_PAGE = 'alx-trigger-move-to-page';
const LOCAL_DECORATOR_CLASS_PAGE = 'alx-page';
const LOCAL_DECORATOR_CLASS_ACTIVE_PAGE = 'alx-page-active';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_BUTTON = 'alx-page-nav-button';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_NEXT_BUTTON = 'alx-page-nav-button-next';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_PREVIOUS_BUTTON = 'alx-page-nav-button-previous';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU = 'alx-page-nav-menu';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_INDICATOR = 'alx-page-nav-menu-step-indicator';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_ACTIVE = 'alx-page-nav-menu-step-active';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_HIDDEN = 'alx-page-nav-menu-step-hidden';
const LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_LAST = 'alx-page-nav-menu-step-last';

const LOCAL_DATA_PAGE_ID = 'alx-page-id';
const LOCAL_DATA_PAGE_LABEL = 'alx-page-label';

const LOCAL_ANIMATION_DURATION_UNINITALIZED = 0;
const LOCAL_ANIMATION_DURATION_INITIALIZED = 300;
const LOCAL_ANIMATION_HIDE = 'fadeOut';
const LOCAL_ANIMATION_SHOW = 'fadeIn';

class Paginator {
    constructor (_dependencies) {
        _dependencies.DependencyInjector.inject(this, _dependencies, [
            '$',
            'COLOUR_APPENDER',
            'ELEM_CONSTRUCTOR',
            'PREFIX_GROUP',
            'QUICK_SELECTOR',
            'FORM_EVENTS',
            'DECORATOR_CLASS_HIDDEN',
            'DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER',
            'DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER'
        ]);

        this._animationConfig = { duration: LOCAL_ANIMATION_DURATION_UNINITALIZED };
        this._moveToPage = this._moveToPage.bind(this);
    }

    _initGlobalEventListeners () {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHANGE_PAGINATION, (_event, _pageId) => {
            _event.preventDefault();

            return this._moveToPage(_pageId);
        });

        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_MOVE_TO_ELEM_PAGE, (_event, _$elem) => {
            _event.preventDefault();

            return this._moveToPage(_$elem.closest(`.${LOCAL_DECORATOR_CLASS_PAGE}`).attr('id'));
        });
    }

    _initLocalEventListeners () {
        this.$(`.${LOCAL_DECORATOR_CLASS_TRIGGER_MOVE_TO_PAGE}`).off('click').on('click', _event => {
            _event.preventDefault();

            return this._moveToPage(this.$(_event.target).data(LOCAL_DATA_PAGE_ID));
        });
    }

    _getActivePageIndex () {
        return this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).toArray().map(_elem => {
            return `#${this.$(_elem).attr('id')}`;
        }).indexOf(`#${this.$(`.${LOCAL_DECORATOR_CLASS_ACTIVE_PAGE}`).attr('id')}`);
    }

    _traverseToNextValidPageId (_activePageIndex, _pointerTraverseMethod) {
        let _pointer = _activePageIndex;

        while (true) {
            _pointer = _pointerTraverseMethod(_pointer);

            if (_pointer < 0 || _pointer > this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).length - 1) {
                return null;
            }

            if (!this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).eq(_pointer).hasClass(this.DECORATOR_CLASS_HIDDEN)) {
                return this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).eq(_pointer).attr('id');
            }
        }
    }

    _generateNavButton (_label, _pageId, _customClasses) {
        const _$button = this.ELEM_CONSTRUCTOR.createElem('text', _label, 'button')
            .addClass(LOCAL_DECORATOR_CLASS_TRIGGER_MOVE_TO_PAGE)
            .addClass(_customClasses.join(' '))
            .data(LOCAL_DATA_PAGE_ID, _pageId);
        this.COLOUR_APPENDER
            .setElems(_$button)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_BACKGROUND)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_BORDER);

        return _$button;
    }

    _generateSubmitButton () {
        const _$submitButton = this.ELEM_CONSTRUCTOR.createElem('text', 'Submit', 'button')
            .addClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_BUTTON)
            .addClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_NEXT_BUTTON);
        this.COLOUR_APPENDER
            .setElems(_$submitButton)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_BACKGROUND)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_TEXT)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BORDER_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_BUTTON_BORDER);

        _$submitButton.on('click', _event => {
            _event.preventDefault();

            this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SUBMIT_FORM);
        });

        return _$submitButton;
    }

    _generatePreviousButton () {
        const _validPageId = this._traverseToNextValidPageId(this._getActivePageIndex(), _val => {
            return _val - 1;
        });

        if (_validPageId === null) {
            return;
        }

        return this._generateNavButton('Previous', _validPageId, [
            LOCAL_DECORATOR_CLASS_PAGE_NAV_BUTTON,
            LOCAL_DECORATOR_CLASS_PAGE_NAV_PREVIOUS_BUTTON
        ]);
    }

    _generateNextButton () {
        const _validPageId = this._traverseToNextValidPageId(this._getActivePageIndex(), _val => {
            return _val + 1;
        });

        if (_validPageId === null) {
            return this._generateSubmitButton();
        }

        return this._generateNavButton('Next', _validPageId, [
            LOCAL_DECORATOR_CLASS_PAGE_NAV_BUTTON,
            LOCAL_DECORATOR_CLASS_PAGE_NAV_NEXT_BUTTON
        ]);
    }

    _generateNavBar () {
        const _$ul = this.ELEM_CONSTRUCTOR.createWrapperElem('ul').addClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU);

        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).each((_index, _page) => {
            const _$page = this.$(_page);
            const _$li = this.ELEM_CONSTRUCTOR.createWrapperElem('li').addClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_INDICATOR);

            const _$a = this.ELEM_CONSTRUCTOR.createElem('text', _$page.data(LOCAL_DATA_PAGE_LABEL), 'a')
                .addClass(LOCAL_DECORATOR_CLASS_TRIGGER_MOVE_TO_PAGE)
                .attr('href', '#')
                .data(LOCAL_DATA_PAGE_ID, _$page.attr('id'));

            this.COLOUR_APPENDER
                .setElems(_$a)
                .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_COLOUR, this.COLOUR_APPENDER.COLOR_PRIMARY);

            _$li.append(_$a);
            _$ul.append(_$li);
        });

        const _$topNavBar = this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER);

        this.COLOUR_APPENDER
            .setElems(_$topNavBar)
            .appendColourToElems(this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR, this.COLOUR_APPENDER.COLOUR_NAVIGATION_TAB_BACKGROUND);
        _$topNavBar.append(_$ul);
    }

    _setActiveTab () {
        const _$navBarButtons = this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_TOP_CONTAINER).find('li');
        const _activePageIndex = this._getActivePageIndex();
        let _lastPageIndex = null;

        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).each((_index, _page) => {
            const _$page = this.$(_page);
            const _bPageHidden = _$page.hasClass(this.DECORATOR_CLASS_HIDDEN);
            const _animation = _bPageHidden === true ? LOCAL_ANIMATION_HIDE : LOCAL_ANIMATION_SHOW;
            const _$navBarButton = _$navBarButtons.eq(_index);

            if (!_lastPageIndex && _bPageHidden) {
                _lastPageIndex = _index - 1;
            }

            _$navBarButton.toggleClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_HIDDEN, _$page.hasClass(this.DECORATOR_CLASS_HIDDEN));

            const _bIsActivePage = _index === _activePageIndex;
            const _$navBarText = _$navBarButton.find('a');

            _$navBarText[_animation](this._animationConfig);

            this.COLOUR_APPENDER
                .setElems(_$navBarButton)
                .appendColourToElems(
                    this.COLOUR_APPENDER.PROPERTY_BACKGROUND_COLOUR,
                    _bIsActivePage ? this.COLOUR_APPENDER.COLOUR_NAVIGATION_TAB_BACKGROUND_ACTIVE : this.COLOUR_APPENDER.COLOUR_NAVIGATION_TAB_BACKGROUND
                );
            this.COLOUR_APPENDER
                .setElems(_$navBarText)
                .appendColourToElems(
                    this.COLOUR_APPENDER.PROPERTY_COLOUR,
                    _bIsActivePage ? this.COLOUR_APPENDER.COLOUR_NAVIGATION_TAB_TEXT_ACTIVE : this.COLOUR_APPENDER.COLOUR_NAVIGATION_TAB_TEXT
                );
            _$navBarButton.toggleClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_ACTIVE, _bIsActivePage);
        });

        _$navBarButtons.removeClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_LAST);
        _$navBarButtons.eq(_lastPageIndex || _$navBarButtons.length - 1).addClass(LOCAL_DECORATOR_CLASS_PAGE_NAV_MENU_STEP_LAST);
    }

    _prepareGroupsForPagination (_pages) {
        return _pages.map((_page, _index) => {
            const _$page = this.QUICK_SELECTOR.getElemById(`${this.PREFIX_GROUP}${_page.id}`);

            _$page.addClass(LOCAL_DECORATOR_CLASS_PAGE);
            _$page.data(LOCAL_DATA_PAGE_LABEL, _page.label);
        });
    }

    _setActivePage (_pageId) {
        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_CLASS_PAGE).removeClass(LOCAL_DECORATOR_CLASS_ACTIVE_PAGE);
        this.QUICK_SELECTOR.getElemById(_pageId).addClass(LOCAL_DECORATOR_CLASS_ACTIVE_PAGE);
    }

    _moveToPage (_pageId) {
        if (_pageId) {
            this._setActivePage(_pageId);
        }

        this._setActiveTab();
        this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER)
            .empty()
            .append(this._generatePreviousButton())
            .append(this._generateNextButton());
        this._initLocalEventListeners();
        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_PAGINATION_CHANGED);
    }

    init (_pagesConfig) {
        if (!Array.isArray(_pagesConfig) || _pagesConfig.length === 0) {
            return this.QUICK_SELECTOR.getElemById(this.DECORATOR_ID_PAGE_NAVIGATION_BOTTOM_CONTAINER).append(this._generateSubmitButton());
        }

        this._initGlobalEventListeners();
        this._prepareGroupsForPagination(_pagesConfig);
        this._generateNavBar();
        this._moveToPage(`${this.PREFIX_GROUP}${_pagesConfig[0].id}`);
        this._animationConfig = { duration: LOCAL_ANIMATION_DURATION_INITIALIZED };
    }
}

module.exports = Paginator;
