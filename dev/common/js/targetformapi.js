if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
  
  $(document).ready(function() {
      var postponed = {};
      var postponed_timer = null;
  
      function fillPostponed () {
        postponed_timer = null;
        $.each(postponed, function (k,v) {
          delete postponed[k];
          fillTarget(v, k, true);
        });
      }
  
      function ro_cb (data, prefix) {
        readOnlyFields(true, $('[name^=' + prefix + 'field_]').not('.relidfield'));
      }
  
      window.resetForm = function (elm) {
        if (elm === undefined) {
          elm = $('form');
        } else if (!elm.is('form')) {
          elm = elm.parents('form');
        }
        elm.each(function () {
          delVolatileOption($(this));
          this.reset();
          $(this).find('.formfileinput a.link').attr('href', '#').html('');
          $(this).find('select.autocomplete').trigger('chosen:updated');
          $(this).trigger('postreset');
        });
      }
  
      function fillTarget (data, prefix, fromlocalstorage) {
          if (prefix === undefined) {
            prefix = '';
          } else if (prefix === null) {
            prefix = $('[targetgroupid='+data['type']+']').attr('targettype') + '_';
          }
          $.each(data, function (k,v) {
            var fpos = k.search('field_');
            if (fpos > -1) {
              if (fpos > 0) {
                // related data, postpone
                var pfx = k.substr(0,fpos);
                if (postponed[pfx] === undefined) {
                  postponed[pfx] = {};
                }
                postponed[pfx][k.substr(fpos)] = v;
                return;
              }
              if (k.search(':') != -1) {
                return;
              }
              var e = $('#id_' + prefix + k);
              if (e.length > 0) {
                if (fromlocalstorage) {
                  // when loading from cache, the flat stored data takes prevalence
                  // over rpc loaded data, which is opposite to the normal fillTarget
                  // behaviour.
                  e.addClass('filltarget-locked');
                } else if (e.is('.filltarget-locked')) {
                  return;
                }
                if (e.is('select')) {
                  $('option',e).each(function() { this.selected = (this.text == v); })
                  e.change();
                } else {
                  if (e.attr('fieldmerge') == null || Boolean(v)) {
                    if (e.is('[type=file]') && !fromlocalstorage) {
                      var ffi = e.parents('.formfileinput').eq(0);
                      var pdf_preview = '';
                      if (v !== null && v.split('.').pop() == 'pdf') {
                        pdf_preview = '-full-pdf';
                      }
                      var href = __baseurl + '/system/file-store/upload/preview' + pdf_preview + '/';
                      var text = '';
                      var del = '';
                      if (Boolean(v)) {
                        href += parseInt(v.split('filestore')[1].split('.')[0].replace(/\//g, ''));
                        text = ' (link)';
                        del = '<span class="delete"><input type="checkbox"><label>delete</label></span>';
                      }
                      ffi.find('.delete').remove();
                      ffi.find('.link').attr('href', href).html(text).after(del);
                    } else if (Boolean(v) && e.attr('dateformat') != null) {
                      var d = new Date(v);
                      e.val(d.toString(e.attr('dateformat')));
                    } else if (e.is('[type=checkbox]')) {
                      e.prop('checked', v).change();
                    } else {
                      e.val(v);
                      if (fromlocalstorage) {
                        if (e.is('.autocomplete-ajax')) {
                          e.data('autocomplete-selected', data[k + ':value-id']);
                        }
                        e.change();
                      }
                    }
                  } else {
                    e.val(e.attr('fieldmerge'));
                  }
                }
              }
            }
          });
          if ($.isEmptyObject(postponed)) {
            $('.filltarget-locked').removeClass('filltarget-locked');
          } else if (postponed_timer == null) {
            fillPostponed();
          }
          return prefix;
      }
  
      function getTarget (tid, prefix, cb) {
          var url = '/api/v1/targets/' + tid + '/';
          url += '?format=json&api_key=' + __apik;
          if (postponed_timer == null) {
            postponed_timer = -1;
          } else {
            postponed_timer--;
          }
          var xhr = $.ajax(url, {
            error: function (xhr, stat, desc) {
              alert('Error: ' + stat + ' - ' + desc);
              postponed_timer++;
              if (postponed_timer == 0) {
                fillPostponed();
              }
            },
            success: function (data, stat, xhr) {
              prefix = fillTarget(data, prefix);
              cb && cb(data, prefix);
              postponed_timer++;
              if (postponed_timer == 0) {
                fillPostponed();
              }
            }
          });
      }
  
      function fillRelatedTarget (data, prefix) {
        if (data.targets_selected != undefined) {
          $('.relidfield').data('autocomplete-selected', null).val('').trigger('postchange');
          for (var i=0; i<data.targets_selected.length; i++) {
            getTarget(data.targets_selected[i], null, ro_cb);
          }
        }
      }
  
      function readOnlyFields (rostate, objects) {
        objects.each(function () {
          if (rostate) {
            $(this).filter(':visible').attr('disabled', 'disabled');
          } else {
            $(this).filter(':visible').each(function () {
              var self = $(this);
              if (self.is(':disabled')) {
                $(this).removeAttr('disabled').val('');
              }
            });
          }
        });
      }

      var ajaxChosen = function(chosen) {
        // function that extend chosen instance to make ajax search requests
        var self = this,
          $this = $(chosen.form_field);
        // used to prevent race conditions with remote data sources
        chosen._requestIndex = 0;
        // override chosen method to detect when new ajax search is required
        chosen.winnow_results_org = chosen.winnow_results;
        chosen.winnow_results = function() {
          if (chosen._searchCache === undefined) {
            chosen._searchCache = [];
          }
          // check if search text have been requested already
          searchText = this.get_search_text();
          if ($.inArray(searchText, chosen._searchCache) == -1) {
            // new text to search
            chosen._searchCache.push(searchText);
  
            var endpoint = $this.data('endpoint'),
              param_name = $this.data('param'),
              params = $this.data('filters') || {};


            params['api_key'] = __apik;
            params['limit'] = 10;
            params[param_name] = searchText;

            if ($this.xhr) {
              $this.xhr.abort();
            }
            $this.xhr = $.ajax({
              method: 'GET',
              url: endpoint,
              dataType: 'json',
              autocompleteRequest: ++chosen._requestIndex,
              data: params
            }).done(function (resp_data) {
              if (this.autocompleteRequest === chosen._requestIndex) {
                // add new items to chosen results
                $.map(resp_data.objects, function(item) {
                  if (!$this.find('option[value=' + item.id + ']').length) {
                    $this.append($('<option>').val(item.id).text(item.label));
                  }
                });
                chosen.results_build();
                chosen.search_field.val(searchText);
                return chosen.winnow_results_org()
              }
            });
          }
  
          return chosen.winnow_results_org()
  
        }
      }
  
      $('select.idfield').on('change', function (e) {
          $(e.target).siblings('input').attr('newval', null);
          if (e.target.value && (e.target.value != "-1")) {
            getTarget(e.target.value, '', fillRelatedTarget);
          } else {
            resetForm($(e.target));
            $('option[value=""]', $('select.relidfield')).prop('selected', 'selected').change();
            $('select.relidfield').chosen().trigger('chosen:updated');
          }
      });
  
      $('input.relidfield').on('postchange', function (e) {
        e = $(e.target);
        var prefix = e.attr('targettype') + '_';
        var selected = e.data('autocomplete-selected');
        if (!selected) {
          selected = e.data('response_cache')[e.val()];
        }
        if (selected) {
          // auto complete selection
          getTarget(selected, prefix, ro_cb);
          e.data('autocomplete-selected',  null).data('value-id', selected);
        } else {
          // manual selection
          var objs = $('[name^=' + prefix + 'field_]').not(e);
          readOnlyFields(false, objs);
          objs.val('');
          e.removeData('value-id');
        }
      });
  
      function delVolatileOption (selectElement) {
        if (selectElement.is('form')) {
          selectElement = selectElement.find('select.autocomplete');
        }
        $('option[value=-1]', selectElement).remove();
      }
  
      window.setVolatileOption = function(selectElement, optionText) {
        delVolatileOption(selectElement);
        var old = $('option:nth-child('+(selectElement.prop('selectedIndex')+1)+')', selectElement);
        old.prop('selected', false);
        $('<option value="-1" selected="selected">')
          .appendTo(selectElement)
          .text(optionText)
          .trigger('chosen:updated');
        var ttype = selectElement.attr('targettype');
        if (ttype) {
          var objs = $('[name^=' + ttype + '_field_]').not(selectElement.siblings());
          readOnlyFields(false, objs)
        } else if (Boolean(old.val())) {
          resetForm(selectElement);
          $('option[value=""]', $('select.relidfield')).prop('selected', 'selected').change();
          $('select.relidfield').chosen().trigger('chosen:updated');
        }
      }
  
      function pickleForm () {
        var d = {}
        $.each($("form#target_form").serializeArray(), function (i,o) {
          var name = o['name'];
          if (d[name] === undefined) {
            if (o['value'] !== '') {
              d[name] = o['value'];
            }
          } else if (typeof(d[name]) == 'object') {
            d[name].push(o['value']);
          } else {
            d[name] = [d[name], o['value']];
          }
          var e = $('[name='+name+']');
          var did = e.data('value-id');
          if (did !== undefined) {
            d[name+':value-id'] = did;
          }
        });
        // We need to do a little special processing for checkboxes, so it is consistent
        // with the json rpc api results (true or false, not empty or non existant)
        $("form#target_form [type=checkbox]").not(':hidden').each(function () {
          d[$(this).attr('name')] = $(this).is(':checked');
        });
        return d;
      }
  
      function unpickleForm (data) {
        resetForm($("form#target_form"));
        $('[type=file]').each(function () {
            $(this).parents('.formfileinput').find('.link').attr('href', '#').html('');
        });
        fillTarget(data, '', true);
      }
  
      function buildFormKey (key) {
        if (!key) {
          key = $('#target_form_submit').data('localcachekey');
        }
        if (!key) {
          key = new Date().toLocaleString();
        }
        return key;
      }
  
      var localcache_key = 'dynform-localcache-'+__apik+'-'+__useremail;
  
      window.loadCache = function (key) {
        var cache = localStorage.getItem(localcache_key);
        if (cache === null) {
          cache = {};
        } else {
          cache = JSON.parse(cache);
        }
        if (key !== undefined) {
          return cache[key];
        }
        return cache;
      }
  
      function saveCache (cache) {
        localStorage.setItem(localcache_key, JSON.stringify(cache));
      }
  
      window.saveForm = function () {
        var dialog = $('<div class="nwc-dialog" id="localsavedialog">').appendTo('body');
        dialog.append(
          '<div class="container">'+
          '  <div class="title">Save Form Locally</div>'+
          '  <div class="content">'+
          '    <input type="text" name="fcachename">'+
          '    <div class="save"><button id="lsd-save">Save</button></div>'+
          '  </div>'+
          '</div>' +
          '<a class="dialog-close">'
        );
        dialog.on('onOpen', function () {
          $('#localsavedialog [name=fcachename]').val(buildFormKey());
        });
        $('#lsd-save').click(function () {
          var cache = loadCache();
          var key = $('#localsavedialog [name=fcachename]').val();
          $('#target_form_submit').data('localcachekey', key);
          cache[buildFormKey(key)] = pickleForm();
          saveCache(cache);
          dialog.dialog('close');
        });
        dialog.dialog();
      }
  
      window.loadForm = function () {
        var dialog = $('<div class="nwc-dialog" id="localsavedialog">').appendTo('body');
        dialog.append(
          '<div class="container">'+
          '  <div class="title">Load Locally Saved Form</div>'+
          '  <div class="content">'+
          '    <select name="fcachename" multiple="true" style="width: 100%"></select>'+
          '    <div class="save">'+
          '     <button id="lsd-load" disabled="disabled">Load</button>'+
          '     <button id="lsd-del" disabled="disabled">Remove</button>'+
          '     <button id="lsd-loaddel" disabled="disabled">Load & Remove</button>'+
          '   </div>'+
          '  </div>'+
          '</div>' +
          '<a class="dialog-close">'
        );
        var select = $('#localsavedialog [name=fcachename]');
        select.change(function () {
          var v = $(this).val();
          var l = v !== null ? v.length : 0;
          $('#lsd-del').prop('disabled', l==0);
          $('#lsd-load').prop('disabled', l!=1 || !Boolean(v[0]));
          $('#lsd-loaddel').prop('disabled', l!=1 || !Boolean(v[0]));
        });
        Object.keys(loadCache()).forEach(function (k) {
          select.append('<option>'+k);
        });
        function load () {
          var key = select.find('option:selected').eq(0).text();
          $('#target_form_submit').data('localcachekey', key);
          var rv = loadCache(buildFormKey(key));
          if (rv !== undefined) {
            unpickleForm(rv);
          }
        }
        function del () {
          select.find(':selected').each(function () {
            var cache = loadCache();
            delete cache[$(this).text()];
            $(this).remove();
            saveCache(cache);
          });
        }
        $('#lsd-del').click(function () {
          del();
        });
        $('#lsd-loaddel').click(function () {
          load();
          del();
          dialog.dialog('close');
        });
        function loadExec () {
          load();
          dialog.dialog('close');
        }
        $('#lsd-load').click(function () {
          loadExec();
        });
        select
          .dblclick(function () {
            loadExec();
          })
          .keypress(function (e) {
            if (e.which == 13) {
              loadExec();
            }
          });
        dialog.dialog();
      }
  
      function localSaveHook () {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
        } catch(e) {
          // localStorage not available
          return;
        }
        var submit = $('#target_form_submit');
        $('<button type="button">Load</button>')
          .click(loadForm)
          .insertAfter(submit);
        $('<button type="button">Save</button>')
          .click(saveForm)
          .insertAfter(submit);
      }
  
      $('.autocomplete-ajax').each(function () {
        var self = this,
          $this = $(this),
          targetgroup = $this.attr('targetgroupid'),
          endpoint = $this.data('endpoint'),
          param_name = $this.data('param'),
          select_timer = null,
          params = {
            api_key: __apik,
            targetgroup: targetgroup,
            limit: 10
          };
        // used to prevent race conditions with remote data sources
        var requestIndex = 0;
        $this.autocomplete({
          minLength: 1,
          focus: function (event, ui) {
            // prevend key up/down from showing entry id in text input
            return false;
          },
          select: function (event, ui) {
            clearTimeout(select_timer);
            select_timer = null;
            $this.data('autocomplete-selected', ui.item.value);
            $this.val(ui.item.label);
            $this.trigger('postchange');
            return false;
          },
          source: function (request, resp_cb) {
            if (self.xhr) {
              self.xhr.abort();
            }
            $this.data('autocomplete-selected', null);
            $this.trigger('postchange');
  
            params[param_name] = request.term;
            $this.addClass('autocomplete-ajax-processing');
            self.xhr = $.ajax({
              method: 'GET',
              url: endpoint,
              dataType: 'json',
              autocompleteRequest: ++requestIndex,
              data: params
            }).done(function (resp_data) {
              if (this.autocompleteRequest === requestIndex) {
                var results = [];
                var response_cache = {};
                for (var i=0; i<resp_data.objects.length;i++) {
                  results.push({
                    label: resp_data.objects[i]['label'],
                    value: resp_data.objects[i]['id']
                  });
                  response_cache[resp_data.objects[i]['label']] = resp_data.objects[i]['id']
                }
                $this.data('response_cache', response_cache);
                resp_cb(results);
              }
            }).always(function () {
              $this.removeClass('autocomplete-ajax-processing');
            });
          }
        });
        $this.data('response_cache', {});
        $this.change(function (e) {
          var $this = $(this);
          select_timer = setTimeout(function () {
              $this.trigger('postchange');
          }, 500);
        });
        if ($this.attr('default')) {
          $this.data('autocomplete-selected', $this.attr('default')).trigger('postchange');
        }
      });
  
      // Prepare the autocomplete fields
      $('select.autocomplete').each(function () {
          var self = $(this);
          var eid = self.attr('id');
          var en = self.attr('name');
          self.attr('id', '_acl_' + eid);
          self.attr('name', '');
          var proxy = $('<input type="text" style="display: none">');
          proxy.attr('id', eid).attr('name', en);
          self.before(proxy);
          proxy.on('change', function (e) {
            var s = $(e.target).siblings('select');
            $(e.target).siblings('input').attr('newval', null);
            var v = e.target.value;
            $('option', s).each(function() { this.selected = (this.text == v); });
            if (s.prop('selectedIndex') == 0) {
              setVolatileOption(s, v);
            } else {
              s.change().trigger('chosen:updated');
            }
          });
          if (self.val() == "") {
            if (self.attr('default')) {
              self.val(self.attr('default'));
              proxy.val(self.find('option:nth-child('+(self.prop('selectedIndex')+1)+')').text());
            } else if (self.attr('defaultverb')) {
              proxy.val(self.attr('defaultverb'));
              setVolatileOption(self, self.attr('defaultverb'));
            }
          }
          self.on('chosen:ready', function(e, chs) {
            if (self.hasClass('chosen-ajax')) {
              ajaxChosen(chs.chosen);
              // load initial data
              chs.chosen.winnow_results();
            }
          }).chosen({
            max_shown_results: 100,
            width: "20em" // search will shrink to first element on select if not specified
          });
  
          if (self.is('.relidfield') && (self.val() != '') && (self.val() != '-1')) {
            self.trigger('change');
          }
          if (self.is('.cancreate')) {
            self.on('chosen:no_results', function (e) {
              var basediv = $(e.target).parent();
              var search_val = $('.chosen-search input', basediv).val();
              basediv.children('input').val(search_val);
            })
            .on('chosen:hiding_dropdown', function (e) {
              var basediv = $(e.target).parent();
              var inp = $(basediv.children('input'));
              inp.attr('newval', inp.val());
              function f (i) {
                return function () {
                  var newval = i.attr('newval');
                  var elms = i.siblings('select');
                  if (newval != null && newval != $('option:nth-child('+(elms.prop('selectedIndex')+1)+')', elms).text()) {
                    i.attr('newval', null);
                    setVolatileOption(elms, newval);
                  }
                }
              }
              setTimeout(f(inp), 100);
            });
          }
      });
  
      // Prepare the input masks
      $("[inputmask]").each(function () {$(this).mask($(this).attr('inputmask'))});
  
      // Log out
      $('#target_form_logout').click(function () {
        window.location.replace('?logout=1');
      });
  
      // Handle empty file inputs to prevent removing data by default (see #11286)
      $('form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        // Replace checked checkboxes with hidden inputs with value "true" (see #11391)
        $(this).find('[type=checkbox]:checked').each(function () {
          form.append('<input type="hidden" origcb="'+$(this).attr('id')+'" value="true" name="'+$(this).attr('name')+'">');
          $(this).attr('name','');
        })
        $(this).find('[type=file][value=]').each(function () {
          var deltoggle = $(this).parents('.formfileinput').find('.delete [type=checkbox]');
          if (deltoggle.length == 0 || deltoggle.is(':not(:checked)')) {
            $(this).prop('disabled', true);
          }
        });
        if ($('#target_form_submit').data('localcachekey')) {
          var cache = loadCache();
          delete cache[$('#target_form_submit').data('localcachekey')];
          saveCache(cache);
        }
        this.submit();
        // Not really needed, but for good measure revert changes made to the form
        $(this).find('[type=file]').prop('disabled', false);
        $(this).find('[type=hidden]').each(function () {
          var origid = $(this).attr('origcb');
          if (origid) {
            $('#'+origid).attr('name', $(this).attr('name'));
            $(this).remove();
          }
        })
        return false;
      });
  
      localSaveHook();
  });