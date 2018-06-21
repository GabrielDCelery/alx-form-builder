//============================================
//	Author:		2basix automatisering
//				http://2basix.nl
// 	Project: 	resource loader
// 	Version:	1.5.4 development (20120210)
// 	license: 	GNU General Public License v3
//	project:	http://code.google.com/p/rloader
//============================================
if(!jQuery.isFunction(jQuery.rloader))
{
  (function(b){b.rloader=function(c){function p(n,a){if(b.isFunction(n)||"string"===typeof n){if(b.isFunction(n))return n(a),!0;var d=window[n];return"function"===typeof d?(d(a),!0):"function"===typeof eval(n)?(eval(n).call(this,a),!0):!1}return!0}function q(b){console||(window.console={tlog:"",log:function(a){console.tlog+=a+"\n";return!0}});console.log(b)}function r(c){var a,d=b.rloader.track[c]._cback;if(d){for(a=0;a<d.length;a++)p(d[a].callback,d[a].arg);b.rloader.track[c]._cback=[]}return!0}function s(c){r(c);
  var a,d,f,e;for(d=0;d<b.rloader.track[c]._evts.length;d++)if(e=b.rloader.track[c]._evts[d],0===e.fired){f=!0;for(a=0;a<e.rlist.length;a++)if(b.rloader.track[e.rlist[a]]){if(0===b.rloader.track[e.rlist[a]].status){f=!1;break}}else{f=!1;break}f&&(p(e.func,e.arg),b.rloader.track[c]._evts[d].fired=1,b.rloader.track[c]._evts[d].rlist=null,b.rloader.track[c]._evts[d].event="",b.rloader.track[c]._evts[d].arg=null)}b.rloader.track[c]._evts=b.grep(b.rloader.track[c]._evts,function(a){return 1!==a.fired})}
  function t(c){var a=c.src;b.ajax({type:"GET",url:a,async:c.async,cache:c.cache,dataType:"script",error:function(c,e,f){b.rloader.track[a].status=-1;b.rloader.track[a].error="rloader ajax error: "+e+" - "+f;q(b.rloader.track[a].error);q("rloader error on resource: "+a)},statusCode:{404:function(){b.rloader.track[a].status=-2;b.rloader.track[a].error="rloader error: 404 - Resource NOT found: "+a;q(b.rloader.track[a].error)}},success:function(){b.rloader.track[a].status=1;s(a)}})}var j=[],k=[],m=[],
  h=null;c&&!c.propertyIsEnumerable("length")&&"object"===typeof c&&"number"===typeof c.length?j=c:j[0]=c;b.each(j,function(c,a){"boolean"===typeof a.defaultcache&&(b.rloader.track.defaultcache=a.defaultcache);"boolean"===typeof a.defaultasync&&(b.rloader.track.defaultasync=a.defaultasync);if("string"===typeof a.event){if("onready"===a.event||"beforeload"===a.event)if("string"===typeof a.func||"function"===typeof a.func){var d=null;a.arg&&(d=a.arg);null===d&&(a.arg={});a.fired=0;m.push(a)}}else if("string"===
  typeof a.src&&(a.type=a.src.split(".").pop().toLowerCase(),"js"===a.type||"css"===a.type)){d=null;if(a.callback&&("string"===typeof a.callback||"function"===typeof a.callback))d=a.callback;a.callback=d;d={};"undefined"!==typeof a.arg&&"object"===typeof a.arg&&(d=a.arg);a.arg=d;d=b.rloader.track.defaultasync;"undefined"!==typeof a.async&&("boolean"===typeof a.async&&(d=a.async),"number"===typeof a.async&&1===a.async&&(d=!0));a.async=d;d=b.rloader.track.defaultcache;"undefined"!==typeof a.cache&&("boolean"===
  typeof a.cache&&(d=a.cache),"number"===typeof a.cache&&1===a.cache&&(d=!0));a.cache=d;k.push(a)}});for(j=0;j<m.length;j++)if("beforeload"===m[j].event&&p(m[j].func,m[j].arg),"onready"===m[j].event){h=[];for(c=0;c<k.length;c++)h.push(k[c].src);m[j].rlist=h;h=m[j]}var e="",l="",g,f,j=!0;for(c=0;c<k.length;c++)if(e=k[c].src,l=k[c].type,b.rloader.track[e])if(1===b.rloader.track[e].status)f={},f.callback=k[c].callback,f.arg=k[c].arg,b.rloader.track[e]._cback.push(f),null!==h&&b.rloader.track[e]._evts.push(h),
  r(e);else if(0===b.rloader.track[e].status){g=!0;for(l=0;l<b.rloader.track[e]._cback.length;l++)if(b.rloader.track[e]._cback[l].callback===k[c].callback&&b.rloader.track[e]._cback[l].arg===k[c].arg){g=!1;break}g&&(f={},f.callback=k[c].callback,f.arg=k[c].arg,b.rloader.track[e]._cback.push(f));if(null!==h){f=!0;for(l=0;l<b.rloader.track[e]._evts.length;l++)if(g=b.rloader.track[e]._evts[l],null!==g&&g.event===h.event&&g.func===h.func&&g.arg===h.arg&&g.rlist===h.rlist&&0===g.fired){f=!1;break}f&&b.rloader.track[e]._evts.push(h)}}else j=
  !1;else j=!1,g={status:0,_cback:[],_evts:[]},f={},f.callback=k[c].callback,f.arg=k[c].arg,g._cback.push(f),null!==h&&g._evts.push(h),b.rloader.track[e]=g,"css"===l&&(e=k[c],g=e.src,e.cache||(g=g+"?"+(new Date).getTime()),f=document.createElement("link"),f.type="text/css",f.rel="stylesheet",f.href=g,f.media="screen",document.getElementsByTagName("head")[0].appendChild(f),b.rloader.track[e.src].status=1,s(e.src),all_loaded=!1),"js"===l&&(t(k[c]),all_loaded=!1);j&&null!==h&&p(h.func,h.arg)};b.rloader.track=
  {defaultcache:!0,defaultasync:!0}})(jQuery);
}

