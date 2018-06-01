'use strict';

require('./Paginator.scss');

const LOCAL_DECORATOR_TRIGGER_MOVE_TO_PAGE = 'alx-trigger-move-to-page';
const LOCAL_DECORATOR_PAGE = 'alx-page';
const LOCAL_DECORATOR_ACTIVE_PAGE = 'alx-page-active';
const LOCAL_DATA_PAGE_ID = 'alx-page-id';
const LOCAL_DATA_PAGE_LABEL = 'alx-page-label';
const LOCAL_DECORATOR_PAGE_NAVIGATION_BUTTON = 'alx-page-navigation-button';
const LOCAL_DECORATOR_PAGE_NAVIGATION_NEXT_BUTTON = 'alx-page-navigation-next-button';
const LOCAL_DECORATOR_PAGE_NAVIGATION_PREVIOUS_BUTTON = 'alx-page-navigation-previous-button';

class Paginator {
    constructor() {
        this.animationConfig = {
            duration: 0
        };
        this._moveToPage = this._moveToPage.bind(this);
    }

    _initGlobalEventListeners() {
        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_CHANGE_PAGINATION, (_event, _pageId) => {
            _event.preventDefault();

            return this._moveToPage(_pageId);
        });

        this.FORM_EVENTS.registerToFormEvent(this.FORM_EVENTS.EVENT_MOVE_TO_ELEM_PAGE, (_event, _$elem) => {
            _event.preventDefault();

            return this._moveToPage(_$elem.closest(`.${LOCAL_DECORATOR_PAGE}`).attr('id'));
        });
    }

    _initLocalEventListeners() {
        this.$(`.${LOCAL_DECORATOR_TRIGGER_MOVE_TO_PAGE}`).off('click').on('click', _event => {
            _event.preventDefault();

            return this._moveToPage(this.$(_event.target).data(LOCAL_DATA_PAGE_ID));
        });
    }

    _getActivePageIndex() {
        return this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).toArray().map(_elem => {
            return `#${this.$(_elem).attr('id')}`
        }).indexOf(`#${this.$(`.${LOCAL_DECORATOR_ACTIVE_PAGE}`).attr('id')}`);
    }

    _traverseToNextValidPageId(_activePageIndex, _pointerTraverseMethod) {
        let _pointer = _activePageIndex;

        while (true) {
            _pointer = _pointerTraverseMethod(_pointer);

            if (_pointer < 0 || _pointer > this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).length - 1) {
                return null;
            }

            if (!this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).eq(_pointer).hasClass(this.DECORATOR_STATE_HIDDEN)) {
                return this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).eq(_pointer).attr('id');
            }
        }
    }

    _generateNavButton(_label, _pageId, _customClasses, _$default) {
        if (_pageId == null) {
            if (_$default) {
                return _$default;
            }

            return null;
        }

        const _$button = this.$('<button/>');

        _$button.text(_label);
        _$button.addClass(LOCAL_DECORATOR_TRIGGER_MOVE_TO_PAGE);
        _$button.addClass(_customClasses.join(' '));
        _$button.data(LOCAL_DATA_PAGE_ID, _pageId);

        return _$button;
    }

    _generateSubmitButton() {
        const _$submitButton = this.$('<button/>')
            .text('Submit')
            .addClass(LOCAL_DECORATOR_PAGE_NAVIGATION_BUTTON)
            .addClass(LOCAL_DECORATOR_PAGE_NAVIGATION_NEXT_BUTTON);

        _$submitButton.on('click', _event => {
            _event.preventDefault();

            this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_SUBMIT_FORM);
        });

        return _$submitButton;
    }

    _generatePreviousButton() {
        const _validPageId = this._traverseToNextValidPageId(this._getActivePageIndex(), _val => {
            return _val - 1
        });

        return this._generateNavButton('Previous', _validPageId, [
            LOCAL_DECORATOR_PAGE_NAVIGATION_BUTTON,
            LOCAL_DECORATOR_PAGE_NAVIGATION_PREVIOUS_BUTTON
        ]);
    }

    _generateNextButton() {
        const _validPageId = this._traverseToNextValidPageId(this._getActivePageIndex(), _val => {
            return _val + 1
        });

        return this._generateNavButton('Next', _validPageId, [
            LOCAL_DECORATOR_PAGE_NAVIGATION_BUTTON,
            LOCAL_DECORATOR_PAGE_NAVIGATION_NEXT_BUTTON
        ], this._generateSubmitButton());
    }

    _generateNavBar() {
        const _$ul = this.$('<ul/>');

        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).each((_index, _page) => {
            const _$page = this.$(_page);
            const _$li = this.$('<li/>');
            const _$a = this.$('<a/>');

            _$a.attr('href', '#')
                .data(LOCAL_DATA_PAGE_ID, _$page.attr('id'))
                .addClass(LOCAL_DECORATOR_TRIGGER_MOVE_TO_PAGE)
                .text(_$page.data(LOCAL_DATA_PAGE_LABEL));

            _$li.append(_$a);
            _$ul.append(_$li);
        });

        this.QUICK_SELECTOR.getElemById(this.IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER).append(_$ul);
    }

    _toggleNavBarVisibility() {
        const _$navBarButtons = this.QUICK_SELECTOR.getElemById(this.IDENTIFIER_PAGE_NAVIGATION_TOP_CONTAINER).find('li');
        const _activePageIndex = this._getActivePageIndex();

        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).each((_index, _page) => {
            const _$page = this.$(_page);
            const _method = _$page.hasClass(this.DECORATOR_STATE_HIDDEN) ? 'hide' : 'show';
            const _$navBarButton = _$navBarButtons.eq(_index)

            _$navBarButton.find('a')[_method](this.animationConfig);
            _$navBarButton.toggleClass('page-menu-active', _index === _activePageIndex);
        });
    }

    _prepareGroupsForPagination(_pages) {
        _pages.map((_page, _index) => {
            const _$page = this.QUICK_SELECTOR.getElemById(_page.id);

            _$page.addClass(LOCAL_DECORATOR_PAGE);
            _$page.data(LOCAL_DATA_PAGE_LABEL, _page.label);

            return `#${_$page.attr('id')}`;
        }).join(',');
    }

    _setActivePage(_pageId) {
        this.QUICK_SELECTOR.getElemsByClass(LOCAL_DECORATOR_PAGE).removeClass(LOCAL_DECORATOR_ACTIVE_PAGE);
        this.QUICK_SELECTOR.getElemById(_pageId).addClass(LOCAL_DECORATOR_ACTIVE_PAGE);
    }

    _moveToPage(_pageId) {
        if (_pageId) {
            this._setActivePage(_pageId);
        }

        this._toggleNavBarVisibility();
        this.QUICK_SELECTOR.getElemById(this.IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER)
            .empty()
            .append(this._generatePreviousButton())
            .append(this._generateNextButton());
        this._initLocalEventListeners();
        this.FORM_EVENTS.trigger(this.FORM_EVENTS.EVENT_PAGINATION_CHANGED);
    }

    init(_pagesConfig) {
        if (!_pagesConfig || _pagesConfig.length === 0) {
            return this.QUICK_SELECTOR.getElemById(this.IDENTIFIER_PAGE_NAVIGATION_BOTTOM_CONTAINER).append(this._generateSubmitButton());
        }

        this._initGlobalEventListeners();
        this._prepareGroupsForPagination(_pagesConfig);
        this._generateNavBar();
        this._moveToPage(_pagesConfig[0].id);
        this.animationConfig = {
            duration: 600
        };
    }
}

module.exports = Paginator;