/**
 * Based on bPopup v0.9.4 created by (c)Bjoern Klinggaard (twitter@bklinggaard).
 * Orginal source: http://dinbror.dk/blog/bPopup/
 *
 */

(function($){
  'use strict';

  $.widget('nwc.dialog', {
    options: {
      amsl: 0,
      appending: true,
      appendTo: 'body',
      autoClose: false,
      closeClass: 'dialog-close',
      closeButton: true,
      contentType: 'default', // ajax, iframe, success, empty
      contentContainer: false,//'.content',
      contentOverflow: 'auto',
      easing: 'swing',
      escClose: true,
      follow: [true, true], // x, y
      followEasing: 'swing',
      followSpeed: 500,
      is_hiden:false,
      iframeAttr: 'scrolling="no" frameborder="0"',
      loadCallback: false,
      loadContent: false,
      loadData: false,
      loadTitleFrom: false,
      loadUrl: false,
      loadMethod: 'GET',
      maxContentHeight: false,
      media: null,
      mediaCache: true,
      modal: true,
      modalClose: true,
      modalColor: '#000',
      onClose: false,
      onOpen: false,
      opacity: 0.2,
      position: ['auto', 'auto'], // x, y,
      positionStyle: 'fixed', // absolute or fixed
      scrollBar: true,
      speed: 250, // open & close speed
      title: false,
      transition: 'faceIn', //transitions: fadeIn, slideDown, slideIn
      transitionClose: false,
      zIndex: 9997, // popup gets z-index 9999, modal overlay 9998
      theme: 'nwc-dialog theme-default',
      oldHtml: false,
      oldHtmlClass:{
        container: 'simple_overlay',
        title: 'overlay-title',
        content: 'overlay_content'
      },
      dialogClass: {
        container: 'container',
        title: 'title',
        content: 'content'
      },
      debug: false,
      ajaxStatusCode: {},
      //Callbacks
      onAjaxFail: function(event, data)
      {
        var _widget = data.widget;
        _widget.options.contentContainer.empty().html(_widget._createWindowHtml('Error', 'Please refresh and try again<br/><br/>If the problem persists please contact a member of our Team'));
      },
      onAjaxSuccess: function(event, data)
      {
        var _widget = data.widget;
        _widget._triggerEvent('beforeLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
        _widget._insertContent(data.html);
        _widget._loadMedia();
        _widget._triggerEvent('onLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
        _widget._triggerEvent('afterLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
        _widget._recenter();
      },
      onJsonSuccess: function(event, data)
      {
         var _widget = data.widget;
        _widget._triggerEvent('beforeLoad', undefined,  {json: data.json, status: data.status, jqXHR: data.jqXHR});
        _widget.options.contentContainer.empty().html(_widget._createWindowHtml('', ''));
        _widget._loadMedia();
        _widget._triggerEvent('onLoad', undefined,  {json: data.json, status: data.status, jqXHR: data.jqXHR});
        _widget._triggerEvent('afterLoad', undefined,  {json: data.json, status: data.status, jqXHR: data.jqXHR});
        _widget._recenter();
      }
    },
    _$window: $(window),
    _window: window,
    _$document: $(document),
    //Private widget options
    _options: {
      popups: 0,
      buffer: 200,
      contentPromise: null,
      spinner_hook_class: "spinner_hook"
    },
    close: function()
    {
      this._close();
    },
    getElement: function()
    {
      return this.element;
    },
    updateContent: function(html)
    {
      this._insertContent(html);
      this._loadMedia();
      this._recenter();
    },
    updateContentWithEvents: function(data)
    {
      var _widget = data.widget;
      _widget._triggerEvent('beforeLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
      _widget.updateContent(data.html);
      _widget._loadMedia();
      _widget._triggerEvent('onLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
      _widget._triggerEvent('afterLoad', undefined,  {html: data.html, status: data.status, jqXHR: data.jqXHR});
      _widget._recenter();
    },
    getOption: function(name)
    {
      return this.options[name] || null;
    },
    setOption: function(name, value)
    {
      value = value || null;
      return this.options[name] = value;
    },
    trigger: function(name, data)
    {
      this._triggerEvent(name, undefined, data || {});
    },
    addPreloader: function()
    {
      return this._addPreloader();
    },
    removePreloader: function()
    {
      return this._removePreloader();
    },
    updatePosition: function()
    {
      this._recenter();
    },
    _create: function()
    {
      this._triggerEvent('beforeOpen');
      this._initOptions();
      this._createOverlay();
      this._createContent();
      this._calculatePosition();
      this._createDialog();
      this._bindEvents();
      this._runTransition(true);
      this._triggerEvent('onOpen');
      this._recenter();
    },
    _initOptions: function()
    {
      this._options.wasInDOM = this.element.closest('body').size() ? true : false;

      this._options.popups = (this._$window.data(this._getWidgetName()) || 0) + 1, this._$window.data(this._getWidgetName(), this._options.popups);
      this._options.id = this._getPrefix() + this._options.popups + '__';
      this._options.fixedVPos = this.options.position[1] !== 'auto';
      this._options.fixedHPos = this.options.position[0] !== 'auto';
      this._options.fixedPosStyle = this.options.positionStyle === 'fixed';
      this._options.height = this.element.outerHeight(true);
      this._options.width = this.element.outerWidth(true);
      this._options.wH = this._$window.height() || this._window.innerHeight;
      this._options.wW = this._$window.width() || this._window.innerWidth;
      this._options.overlay = {};

      this.options.contentContainer = this.options.contentContainer ?
        this.element.find(this.options.contentContainer).first() : this.element;

      if(this.options.oldHtml)
      {
        this.options.dialogClass = this.options.oldHtmlClass;
      }
    },
    _createOverlay: function()
    {
      if(this.options.modal)
      {
         var $overlay = $('<div class="b-modal ' + this._options.id + '"></div>')
          .css({
            backgroundColor: this.options.modalColor,
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
            zIndex: this.options.zIndex + this._options.popups
          })
          .appendTo(this.options.appendTo)
          .fadeTo(this.options.speed, this.options.opacity);

        this._options.overlay[this._options.id] = $overlay;
      }
    },
    _createContent: function()
    {
      this.options.contentType = (this.options.loadUrl && this.options.contentType === 'default') ? 'ajax' : this.options.contentType;
      var methodName = '_create' + this.options.contentType.charAt(0).toUpperCase()
        + this.options.contentType.slice(1) + 'Content';

      if(!this.options.scrollBar)
      {
        $('html').css('overflow', 'hidden');
      }
      if(!this.element.hasClass(this.options.theme))
      {
        this.element.addClass(this.options.theme);
      }
      if($.isFunction(this[methodName]))
      {
        this[methodName].call(this);
      }

    },
    _calculatePosition: function()
    {
      var $cloned = null, $element = this.element;
      if(!this.element.is(':visible') && this.options.loadUrl)
      {
        var style = "position: absolute !important; top: 0px !important; display: block;";
        $cloned = this.element.clone();
        $cloned
          .attr('style', style)
          .appendTo('body');
        $element = $cloned;
      }
      this._options.vPos = this._options.fixedVPos ? this.options.position[1] : Math.max(0, ((this._options.wH - $element.outerHeight(true)) / 2) - this.options.amsl);
      this._options.hPos = this._options.fixedHPos ? this.options.position[0] : (this._options.wW - $element.outerWidth(true)) / 2;

      this._options.height = $element.outerHeight(true);
      this._options.width = $element.outerWidth(true);
      this._options.insideWindow = this._insideWindow();

      if($cloned) $cloned.remove();
    },
    _createDialog: function()
    {
      var _self = this;
      $('body').addClass('nwc-dialog-open');
      this.element
        .data(this._getWidgetName(), this.options)
        .data('id', this._options.id)
        .css({
          'left': this.options.transition == 'slideIn' || this.options.transition == 'slideBack' ? (this.options.transition == 'slideBack' ? this._$document.scrollLeft() + this._options.wW : (this._options.hPos + this._options.width) * -1) : this._getLeftPos(!(!this.options.follow[0] && this._options.fixedHPos || this._options.fixedPosStyle)),
          'position': this.options.positionStyle || 'absolute',
          'top': this.options.transition == 'slideDown' || this.options.transition == 'slideUp' ? (this.options.transition == 'slideUp' ? this._$document.scrollTop() + this._options.wH : this._options.vPos + this._options.height * -1) : this._getTopPos(!(!this.options.follow[1] && this._options.fixedVPos || this._options.fixedPosStyle)),
          'z-index': this.options.zIndex + this._options.popups + 1
        }).each(function() {
          if (_self.options.appending) {
              $(this).appendTo(_self.options.appendTo);
          }
        });
    },
    _bindEvents: function() {
      var _self = this;
      this.element.on('click.' + this._options.id, '.bClose, .' + this.options.closeClass, function(event){
        _self._close.call(_self, this, event);
        return false;
      });
      if (this.options.modalClose)
      {
        $('.b-modal.' + this._options.id)
          .css('cursor', 'pointer')
          .bind('click', function(event){
            _self._close.call(_self, this, event)
          });
      }
      if (this.options.escClose) {
        this._$document.bind('keydown.' + this._options.id, function(event) {
          if (event.which == 27) { //escape
            _self._close.call(_self, this, event);
          }
        });
      }
    },
    _runTransition: function (open, callback)
    {
      var _self = this;
      switch (open ? this.options.transition : this.options.transitionClose || this.options.transition)
      {
        case "slideIn":
            return animate({
                left: open ? this._getLeftPos(!(!this.options.follow[0] && this._options.fixedHPos || this._options.fixedPosStyle)) : this._$document.scrollLeft() - (this._options.width || this.element.outerWidth(true)) - this._options.buffer
            });
            break;
        case "slideBack":
            return animate({
                left: open ? this._getLeftPos(!(!this.options.follow[0] && this._options.fixedHPos || this._options.fixedPosStyle)) : this._$document.scrollLeft() + this._options.wW + this._options.buffer
            });
            break;
        case "slideDown":
            return animate({
                top: open ? this._getTopPos(!(!this.options.follow[1] && this._options.fixedVPos || this._options.fixedPosStyle)) : this._$document.scrollTop() - (this._options.height || this.element.outerHeight(true)) - this._options.buffer
            });
            break;
        case "slideUp":
            return animate({
                top: open ? this._getTopPos(!(!this.options.follow[1] && this._options.fixedVPos || this._options.fixedPosStyle)) : this._$document.scrollTop() + this._options.wH + this._options.buffer
            });
            break;
        default:
            //Hardtyping 1 and 0 to ensure opacity 1 and not 0.9999998
          this.element.stop().fadeTo(this.options.speed, open ? 1 : 0, $.isFunction(callback) ? callback : function(){});
      }

      function animate(css)
      {
        return _self.element
          .show()
          .css({
              display: 'block',
              opacity: 1
          })
          .animate(css, _self.options.speed, _self.options.easing);
      };
    },
    _close: function()
    {
      var _widget = this;
      var $modal = $(_widget.element);

      this._triggerEvent('onClose');

      // onClose trigger can prevent closing
      if ($modal.attr('_prevent_close')) {
        $modal.removeAttr('_prevent_close');
        return false;
      }

      this._runTransition(false, function(){
        if(!_widget.options.appending) {
          $(_widget.element).hide();
        }
        else {
          if(!_widget.options.is_hiden) {
            $(_widget.element).remove();
          }
          else {
            $(_widget.element).hide();
          }
        }
        _widget.element.find('.' + _widget._options.spinner_hook_class).remove();
      });

      this._destroy();
      this._triggerEvent('afterClose');
      return false; // Prevent default
    },
    _loadMedia: function()
    {
      if(this.options.media)
      {
        if(!this.options.mediaCache)
        {
          var length = this.options.media.length;

          $(this.options.media).each(function(){
            delete $.rloader.track[this.src];
          });
        }
        $.rloader({defaultcache: this.options.mediaCache});
        if($.isFunction(this.options.media))
        {
          $.rloader(this.options.media.call(this));
        }
        else if($.isArray(this.options.media))
        {

          $.rloader(this.options.media, {defaultcache:false});
        }
      }
    },
    _destroy: function()
    {
      $('body').removeClass('nwc-dialog-open');
      if (!this.options.scrollBar)
      {
        $('html').css('overflow', 'auto');
      }
      if(this.options.modal)
      {
        $('.b-modal.' + this.element.data('id'))
          .fadeTo(this.element.speed, 0, function() {
            $(this).remove();
          });
      }
      var $parent = this.element.parent();
      if ($parent.data('dialog-ios-height-resized')) {
        $parent.css('height', 'auto').data('dialog-ios-height-resized', false);
      }
      $('.b-modal.' + this._options.id).unbind('click');
      this._$document.unbind('keydown.' + this._options.id);
      this._$window.unbind('.' + this._options.id).data(this._getWidgetName(), (this._$window.data(this._getWidgetName()) - 1 > 0) ? this._$window.data(this._getWidgetName()) - 1 : null);
      this.element.undelegate('.bClose, .' + this.options.closeClass, 'click.' + this._options.id).data(this._getWidgetName(), null);
      this.element.off();
      delete this._options.overlay[this._options.id];
      $.Widget.prototype.destroy.call( this );
    },
    _recenter: function(callback)
    {
      var css = {};
      var $container = this.element.find('.container > .content').first();
      $container.css('height', 'auto');
      $container.css('overflow', 'auto');
      this._calculatePosition();
      if(!this._options.insideWindow)
      {
        var i = this.element.outerHeight(true);
        var j = this.element.children('.container').outerHeight(true);
        var k = this.element.find('.container > .content').first().outerHeight(true);
        var l = this.element.find('.container > .content').first().height();
        var m = this._options.wH - ((i - j) + (j - k) + (k - l));

        $container.css('height', m);
        $container.css('overflow', 'auto');
      }
      else
      {
        var $container = this.element
                .find('.container > .content')
                .first();
        $container.css('height', 'auto');
        this._calculatePosition();
      }
      if (navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('iPhone') != -1) {
        var ofparent = this.element.parent(),
          top = this.element.parent().scrollTop(),
          ofh = ofparent.height();
        if (ofh < this._options.height) {
          ofparent.css({
            'height': this._options.height + 10
          });
          top = 5;
          ofparent.data('dialog-ios-height-resized', true);
        }
        this.element.css({
          position: 'absolute',
          top: top
        });
        window.scrollTo(null, this.element.offset().top);
      } else {
        css.left = this._getLeftPos(!(!this.options.follow[0] && this._options.fixedHPos || this._options.fixedPosStyle)),
          css.top = this._getTopPos(!(!this.options.follow[1] && this._options.fixedVPos || this._options.fixedPosStyle));
        this.element.css(css);
        if($.isFunction(callback)){
          callback();
        }
      }
      this.element.trigger('dialog:resized');
    },
    //Content creators
    _createAjaxContent: function()
    {
      this.element.empty().html(this._createWindowHtml('Loading Please...'));
      var _self = this;

      _self._addPreloader();
      return $.ajax({
        url: this.options.loadUrl,
        type: this.options.loadMethod,
        data: this.options.loadData,
        dataType: 'html',
        statusCode: this.options.ajaxStatusCode
      })
      .always(function(){
        _self._removePreloader();
      })
      .fail(function(html, status, jqXHR){
        _self._triggerEvent('onAjaxFail', undefined,  {html: html, status: status, jqXHR: jqXHR});
      })
      .done(function(html, status, jqXHR){
          _self._triggerEvent('onAjaxSuccess', undefined, {html: html, status: status, jqXHR: jqXHR});
      });
    },
    _createJsonContent: function()
    {
      this.element.empty().html(this._createWindowHtml('Loading Please...'));
      this._addPreloader();
      var _self = this;
      return $.ajax({
        url: this.options.loadUrl,
        type: this.options.loadMethod,
        data: this.options.loadData,
        dataType: 'json',
        statusCode: this.options.ajaxStatusCode
      }).always(function(){
        _self._removePreloader();
      }).fail(function(json, status, jqXHR){
        _self._triggerEvent('onAjaxFail', undefined,  {json: json, status: status, jqXHR: jqXHR});
      })
      .done(function(json, status, jqXHR){
          _self._triggerEvent('onJsonSuccess', undefined, {json: json, status: status, jqXHR: jqXHR});
      });
    },
    _createIframeContent: function()
    {},
    _createEmptyContent: function()
    {
      var html = this._createWindowHtml();
      this.options.loadUrl = ' ';
      this._insertContent(html);
      this._recenter();
    },
    //Helpers
    _insertContent: function(html)
    {
      var oryginal_html = html;
      this._triggerEvent('beforeContentUpdate', undefined, {html: oryginal_html});
      if(this.options.loadContent)
      {
        //load only the specyfic part of html
        html = $(html).find(this.options.loadContent).first()[0].innerHTML;
      }
      var $html = $('<div>' + html + '</div>');
      //We will replace all modal window content
      if(this.options.contentContainer.is(this.element))
      {
        if(!$html.children('.container').length)
        {
          $html.addClass('container');
        }
        else
        {
          $html = $(html);
        }
        if(this.options.oldHtml)
        {
          $html.addClass('old-html');
        }
        if(!$html.children('.content').length)
        {
          $html.wrapInner('<div class="content" />');
        }
        if(!$html.children('.title').length)
        {
          $html.prepend('<div class="title" />');
        }
      }

      if(this.options.title)
      {
        var $title = $html.children('.'+ this.options.dialogClass.title).first();
        if($title.length)
        {
          $title.text(this.options.title);
        }
        else
        {
          $html.prepend('<div class="' + this.options.dialogClass.title + '">' + this.options.title + '</div>');
        }
      }
      if(this.options.loadTitleFrom)
      {
        if($.isFunction(this.options.loadTitleFrom))
        {
          $html.children('.title').html(this.options.loadTitleFrom.call(this.element, $html));
        }
        else
        {
          var $elem = $html.find(this.options.loadTitleFrom);
          $html.children('.title').text($elem.text() || $elem.val());
        }
      }

      if(this.options.maxContentHeight)
      {
        $html.find('.content:first').css({
          height: this.options.maxContentHeight,
          overflow: this.options.contentOverflow
        });
      }

      this.options.contentContainer.empty().html($html);

      if(this.options.contentContainer.is(this.element))
      {
        if(!$html.children('.'+ this.options.closeClass).length && this.options.closeButton)
        {
          this.element.append('<a class="dialog-close"></a>');
        }
      }
      this._triggerEvent('onContentUpdate', undefined, {html: oryginal_html, $html: $html});
    },
    _getWidgetName: function()
    {
      return this.namespace + '_' + this.widgetName;
    },
    _getPrefix: function()
    {
      return '__' + this._getWidgetName();
    },
    _insideWindow: function()
    {
      return this._options.wH >= this.element.outerHeight(true);
//      return this._options.wH >= this.element.outerHeight(true) && this._options.wW > this.element.outerWidth(true);
    },
    _getLeftPos: function(includeScroll)
    {
      return includeScroll ? this._options.hPos + this._$document.scrollLeft() : this._options.hPos;
    },
    _getTopPos: function(includeScroll)
    {
      return includeScroll ? this._options.vPos + this._$document.scrollTop() : this._options.vPos;
    },
    _triggerEvent: function(type, event, data)
    {
      var callback = this.options[type];
      
      if (callback && !$.isFunction(callback)) {
        this.options[type] = new Function(callback);
      }
      this.element.trigger(type);
      return this._trigger(type, event, $.extend({}, {'widget': this}, data));
    },
    _addPreloader: function()
    {
      var id = this._options.id + '_preloader';
      if (!$('#'+id).length) {
        this.options.contentContainer.find('.container > .content').first().append(
          $(document.createElement('div')).attr('id', this._options.id + '_preloader').addClass('preloader')
        );
      }
    },
    _removePreloader: function()
    {
      $(document.getElementById(this._options.id + '_preloader')).remove();
    },
    _createWindowHtml: function(title, content)
    {
      if(!title) title = '';
      if(!content) content = '';
      var html = "";
      html += '<div class="container">';
        html += '<div class="title">' + title + '</div>';
        html += '<div class="content">' + content + '</div>';
      html += '</div>';
      if(this.options.closeButton)
      {
        html += '<a class="' + this.options.closeClass + '"></a>';
      }
      return html;
    },
    log: function(msg) {
      if (this.options.debug)
      {
        if (window.console)
        {
          console.log(msg);
        }
        else
        {
          $("body").append("<div style=\"width:600px;color:#FFFFFF;background-color:#000000;\">" + msg + "</div>");
        }
        return true;
      }
    }
  });

  //Full screen extension
  var _super = new $.nwc.dialog();
  $.widget('nwc.dialog', $.nwc.dialog, {
    options: {
      full_screen: false
    },
    _calculatePosition: function()
    {
      if(this.options.full_screen)
      {
        this.element.css({
          width: this._options.wW-50,
          height: this._options.wH-50
        });
        //Temporary solution.
        //We need to calculate offset of the content terms of dialog height
        //this._options.wH-50-95) - from window height minus 50 px space from border and 95 is sum dialog top/bottom padding and the title height
        this.element.find('.container > .content').first().height(this._options.wH-50-95).css('overflow', 'auto');
      }
      _super._calculatePosition.call(this);
    }
  });

  $.widget('nwc.dialog', $.nwc.dialog, {
    options: {
      button: true,
      bold: true
    },
    _createMessageContent: function()
    {
      //Hack for recenter method, this need to be refactored
      this.options.loadUrl = ' ';
      if(this.options.bold)
      {
        this.options.content = '<p style="font-weight: normal;">' + this.options.content + '</p>';
      }
      if(this.options.button)
      {
        var _self = this,
          klass = '';
        _self.options.content += '<div class="save">';
        $.each(this.options.button, function(key, value){
          if (_self.options.button[key].constructor == Array) {
            klass = _self.options.button[key][1];
          } else {
            klass = 'dialog-button-' + key.replace(/[\s,\.\!]+/g, '_');
          }
          _self.options.content += '<button class="button '+klass+'" data-key="'+key+'" style="margin-left: 10px;">'+key+'</button>';
        });
        _self.options.content += '</div>';
        this.element.on('click', 'button.button', function(){
          var key = $(this).data('key');
          if (typeof key !== 'undefined' && _self.options.button[key]) {
            if (_self.options.button[key].constructor == Array) {
              _self.options.button[key][0].apply(this, [_self.element]);
            } else {
              _self.options.button[key].apply(this, [_self.element]);
            }
          }
        });
      }
      this.element.empty().html(this._createWindowHtml(this.options.title, this.options.content));
      this._recenter();
    }
  });

  $.widget('nwc.dialog', $.nwc.dialog, {
    _createIframeContent: function()
    {
      var _widget = this;
      var iframe = $('<iframe class="b-iframe" ' + this.options.iframeAttr +'></iframe>');
      iframe.attr('src', this.options.loadUrl); // setting iframe src after open due IE9 bug
      iframe.load(function(){
        _widget._triggerEvent('onLoad', undefined,  {iframe: this});
      });
      this.options.loadUrl = ' ';
      this.options.contentContainer.empty().append(iframe);
      this._recenter();
    }
  });
})(jQuery);


