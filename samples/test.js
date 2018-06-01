/*! jquery.livequery - v1.3.6 - 2016-12-09
 * Copyright (c)
 *  (c) 2010, Brandon Aaron (http://abrandonaaron.net)
 *  (c) 2012 - 2016, Alexander Zaytsev (https://alexzaytsev.me)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(a,b,c,d){return!(a.selector!=b.selector||a.context!=b.context||c&&c.$lqguid!=b.fn.$lqguid||d&&d.$lqguid!=b.fn2.$lqguid)}a.extend(a.fn,{livequery:function(b,e){var f,g=this;return a.each(d.queries,function(a,d){if(c(g,d,b,e))return(f=d)&&!1}),f=f||new d(g.selector,g.context,b,e),f.stopped=!1,f.run(),g},expire:function(b,e){var f=this;return a.each(d.queries,function(a,g){c(f,g,b,e)&&!f.stopped&&d.stop(g.id)}),f}});var d=a.livequery=function(b,c,e,f){var g=this;return g.selector=b,g.context=c,g.fn=e,g.fn2=f,g.elements=a([]),g.stopped=!1,g.id=d.queries.push(g)-1,e.$lqguid=e.$lqguid||d.guid++,f&&(f.$lqguid=f.$lqguid||d.guid++),g};d.prototype={stop:function(){var b=this;b.stopped||(b.fn2&&b.elements.each(b.fn2),b.elements=a([]),b.stopped=!0)},run:function(){var b=this;if(!b.stopped){var c=b.elements,d=a(b.selector,b.context),e=d.not(c),f=c.not(d);b.elements=d,e.each(b.fn),b.fn2&&f.each(b.fn2)}}},a.extend(d,{guid:0,queries:[],queue:[],running:!1,timeout:null,registered:[],checkQueue:function(){if(d.running&&d.queue.length)for(var a=d.queue.length;a--;)d.queries[d.queue.shift()].run()},pause:function(){d.running=!1},play:function(){d.running=!0,d.run()},registerPlugin:function(){a.each(arguments,function(b,c){if(a.fn[c]&&!(a.inArray(c,d.registered)>0)){var e=a.fn[c];a.fn[c]=function(){var a=e.apply(this,arguments);return d.run(),a},d.registered.push(c)}})},run:function(c){c!==b?a.inArray(c,d.queue)<0&&d.queue.push(c):a.each(d.queries,function(b){a.inArray(b,d.queue)<0&&d.queue.push(b)}),d.timeout&&clearTimeout(d.timeout),d.timeout=setTimeout(d.checkQueue,20)},stop:function(c){c!==b?d.queries[c].stop():a.each(d.queries,d.prototype.stop)}}),d.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html","prop","removeProp"),a(function(){d.play()})});

/**
    * jQuery Validation Plugin 1.9.0
    *
    * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    * http://docs.jquery.com/Plugins/Validation
    *
    * Copyright (c) 2006 - 2011 JÃ¶rn Zaefferer
    *
    * Dual licensed under the MIT and GPL licenses:
    *   http://www.opensource.org/licenses/mit-license.php
    *   http://www.gnu.org/licenses/gpl.html
    */
    (function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;this.attr("novalidate","novalidate");b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){a=this.find("input, button");a.filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&a.filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
    b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
    else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
    return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
    b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
    validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
    onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
    a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
    minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator"),g="on"+e.type.replace(/^validate/,
    "");f.settings[g]&&f.settings[g].call(f,this[0],e)}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=
    this.settings.rules;c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",a).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",
    a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=
    a=this.validationTargetFor(this.clean(a));this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?
    this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==
    0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
    a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},
    prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.validationTargetFor(this.clean(a));var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+
    a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,
    b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"<\/strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=
    d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);
    if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
    d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=
    this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];return a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,
    e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,
    c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=
    false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,
    a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e;if(e=d==="required"&&typeof c.fn.prop==="function"?a.prop(d):a.attr(d))b[d]=e;else if(a[0].getAttribute("type")===d)b[d]=true}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};
    var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?
    e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;
    return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,
    b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,
    mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,
    b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
    url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
    date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 -]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
    0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
    (function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
    (function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
    b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);


    /**
    * jquery-simple-wizard - A jQuery plugin for creating a simple wizard.
    * @version v0.1.0
    * @link https://github.com/dnasir/jquery-simple-wizard
    * @license MIT
    */
    !function(t){"use strict";function i(i,s){this.$el=t(i),this.$steps=this.$el.find(".wizard-step"),this.$indicators=this.$el.find(".wizard-step-indicator"),this.opts=t.extend({cssClassStepDone:"wizard-done",cssClassStepActive:"wizard-current",onInit:function(){},onChange:function(){},onFinish:function(){}},s),this.onChangeTimeout=null,this.validation={formToValidate:void 0!==t.validator?this.$el.closest("form"):void 0,isUnobtrusive:void 0!==t.validator.unobtrusive},this.init()}var s="simpleWizard";i.prototype={init:function(){var i=this;i.$el.on("click",".wizard-next",function(t){t.preventDefault(),i.nextStep()}),i.$el.on("click",".wizard-prev",function(t){t.preventDefault(),i.prevStep()}),i.$el.on("click",".wizard-goto",function(s){s.preventDefault();var e=t(this).val();i.gotoStep(e)}),i.$el.on("click",".wizard-finish",function(t){t.preventDefault(),i.finish()}),i.$el.on("wizard_onInit",function(t){"function"==typeof i.opts.onInit&&i.opts.onInit(t)}),i.$el.on("wizard_onChange",function(t){if("function"==typeof i.opts.onChange){var s=i.getCurrentStep();i.opts.onChange(t,i.$steps.eq(s))}}),i.$el.on("wizard_onFinish",function(t){"function"==typeof i.opts.onFinish&&i.opts.onFinish(t)}),i.$el.on("click","a",function(s){var e=t(s.target.hash),n=i.$steps.filter(e);n.length&&(s.preventDefault(),i.gotoStep(n.index()))}),this.$steps.first().addClass(this.opts.cssClassStepActive),this.$indicators.first().addClass(this.opts.cssClassStepActive),this.validation.formToValidate&&this.validation.formToValidate.validate({ignore:".wizard-ignore"}),this.validation.formToValidate&&this.validation.isUnobtrusive&&(t.data(this.validation.formToValidate[0],"validator").settings.ignore+=",.wizard-ignore"),this.$el.triggerHandler("wizard_onInit")},onChangeEventHandler:function(){var t=this;clearTimeout(t.onChangeTimeout),t.onChangeTimeout=setTimeout(function(){t.$indicators.length&&t.updateIndicators(),t.$el.triggerHandler("wizard_onChange")},100)},getCurrentStep:function(){return this.$steps.filter("."+this.opts.cssClassStepActive).index()},nextStep:function(){var t=this.getCurrentStep();this.isValid(t)&&(t>=this.$steps.length||(this.$steps.filter("."+this.opts.cssClassStepActive).addClass(this.opts.cssClassStepDone).removeClass(this.opts.cssClassStepActive).next().addClass(this.opts.cssClassStepActive),this.onChangeEventHandler()))},prevStep:function(){var t=this.getCurrentStep();0>=t||(this.$steps.filter("."+this.opts.cssClassStepActive).removeClass(this.opts.cssClassStepActive).prev().addClass(this.opts.cssClassStepActive),this.onChangeEventHandler())},gotoStep:function(t){if(!(0>t||t>this.$steps.length)){var i=this.getCurrentStep();if(t>i)for(;t>i&&(this.nextStep(),this.isValid(i));)i=this.getCurrentStep();else if(i>t)for(;i>t;)this.prevStep(),i=this.getCurrentStep()}},finish:function(){this.$el.triggerHandler("wizard_onFinish")},updateIndicators:function(){var t=this.getCurrentStep();this.$indicators.filter(function(i){return t>i}).addClass(this.opts.cssClassStepDone),this.$indicators.removeClass(this.opts.cssClassStepActive).eq(t).addClass(this.opts.cssClassStepActive)},isValid:function(t){if(void 0===this.validation.formToValidate)return!0;this.$steps.not(":eq("+t+")").find("input, textarea, select").addClass("wizard-ignore");var i=this.validation.formToValidate.valid();return this.$steps.find("input, textarea, select").removeClass("wizard-ignore"),i}},t.fn[s]=function(e){var n=Array.prototype.slice.call(arguments,1);return this.each(function(){if(t.data(this,"plugin_"+s)){if("string"==typeof e&&i.prototype.hasOwnProperty(e)){var a=t.data(this,"plugin_"+s);i.prototype[e].apply(a,n)}}else t.data(this,"plugin_"+s,new i(this,e))})}}(jQuery);
    //# sourceMappingURL=jquery.simplewizard.min.js.map


!function(e){function t(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){
    /*!
     * dependsOn v1.5.1
     * a jQuery plugin to facilitate the handling of form field dependencies.
     *
     * Copyright 2016 David Street
     * Licensed under the MIT license.
     */
var s=i(1);$.fn.dependsOn=function(e,t){var i=$.extend({},{disable:!0,hide:!0,duration:200,trigger:"change"},t);i.trigger+=i.trigger.search(".dependsOn")>-1?"":".dependsOn";var n=new s(this,e,i);return n}},function(e,t,i){var s=i(2),n=i(4),r=function(e,t,i){this.$subject=e,this.collection=new s,this.options=$.extend({},{onEnable:function(){},onDisable:function(){},trigger:"change",disabled:!1},i),this.collection.addSet(new n(t,this.options.trigger)),this.$valueTarget=this._getValueTarget(),this.isInitialState=!0,this.collection.qualified?this._enable():this._disable(),this.isInitialState=!1,this.collection.on("change",this._changeHandler.bind(this))};r.prototype._changeHandler=function(e){e.qualified?this._enable(e.triggerBy.$ele,e.e):this._disable(e.triggerBy.$ele,e.e)},r.prototype._getValueTarget=function(){var e=this.$subject;return this.options.hasOwnProperty("valueTarget")&&void 0!==typeof this.options.valueTarget?e=$(this.options.valueTarget):"input"!==this.$subject[0].nodeName.toLowerCase()&&"textarea"!==this.$subject[0].nodeName.toLowerCase()&&"select"!==this.$subject[0].nodeName.toLowerCase()&&(e=this.$subject.find("input, textarea, select")),e},r.prototype.or=function(e){return this.collection.addSet(new n(e,this.options.trigger)),this.collection.qualified?this._enable():this._disable(),this},r.prototype.check=function(){this.collection.runCheck()},r.prototype._enable=function(e,t){this.options.disable&&this.$subject.attr("disabled",!1),this.options.disabled&&this.$subject.attr("disabled",!1),this.options.hide&&this._toggleDisplay(!0,this.isInitialState),this.options.hasOwnProperty("valueOnEnable")&&void 0!==typeof this.options.valueOnEnable&&this.$valueTarget.val(this.options.valueOnEnable).change(),this.options.hasOwnProperty("checkOnEnable")&&this.$valueTarget.prop("checked",this.options.checkOnEnable).change(),this.options.hasOwnProperty("toggleClass")&&void 0!==typeof this.options.toggleClass&&this.$subject.addClass(this.options.toggleClass),this.options.onEnable.call(e,t,this.$subject)},r.prototype._disable=function(e,t){this.options.disable&&this.$subject.attr("disabled",!0),this.options.disabled&&this.$subject.attr("disabled",!0),this.options.hide&&this._toggleDisplay(!1,this.isInitialState),this.options.hasOwnProperty("valueOnDisable")&&void 0!==typeof this.options.valueOnDisable&&this.$valueTarget.val(this.options.valueOnDisable).change(),this.options.hasOwnProperty("checkOnDisable")&&this.$valueTarget.prop("checked",this.options.checkOnDisable).change(),this.options.hasOwnProperty("toggleClass")&&void 0!==typeof this.options.toggleClass&&this.$subject.removeClass(this.options.toggleClass),this.options.onDisable.call(e,t,this.$subject)},r.prototype._toggleDisplay=function(e,t){var i,s=this.$subject.attr("id");i="label"===this.$subject.parent()[0].nodeName.toLowerCase()?this.$subject.parent():this.$subject.add('label[for="'+s+'"]'),e?t?i.show():i.fadeIn(this.options.duration):e||(t?i.hide():i.fadeOut(this.options.duration))},e.exports=r},function(e,t,i){var s=i(3).EventEmitter,n=function(){this.sets=[],this._qualSum=0,this.qualified=null};e.exports=n,n.prototype=$.extend({},s.prototype),n.prototype.addSet=function(e){this.sets.push(e),this._qualSum+=e.qualified?1:0,this.qualified=this._qualSum>0,e.on("change",this._setChangeHandler.bind(this))},n.prototype.runCheck=function(){for(var e=0,t=this.sets.length;e<t;e++)this.sets[e].runCheck()},n.prototype._setChangeHandler=function(e){var t=this.qualified;this._qualSum+=e.qualified?1:0===this._qualSum?0:-1,this.qualified=this._qualSum>0,this.qualified!==t&&this.emit("change",{triggerBy:e.triggerBy,e:e.e,qualified:this.qualified})}},function(e,t){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(e){return"function"==typeof e}function n(e){return"number"==typeof e}function r(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!n(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,i,n,a,h,l;if(this._events||(this._events={}),"error"===e&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var u=new Error('Uncaught, unspecified "error" event. ('+t+")");throw u.context=t,u}if(i=this._events[e],o(i))return!1;if(s(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(r(i))for(a=Array.prototype.slice.call(arguments,1),l=i.slice(),n=l.length,h=0;h<n;h++)l[h].apply(this,a);return!0},i.prototype.addListener=function(e,t){var n;if(!s(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,s(t.listener)?t.listener:t),this._events[e]?r(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,r(this._events[e])&&!this._events[e].warned&&(n=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function i(){this.removeListener(e,i),n||(n=!0,t.apply(this,arguments))}if(!s(t))throw TypeError("listener must be a function");var n=!1;return i.listener=t,this.on(e,i),this},i.prototype.removeListener=function(e,t){var i,n,o,a;if(!s(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(i=this._events[e],o=i.length,n=-1,i===t||s(i.listener)&&i.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(r(i)){for(a=o;a-- >0;)if(i[a]===t||i[a].listener&&i[a].listener===t){n=a;break}if(n<0)return this;1===i.length?(i.length=0,delete this._events[e]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[e],s(i))this.removeListener(e,i);else if(i)for(;i.length;)this.removeListener(e,i[i.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?s(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(s(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,i){var s=i(3).EventEmitter,n=i(5),r=function(e,t){function i(e){return function(t){var i=this.qualified;s+=t.qualified?1:0===s?0:-1,this.qualified=this.doesQualify(),this.qualified!==i&&this.emit("change",{triggerBy:e,e:t.e,qualified:this.doesQualify()})}}this.dependencies=[];var s=0;for(var r in e)if(e.hasOwnProperty(r)){var o=new n(r,e[r],t);this.dependencies.push(o),s+=o.qualified?1:0,o.on("change",i(o).bind(this))}this.doesQualify=function(){return s===this.dependencies.length},this.qualified=this.doesQualify()};e.exports=r,r.prototype=$.extend({},s.prototype),r.prototype.runCheck=function(){for(var e=0,t=this.dependencies.length;e<t;e++)this.dependencies[e].runCheck()}},function(e,t,i){function s(e){var t=e.val();return"radio"===e.attr("type")&&(t=e.filter(":checked").val()),{value:t,checked:e.is(":checked"),disabled:e.is(":disabled"),selected:e.is(":selected")}}var n=i(3).EventEmitter,r=function(e,t,i){function n(t){var i=this.qualified;this.fieldState=s(this.$ele),this.qualified=this.doesQualify(),this.qualified!==i&&this.emit("change",{selector:e,e:t,qualified:this.qualified})}this.$ele=$(e),this.qualifiers=t,this.fieldState=s(this.$ele),this.methods=["enabled","checked","values","not","match","contains","email","url"],this.qualified=this.doesQualify(),this.$ele.on(i,n.bind(this)),this.runCheck=n.bind(this)};r.prototype=$.extend({},n.prototype),r.prototype.enabled=function(e){return!!(!this.fieldState.disabled&&e||this.fieldState.disabled&&!e)},r.prototype.checked=function(e){return"checkbox"!==this.$ele.attr("type")||!(!this.fieldState.checked&&e||this.fieldState.checked&&!e)},r.prototype.values=function(e){for(var t=0,i=e.length;t<i;t++)if(null!==this.fieldState.value&&Array.isArray(this.fieldState.value)){if(0===$(this.fieldState.value).not(e[t]).length&&0===$(e[t]).not(this.fieldState.value).length)return!0}else if(e[t]===this.fieldState.value)return!0;return!1},r.prototype.not=function(e){return!this.values(e)},r.prototype.match=function(e){var t=this.fieldState.value;Array.isArray(this.fieldState.value)||(t=[t]);for(var i=0,s=t.length;i<s;i++)if(!e.test(t[i]))return!1;return!0},r.prototype.notMatch=function(e){var t=this.fieldState.value;Array.isArray(this.fieldState.value)||(t=[t]);for(var i=0,s=t.length;i<s;i++)if(e.test(t[i]))return!1;return!0},r.prototype.contains=function(e){if(!Array.isArray(this.fieldState.value))return this.values(e);for(var t=0,i=e.length;t<i;t++)if($.inArray(e[t],this.fieldState.value)!==-1)return!0;return!1},r.prototype.email=function(e){var t=/^[_a-zA-Z0-9\-\+]+(\.[_a-zA-Z0-9\-\+]+)*@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;return this.match(t)===e},r.prototype.url=function(e){var t=/(((http|ftp|https):\/\/)|www\.)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?\^=%&:\/~\+#!]*[\w\-\@?\^=%&\/~\+#])?/;return this.match(t)===e},r.prototype.range=function(e,t,i){var s="string"==typeof e?"char":"number",n="char"===s?e.charCodeAt():e,r="char"===s?t.charCodeAt():t,o="char"===s?this.fieldState.value.charCodeAt():parseFloat(this.fieldState.value);if(i){for(var a=[],h=n;h<=r;h+=i)a.push(h);return a.indexOf(o)>=0}return o>=n&&o<=r},r.prototype.doesQualify=function(){for(var e in this.qualifiers)if(this.qualifiers.hasOwnProperty(e))if(this.methods.indexOf(e)&&"function"==typeof this[e]){if("range"===e){if(!this[e].apply(this,this.qualifiers[e]))return!1}else if(!this[e].call(this,this.qualifiers[e]))return!1}else if("function"==typeof this.qualifiers[e]&&!this.qualifiers[e].call(this.qualifiers,this.$ele.val()))return!1;return!0},e.exports=r,Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),Number.isNaN=Number.isNaN||function(e){return e!==e}}]);

// stick

(function($,win){"use strict";var requestFrame=function(){var raf=win.requestAnimationFrame||win.mozRequestAnimationFrame||win.webkitRequestAnimationFrame||function(fn){return win.setTimeout(fn,20)};return function(fn){return raf(fn)}}();var style=(win.document.body||win.document.documentElement).style;var prop="transition";var supportsTransition=typeof style[prop]=="string";var events={created:"sticky-created",update:"sticky-update",top:"sticky-hit-top",bottom:"sticky-hit-bottom",frozen:"sticky-frozen",unfrozen:"sticky-unfrozen"};var Sticky=function(elm,par,options){this.element=elm;this.parent=par;this._frozen=false;this._stopped=true;this.options=$.extend({useTransition:true,animate:true,animTime:200,animDelay:300},options);var offset=parseInt(options.offset,10);this.options.offset=isNaN(offset)?0:offset;this.init()};Sticky.prototype.init=function(){var transition="";if(this.options.useTransition&&supportsTransition){transition="top "+this.options.animTime+"ms ease-in-out";this.options.animate=false}this.parent.css({position:"relative"});this.element.addClass("sticky-scroll").css({transition:transition,position:"relative"});this.element.trigger(events.created);this.update()};Sticky.prototype.update=function(){this.setBoundaries(0);this.moveIt();this.element.trigger(events.update)};Sticky.prototype.moveIt=function(){var scrollTop=(win.document.documentElement.scrollTop||win.document.body.scrollTop)+this.options.offset;var height=this.element.outerHeight(true);var realStop=this._stop-height;if(this._parentHeight-this._offset>height&&!this._frozen){if(scrollTop>=this._start&&scrollTop<=realStop){this.updateOffset(scrollTop-this._start);this._stopped=false}else{if(scrollTop<this._start){this.updateOffset(0);if(!this._stopped){this.element.trigger(events.top)}this._stopped=true}else if(scrollTop>realStop){this.updateOffset(this._parentHeight-height-this._offset);if(!this._stopped){this.element.trigger(events.bottom)}this._stopped=true}}}};Sticky.prototype.setBoundaries=function(offset){this._offset=typeof offset==="undefined"?this.element.position().top:offset;this._start=this.parent.offset().top+this._offset;this._parentHeight=this.parent[0].offsetHeight;this._stop=this._start+this._parentHeight-this._offset};Sticky.prototype.setOffset=function(newOffset){newOffset=parseInt(newOffset,10);if(!isNaN(newOffset)){this.options.offset=newOffset;this.moveIt()}};Sticky.prototype.updateOffset=function(yOffset){if(this._lastPosition!==yOffset){if(this.options.animate){this.element.stop(true,false).delay(this.options.animDelay).animate({top:yOffset},this.animTime)}else{this.element.css("top",yOffset)}this._lastPosition=yOffset}};Sticky.prototype.toggleFreeze=function(){this._frozen=!this._frozen;this.element.stop(true,false);if(!this._frozen){this.element.trigger(events.unfrozen);this.moveIt()}else{this.element.trigger(events.frozen)}};$.fn.sticky=function(parentName,options){var method=parentName;var ret=false;this.each(function(){var self=$(this);var instance=self.data("stickyInstance");if(instance&&(options||method)){if(typeof options==="object"){ret=$.extend(instance.options,options)}else if(options==="options"){ret=instance.options}else if(typeof instance[method]==="function"){ret=instance[method].call(instance,options)}else{console.error("Sticky Element has no option/method named "+method)}}else{var parent=null;if(parent){parent=self.parent().closest(parent)}else{parent=self.parent()}instance=new Sticky(self,parent,options||{});self.data("stickyInstance",instance);$.fn.sticky._instances.push(instance)}});return ret||this};var updateAll=function(){var len=$.fn.sticky._instances.length;for(var i=0;i<len;i++){$.fn.sticky._instances[i].update()}};$.fn.sticky._instances=[];$.fn.sticky.updateAll=updateAll;$(win).on({resize:function(){updateAll()},scroll:function(){var len=$.fn.sticky._instances.length;for(var i=0;i<len;i++){var element=$.fn.sticky._instances[i];if(!element._frozen){element.moveIt()}}}});$(win.document).on({ready:function(){win.setInterval(function(){requestFrame(function(){var len=$.fn.sticky._instances.length;for(var i=0;i<len;i++){var element=$.fn.sticky._instances[i];if(element._parentHeight!==element.parent[0].offsetHeight){element.update()}}})},1e3)}})})(jQuery,window);

// popups

/**
 * Hover balloon on elements without css and images.
 *
 * Copyright (c) 2011 Hayato Takenaka
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * @author: Hayato Takenaka (https://urin.github.io)
 * @version: 1.1.2 - 2017/04/30
**/
!function(a){function c(){this.initialize.apply(this,arguments)}function d(d,e,f){function p(a,b,c,d,e,f){const g=Math.round(d/1.7320508);b.inactive()["setBorder"+c.camel.pos.f](d)["setBorder"+c.camel.pos.c1](g)["setBorder"+c.camel.pos.c2](g)["set"+c.camel.pos.p1](c.isTopLeft?-d:a.inner[c.size.p])["set"+c.camel.pos.c1](a.inner[c.size.c]/f-g).active().$.css("border-"+c.pos.f+"-color",e)}e.stop(!0,!0);var g,h;const i={position:"absolute",height:"0",width:"0",border:"solid 0 transparent"},j=new c(d),k=new c(e),l=-f.offsetY+(f.position&&f.position.indexOf("top")>=0?j.top-k.height:f.position&&f.position.indexOf("bottom")>=0?j.bottom:j.center.top-k.height/2),m=f.offsetX+(f.position&&f.position.indexOf("left")>=0?j.left-k.width:f.position&&f.position.indexOf("right")>=0?j.right:j.center.left-k.width/2);if(k.setTop(l<0?0:l),k.setLeft(m<0?0:m),f.tipSize>0){e.data("outerTip")&&(e.data("outerTip").remove(),e.removeData("outerTip")),e.data("innerTip")&&(e.data("innerTip").remove(),e.removeData("innerTip")),g=new c(a("<div>").css(i).appendTo(e)),h=new c(a("<div>").css(i).appendTo(e));for(var n,o=0;o<b.pos.length;o++){if(n=b.getRelativeNames(o),k.center[n.pos.c1]>=j[n.pos.c1]&&k.center[n.pos.c1]<=j[n.pos.c2])if(o%2==0){if(k[n.pos.o]>=j[n.pos.o]&&k[n.pos.f]>=j[n.pos.f])break}else if(k[n.pos.o]<=j[n.pos.o]&&k[n.pos.f]<=j[n.pos.f])break;n=null}n?(k["set"+n.camel.pos.p1](k[n.pos.p1]+(n.isTopLeft?1:-1)*(f.tipSize-k["border"+n.camel.pos.o])),p(k,g,n,f.tipSize,e.css("border-"+n.pos.o+"-color"),f.tipPosition),p(k,h,n,f.tipSize-2*k["border"+n.camel.pos.o],e.css("background-color"),f.tipPosition),e.data("outerTip",g.$).data("innerTip",h.$)):a.each([g.$,h.$],function(){this.remove()})}}function e(b,c){const d=b.data("balloon")&&b.data("balloon").get(0);return!(d&&(d===c.relatedTarget||a.contains(d,c.relatedTarget)))}function f(a,b,c){b.html?a.empty().append(c):a.text(c)}function g(a,b,c){b.data("ajaxDisabled",!0),c.ajaxContentsMaxAge>=0&&setTimeout(function(){b.data("ajaxDisabled",!1)},c.ajaxContentsMaxAge),d(a,b,c)}const b={pos:a.extend(["top","bottom","left","right"],{camel:["Top","Bottom","Left","Right"]}),size:a.extend(["height","width"],{camel:["Height","Width"]}),getRelativeNames:function(a){const c={pos:{o:a,f:a%2==0?a+1:a-1,p1:a%2==0?a:a-1,p2:a%2==0?a+1:a,c1:a<2?2:0,c2:a<2?3:1},size:{p:a<2?0:1,c:a<2?1:0}},d={};for(var e in c){d[e]||(d[e]={});for(var f in c[e])d[e][f]=b[e][c[e][f]],d.camel||(d.camel={}),d.camel[e]||(d.camel[e]={}),d.camel[e][f]=b[e].camel[c[e][f]]}return d.isTopLeft=d.pos.o===d.pos.p1,d}};!function(){function f(a,c){if(null==c)return f(a,!0),f(a,!1);const d=b.getRelativeNames(c?0:2);return a[d.size.p]=a.$["outer"+d.camel.size.p](),a[d.pos.f]=a[d.pos.o]+a[d.size.p],a.center[d.pos.o]=a[d.pos.o]+a[d.size.p]/2,a.inner[d.pos.o]=a[d.pos.o]+a["border"+d.camel.pos.o],a.inner[d.size.p]=a.$["inner"+d.camel.size.p](),a.inner[d.pos.f]=a.inner[d.pos.o]+a.inner[d.size.p],a.inner.center[d.pos.o]=a.inner[d.pos.f]+a.inner[d.size.p]/2,a}const d={setBorder:function(a,b){return function(c){return this.$.css("border-"+a.toLowerCase()+"-width",c+"px"),this["border"+a]=c,this.isActive?f(this,b):this}},setPosition:function(a,b){return function(c){return this.$.css(a.toLowerCase(),c+"px"),this[a.toLowerCase()]=c,this.isActive?f(this,b):this}}};c.prototype={initialize:function(c){this.$=c,a.extend(!0,this,this.$.offset(),{center:{},inner:{center:{}}});for(var d=0;d<b.pos.length;d++)this["border"+b.pos.camel[d]]=parseInt(this.$.css("border-"+b.pos[d]+"-width"))||0;this.active()},active:function(){return this.isActive=!0,f(this),this},inactive:function(){return this.isActive=!1,this}};for(var e=0;e<b.pos.length;e++)c.prototype["setBorder"+b.pos.camel[e]]=d.setBorder(b.pos.camel[e],e<2),e%2==0&&(c.prototype["set"+b.pos.camel[e]]=d.setPosition(b.pos.camel[e],e<2))}(),a.fn.balloon=function(b){return this.one("mouseenter",function c(d){const f=a(this),g=this,h=f.on("mouseenter",function(a){e(f,a)&&f.showBalloon()}).off("mouseenter",c).showBalloon(b).data("balloon");h&&h.on("mouseleave",function(b){g===b.relatedTarget||a.contains(g,b.relatedTarget)||f.hideBalloon()}).on("mouseenter",function(b){g===b.relatedTarget||a.contains(g,b.relatedTarget)||(h.stop(!0,!0),f.showBalloon())})}).on("mouseleave",function(b){const c=a(this);e(c,b)&&c.hideBalloon()})},a.fn.showBalloon=function(b){var c=this.data("options")?this.data("options"):b||{};return!b&&this.data("options")||(null===a.balloon.defaults.css&&(a.balloon.defaults.css={}),this.data("options",a.extend(!0,{},a.balloon.defaults,b||{}))),b=this.data("options"),this.each(function(){var e=this,h=a(e),i=!h.data("balloon"),j=h.data("balloon")||a("<div>");if(i||!j.data("active")){j.data("active",!0),clearTimeout(j.data("minLifetime"));const k=a.isFunction(b.contents)?b.contents.call(e):b.contents||h.attr("title")||h.attr("alt");h.removeAttr("title");var l=a.isFunction(b.ajax)||b.url;!l&&""===k||null==k||(a.isFunction(b.contents)||(b.contents=k),l?j.data("ajaxDisabled")||(""!==k&&null!=k&&f(j,b,k),clearTimeout(j.data("ajaxDelay")),l=b.url?function(){j.load(a.isFunction(b.url)?b.url.call(e):b.url,function(a,c,d){b.ajaxComplete&&b.ajaxComplete.call(e,a,c,d),"success"!==c&&"notmodified"!==c||g(h,j,b)})}:function(){function d(a,d){if(!c){if(c=!0,a)return;f(j,b,d),g(h,j,b)}}var c=!1;const i=b.ajax.call(e,d);i&&a.isFunction(i.then)&&i.then(function(a){d(null,a)},function(a){d(a)})},j.data("ajaxDelay",setTimeout(l,b.ajaxDelay))):f(j,b,k),j.css(b.css||{}).removeClass(c.classname).addClass(b.classname),i?(j.css({visibility:"hidden",position:"absolute"}).appendTo("body"),h.data("balloon",j),d(h,j,b),j.hide().css("visibility","visible")):d(h,j,b),j.data("delay",setTimeout(function(){b.showAnimation?b.showAnimation.apply(j.stop(!0,!0),[b.showDuration,function(){b.showComplete&&b.showComplete.apply(j)}]):j.show(b.showDuration,function(){this.style.removeAttribute&&this.style.removeAttribute("filter"),b.showComplete&&b.showComplete.apply(j)}),b.maxLifetime&&(clearTimeout(j.data("maxLifetime")),j.data("maxLifetime",setTimeout(function(){h.hideBalloon()},b.maxLifetime)))},b.delay)))}})},a.fn.hideBalloon=function(){const b=this.data("options");return this.data("balloon")?this.each(function(){const c=a(this),d=c.data("balloon");clearTimeout(d.data("delay")),clearTimeout(d.data("minLifetime")),clearTimeout(d.data("ajaxDelay")),d.data("minLifetime",setTimeout(function(){b.hideAnimation?b.hideAnimation.apply(d.stop(!0,!0),[b.hideDuration,function(c){a(this).data("active",!1),b.hideComplete&&b.hideComplete(c)}]):d.stop(!0,!0).hide(b.hideDuration,function(c){a(this).data("active",!1),b.hideComplete&&b.hideComplete(c)})},b.minLifetime))}):this},a.balloon={defaults:{contents:null,html:!1,classname:null,url:null,ajax:null,ajaxComplete:null,ajaxDelay:500,ajaxContentsMaxAge:-1,delay:0,minLifetime:200,maxLifetime:0,position:"top",offsetX:0,offsetY:0,tipSize:8,tipPosition:2,showDuration:100,showAnimation:null,hideDuration:80,hideAnimation:function(a,b){this.fadeOut(a,b)},showComplete:null,hideComplete:null,css:{fontSize:".7rem",minWidth:".7rem",padding:".2rem .5rem",border:"1px solid rgba(212, 212, 212, .4)",borderRadius:"3px",boxShadow:"2px 2px 4px #555",color:"#eee",backgroundColor:"#111",opacity:.85,zIndex:"32767",textAlign:"left"}}}}(jQuery);



// Jquery change textfield to textarea

jQuery.fn.toggleTextArea=function(){var e=this[0];if("INPUT"==e.tagName){var a=e;(t=document.createElement("textarea")).id=a.id,t.name=a.name,t.cols=40,t.rows=2,t.value=a.value,a.parentNode.replaceChild(t,a)}else if("TEXTAREA"==e.tagName){var t=e;(a=document.createElement("input")).type="text",a.id=t.id,a.name=t.name,a.value=t.value,t.parentNode.replaceChild(a,t)}return this};

// find replace plugin

!function(e){e.fn.findReplace=function(l){var t=e.extend({findText:null,replaceText:"",customClass:"",completeCallback:null},l);return this.each(function(){var l=t.findText,a=new RegExp(l,"g"),c="<span class='"+t.customClass+"'>"+t.replaceText+"</span>";e(this).html(e(this).html().replace(a,c)),e.isFunction(t.completeCallback)&&t.completeCallback.call(this)})}}(jQuery);

// give us an action for show/hide

(function ($) {
      $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
          this.trigger(ev);
          return el.apply(this, arguments);
        };
      });
})(jQuery);


// file uploader
!function(i){i.fn.simpleFileInput=function(e){return i("html").addClass("sfi-js"),this.each(function(){function s(i){var e=i.indexOf("\\")>=0?i.lastIndexOf("\\"):i.lastIndexOf("/"),s=i.substring(e);return 0!==s.indexOf("\\")&&0!==s.indexOf("/")||(s=s.substring(1)),s}function a(i){i.preventDefault(),d.trigger("click")}function n(e){var e=void 0===e?"":e,s=l.allowedExts,a=e.toLowerCase().split(".").pop();return""==a||0==s||-1!==i.inArray(a,s)}var r={placeholder:"Pick your file",wrapperClass:"sfi-container",validClass:"sfi-valid",errorClass:"sfi-error",disabledClass:"sfi-disabled",buttonText:"Pick your file",allowedExts:!1,width:300,onInit:function(){},onFileSelect:function(){},onError:function(){}},l=i.extend(r,e),t=i(this).closest(".formfileinput"),d=i(this),o=i('<div class="sfi-wrapper '+l.wrapperClass+(d.is(":disabled")?" sfi-disabled":"")+'"></div>'),f=i('<span class="sfi-filename empty">'+l.placeholder+"</span>"),c=i('<a href="#" class="sfi-trigger">'+l.buttonText+"</a>");l.onInit(),i(this).next(".sfi-wrapper").length||(o.insertAfter(d),o.attr("tabindex",d.attr("tabindex")||"0"),0!=l.width&&o.css("width",l.width+"px"),f.appendTo(o),c.appendTo(o),d.hide(),d.prop("required")&&o.addClass(".sfi-required"),d.is(":disabled")?o.addClass(".sfi-disabled"):(c.unbind("click").bind("click",function(i){a(i)}),f.unbind("click").bind("click",function(i){a(i)}),d.bind("change",function(e){_val=i(this).val(),1==n(_val)?(f.text(s(_val)),l.onFileSelect(),o.removeClass(l.errorClass),o.addClass(l.validClass),t.next("label.error").remove()):(l.onError(),d.val(""),o.removeClass(l.validClass),o.addClass(l.errorClass),i('<label class="error">This file type is not supported. Please try again.</label>').insertAfter(t))})))})}}(jQuery);




// show a number of fields based on a numerical selector - e.g. number of exhibits
(function( $ ) {
    $.fn.showFields = function( numericalField ) {
        // numericalField parameter should have format 'id_field_exhibit_' - i.e. leave off the number
        this.each( function() {

            var numericalEntity = $('[id^=' + numericalField + ']');
            numericalEntity.each(function(){
                var numericalID = parseInt(this.id.replace(numericalField, ''));
                $(this).attr('data-index', numericalID);
            });
            // hide all the fields
            numericalEntity.closest('.form-element').hide();
            $(this).change(function() {
                // reset all to hidden
                numericalEntity.closest('.form-element').hide();
                // get the number from the select
                var numberFilter = parseInt($(this).val());
                // filter the fields to those less than or equal to the select number
                    var fieldstoShow = numericalEntity.filter(function() {
                        index = $(this).attr('data-index');
                        return index <= numberFilter;

                    });
                // show the right number of fields
                fieldstoShow.closest('.form-element').show();
            });
        }); // this each
    };
}( jQuery ));

// get URL parameters 

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}





// ALWAYS USEFUL - KEEP THIS 

    // Get the input IDs and add them to the field wrappers so we can target individual fields more easily
    $('.form-wrapper input[type="text"], .form-wrapper input[type="number"], .form-wrapper select, .form-wrapper input[type="checkbox"], .form-wrapper input[type="email"]').each(function() {
        var inputId = $(this).attr('id');
        var divparent = $(this).parent().parent();
        $(divparent).addClass('form-element ' + inputId);
    });

    $('label').each(function() {
        var divparent = $(this).parent();
        $(divparent).addClass('label');
    });
    $('input[type="text"], select, input[type="email"]').each(function() {
        var divparent = $(this).parent();
        $(divparent).addClass('input');
    });
    $('input[type="file"]').each(function() {
        var divparent = $(this).parent().parent().parent();
        $(divparent).addClass('input');
    });

    $('input[type="file"]').each(function() {
        var inputId = $(this).attr('id');
        var divparent = $(this).parent().parent().parent().parent();
        $(divparent).addClass('form-element ' + inputId);
    });

    // give checkboxes a better wrapping class so we can lay out nicely

    $('.form-wrapper input[type="checkbox"]').each(function() {
        var inputId = $(this).attr('id');
        var divparent = $(this).parent().parent();
        $(divparent).addClass('checkbox');
    });


$(function(){

    // if a field is set up as mandatory then get a required property into the field itself

    $('span.required').each(function() {
        var divparent = $(this).parent().parent();
        $(divparent).addClass('required');
    });

});

// We want to prevent the enter button trying to submit the form - it can just take us to the next wizard step instead

$('form').keypress(function(e) {

    //Enter key
    if (e.which == 13) {

        return false;
    }
});

// Add some structural html formatting to the page

$(function() {

    $('.form-wrapper').wrapAll('<div class="main-inner"></div>');
    $('.main-inner').wrapAll('<div class="main"></div>');

    var header = '<div class="header"><div class="header-inner"><div id="logo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAcCAIAAACrlWfwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMzczRDcwNjZFNjExRTc4NTFDRjc3QUFERTMxNkE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMzczRDcxNjZFNjExRTc4NTFDRjc3QUFERTMxNkE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQzNzNENkU2NkU2MTFFNzg1MUNGNzdBQURFMzE2QTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQzNzNENkY2NkU2MTFFNzg1MUNGNzdBQURFMzE2QTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5v+naqAAARcElEQVR42uRb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"/></div></div></div>';
    $(header).insertBefore('.main');

    var footer = '<div class="footer"><div class="footer-inner"><p>©2002-2017 T-MOBILE USA, INC.</p></div></div>';
    $(footer).insertAfter('.main');

});

// give it a title

$(function() {
    $('.main .main-inner').prepend('<h1>Title Review Intake Form</h1>');

});

// Change field labels

$('.form-wrapper label').each(function() {
    var text = $(this).text();
    $(this).html(text.replace('Assessor\'s parcel number', 'Assessor\'s Parcel Number')
        .replace('Name', 'Site Name')
        .replace('County where registered', 'County Where Registered')
        .replace('Update and (Submitter)', 'Update and')
        .replace('Status', 'Current Record Status (Read Only)')
        .replace('Address line 1', 'Site Address')
        .replace('Updated Site Address', 'Site Address')
        .replace('Updated Town/City', 'Town/City')
        .replace('Updated State', 'State')
        .replace('Updated Zip Code', 'Zip Code')
        .replace('Updated Market', 'Market')
        .replace('Updated Region', 'Region')
        .replace('Mortgage on Property\? 1', 'Mortgage on Property\?')
        .replace('Foreclosure Details 1', 'Foreclosure Details')
        .replace('Foreclosure Details 2', 'Foreclosure Details')
        .replace('Foreclosure Details 3', 'Foreclosure Details')
        .replace('Foreclosure Details 4', 'Foreclosure Details')
        .replace('Relationship Name', 'Title Review Reference'));

});



// Set any default field values

$(function() {
    $('select#id_field_leasing_document option[value="Title"]').attr("selected", true).hide();
});

// WIZARD RELATED STUFF

// Add wizard class to form

$(function() {
    $('#target_form').addClass('wizard');

});

// Add the wizard header

$(function() {


    var large = '<div class="wizard-header"><ul class="nav nav-tabs"><li role="presentation" class="wizard-step-indicator" id="step-site-info"><a href="#site-info">1. Site Information<\/a><\/li><li role="presentation" class="wizard-step-indicator" id="step-submitter"><a href="#submitter">2. Submitter Details<\/a><\/li><li role="presentation" class="wizard-step-indicator" id="step-legal-analysis"><a href="#legal-analysis">3. Legal Analysis / Title Review Memo<\/a><\/li><li role="presentation" class="wizard-step-indicator" id="step-documents"><a href="#documents">4. Documents<\/a><\/li><li role="presentation" class="wizard-step-indicator last" id="step-communications"><a href="#communications">5. Communications<\/a><\/li><\/li><li role="presentation" class="wizard-step-indicator conditional last" id="step-notes"><a href="#notes">5. Notes<\/a><\/li><\/ul><\/div>';
    $('#target_form').prepend(large);

});


$(function() {

    // add classes for each section to divvy up the form into sections

    // site information
    $('.id_field_relationship_name,.id_site_field_site_id,.id_site_field_name,.id_site_field_site_type,.id_field_please_select_the_site_type_from_the_drop_down_list,.id_field_other_site_type,.id_site_field_address_line_1,.id_site_field_address_line_2,.id_site_field_city,.id_site_field_state,.id_site_field_zip_code,.id_site_field_market,.id_field_assessors_parcel_number,.id_field_county_where_registered,.id_field_summary_update_legal_only,.id_site_field_towncity,.id_site_field_county,.id_site_field_post_code,.id_field_first_name,.id_site_field_region,.id_field_are_the_above_details_correct,.id_field_updated_site_address,.id_field_updated_towncity,.id_field_updated_state,.id_field_updated_zip_code,.id_field_updated_market,.id_field_updated_region,.id_field_name_the_public_access_roads_to_site_and_special_routes_if_any_to_tmo_cell_site,.id_field_any_known_or_possible_access_issues_to_the_site,.id_field_describe_access_issues,.id_field_does_tmo_have_a_current_survey_note_current_means_survey_in_last_6_months,.id_field_does_tmo_have_a_current_survey_note_current_means_survey_in_last_6_months,.id_field_please_upload_the_survey,.id_field_is_the_property_owner_the_landlord,.id_field_is_there_a_primeground_lease,.id_field_please_upload_the_primeground_lease,.id_field_do_you_have_the_proposed_lease_document,.id_field_enter_landlord_name')

        .addClass('site-info');


    //submitter details
    $('.id_field_firstname,.id_field_last_name,.id_field_submitter_email,.id_field_phone,.id_field_firm_name,.id_field_job_title,.id_field_creation_date')

        .addClass('submitter');


    // legal analysis
    $('.id_field_parcel_identification_number,.id_field_property_owner_per_title_report,.id_field_name_of_title_company,.id_field_title_report_date_prepared,.id_field_has_title_report_been_updated,.id_field_title_report_updated_date,.id_field_title_file_number,.id_field_title_type,.id_field_brief_legal_description,.id_field_any_knownpossible_access_issues,.id_field_upload_the_survey,.id_field_please_upload_the_access_easement_from_the_property_owner_utility_or_adjacent_parcel_owner,.id_field_other_red_flag_issues,.id_field_mortgage_on_property_1,.id_field_loan_type,.id_field_loan_type_1,.id_field_loan_type_2,.id_field_loan_type_3,.id_field_loan_type_4,.id_field_lender_name,.id_field_lender_name_1,.id_field_lender_name_2,.id_field_lender_name_3,.id_field_lender_name_4,.id_field_borrower_name,.id_field_borrower_name_1,.id_field_borrower_name_2,.id_field_borrower_name_3,.id_field_borrower_name_4,.id_field_is_the_mortgage_one_million_or_more,.id_field_is_the_mortgage_one_million_or_more_1,.id_field_is_the_mortgage_one_million_or_more_2,.id_field_is_the_mortgage_one_million_or_more_3,.id_field_is_the_mortgage_one_million_or_more_4,.id_field_date_recorded,.id_field_date_recorded_1,.id_field_date_recorded_2,.id_field_date_recorded_3,.id_field_date_recorded_4,.id_field_deed_book,.id_field_deed_book_1,.id_field_deed_book_2,.id_field_deed_book_3,.id_field_deed_book_4,.id_field_page_number,.id_field_page_number_1,.id_field_page_number_2,.id_field_page_number_3,.id_field_page_number_4,.id_field_instrument_number,.id_field_instrument_number_1,.id_field_instrument_number_2,.id_field_instrument_number_3,.id_field_instrument_number_4,.id_field_loan_amount,.id_field_loan_amount_1,.id_field_loan_amount_2,.id_field_loan_amount_3,.id_field_loan_amount_4,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_1,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_2,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_3,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_4,.id_field_section_reference,.id_field_section_reference_1,.id_field_section_reference_2,.id_field_section_reference_3,.id_field_section_reference_4,.id_field_lender_notice_address,.id_field_lender_notice_address_1,.id_field_lender_notice_address_2,.id_field_lender_notice_address_3,.id_field_lender_notice_address_4,.id_field_notice_of_default_on_loan,.id_field_notice_of_default_on_loan_1,.id_field_notice_of_default_on_loan_2,.id_field_notice_of_default_on_loan_3,.id_field_notice_of_default_on_loan_4,.id_field_default_details,.id_field_default_details_1,.id_field_default_details_2,.id_field_default_details_3,.id_field_default_details_4,.id_field_loan_foreclosure,.id_field_loan_foreclosure_1,.id_field_loan_foreclosure_2,.id_field_loan_foreclosure_3,.id_field_loan_foreclosure_4,.id_field_foreclosure_details,.id_field_foreclosure_details_1,.id_field_foreclosure_details_2,.id_field_foreclosure_details_3,.id_field_foreclosure_details_4,.id_field_another_loan_1,.id_field_another_loan_2,.id_field_another_loan_3,.id_field_another_loan_4,.id_field_sndasmemorandum_of_lease,.id_field_sndamol_description,.id_field_liensmechanic_liens,.id_field_lien_description,.id_field_tax_delinquencies_or_judgments,.id_field_tax_delinquency_or_judgment_description,.id_field_finespenalties,.id_field_fines_or_penalties_description,.id_field_environment_issues_identified_in_title_report,.id_field_describe_environmental_issues,.id_field_easement_covenants_restrictions,.id_field_describe_easement_covenants_restrictions,.id_field_other_title_caveats_requirements,.id_field_describe_title_caveats_requirements')

        .addClass('legal-analysis');

    // loans - not a tab but we need to make these easier to manage
    $('.id_field_loan_type,.id_field_lender_name,.id_field_borrower_name,.id_field_is_the_mortgage_one_million_or_more,.id_field_loan_amount,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo,.id_field_notice_of_default_on_loan,.id_field_loan_foreclosure,.id_field_another_loan_1')

        .addClass('loan-1');

    $('.id_field_loan_type_1,.id_field_lender_name_1,.id_field_borrower_name_1,.id_field_is_the_mortgage_one_million_or_more_1,.id_field_loan_amount_1,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_1,.id_field_notice_of_default_on_loan_1,.id_field_loan_foreclosure_1,.id_field_another_loan_2')

        .addClass('loan-2');

    $('.id_field_loan_type_2,.id_field_lender_name_2,.id_field_borrower_name_2,.id_field_is_the_mortgage_one_million_or_more_2,.id_field_loan_amount_2,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_2,.id_field_notice_of_default_on_loan_2,.id_field_loan_foreclosure_2,.id_field_another_loan_3')

        .addClass('loan-3');

    $('.id_field_loan_type_3,.id_field_lender_name_3,.id_field_borrower_name_3,.id_field_is_the_mortgage_one_million_or_more_3,.id_field_loan_amount_3,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_3,.id_field_notice_of_default_on_loan_3,.id_field_loan_foreclosure_3,.id_field_another_loan_4')

        .addClass('loan-4');


    $('.id_field_loan_type_4,.id_field_lender_name_4,.id_field_borrower_name_4,.id_field_is_the_mortgage_one_million_or_more_4,.id_field_loan_amount_4,.id_field_lender_consent_required_for_lease_or_sublease_to_tmo_4,.id_field_notice_of_default_on_loan_4,.id_field_loan_foreclosure_4')

        .addClass('loan-5');


    //documents
    $('.id_field_title_report,.id_field_title_document,.id_field_title_review_passed_ta_review,.id_field_do_you_have_any_additional_documents,.id_field_document_1,.id_field_document_2,.id_field_document_3,.id_field_document_4,.id_field_document_5,.id_field_leasing_document')

        .addClass('documents');

    //communications
    $('.id_field_do_you_need_to_contact_legal,.id_field_send_a_message_to_legal,.id_field_send_a_message_to_the_submitter')

        .addClass('communications');


    //documents
    $('.id_field_status,.id_field_submitter_notes_to_legal,.id_field_legal_notes_to_submitter,.id_field_update_and_submitter,.id_field_update_and,.id_field_select_authorised_signatory,.id_field_legal_summary_comments,.id_field_matter_status')

        .addClass('notes');

});

// Wrap up the form sections with the wizard div tags

$(function() {

    $('.site-info').wrapAll('<div id="site-info" class="wizard-step"><\/div>');
    $('.submitter').wrapAll('<div id="submitter" class="wizard-step"><\/div>');
    $('.title-review').wrapAll('<div id="title-review" class="wizard-step"><\/div>');
    $('.legal-analysis').wrapAll('<div id="legal-a`nalysis" class="wizard-step"><\/div>');
    $('.documents').wrapAll('<div id="documents" class="wizard-step"><\/div>');
    $('.communications').wrapAll('<div id="communications" class="wizard-step"><\/div>');
    $('.notes').wrapAll('<div id="notes" class="wizard-step"><\/div>');
    $('.wizard-step').wrapAll('<div class="wizard-content"><\/div>');

});

// Insert form intro bits and buttons

$(function() {

    $('#site-info').append('<div class="buttons buttons-1"><button type="button" class="wizard-prev">Prev<\/button><button type="button" class="wizard-next">Next<\/button><\/div>');
    $('#submitter').append('<div class="buttons buttons-2"><button type="button" class="wizard-prev">Prev<\/button><button type="button" class="wizard-next">Next<\/button><\/div>');
    $('#legal-analysis').append('<div class="buttons buttons-3"><button type="button" class="wizard-prev">Prev<\/button><button type="button" class="wizard-next">Next<\/button><\/div>');
    $('#documents').append('<div class="buttons buttons-4"><button type="button" class="wizard-prev">Prev<\/button><button type="button" class="wizard-next">Next<\/button><\/div><\/div>');
    $('#communications').append('<div class="buttons buttons-5"><button type="button" class="wizard-prev">Prev<\/button><button type="button" class="wizard-next">Next<\/button><\/div><\/div>');
    $('#notes').append('<div class="buttons buttons-6"><button type="button" class="wizard-prev">Prev<\/button><\/div>');

    // intercept the tab key on the wizard's next button and make sure the page is validated

    $('button.wizard-next').keydown(function(e) {

        //tab key
        if (e.which == 9) {
            $('.wizard-current button.wizard-next').click();
            return false;
        }

    });

    function scroll_to_errors() {
        if ($('.error')[0]) {
            var $error = $('.error').first().closest('.form-element').find('label').text();
            var $field = $('.error').first().closest('.form-element').find('input,select,textarea');
            window.scrollTo(0, $($field).offset().top);
        }
    }

    $('.buttons,.nav-tabs, .submits').keyup(function() {
        scroll_to_errors();
    });
    $('.buttons,.nav-tabs,.submits').click(function() {
        scroll_to_errors();
    });

});


$('#target_form_submit').wrapAll('<div class="submits border"></div');

// submit buttons live in the last tab normally, keep them separate so you can move the other things about
$('.submits').prepend('<div class="long-save invisible"><p>Please wait while we submit your request.<br/>This may take a few moments while documents are uploaded.</p></div>');

// message for long submits and other functions on submit

$('#target_form_submit').click(function(e) {
    if ($('form').valid()) {
        $('form').submit();
        $('.buttons').hide();
        $('.submits').removeClass('border');
        $('.save-load').hide();
        setTimeout(function() {
            $('.long-save').removeClass('invisible');
        }, 1000);
    } else {
        e.preventDefault();
        return false;
    }
});

// position save and load buttons

$(function() {
    $('.submits button').wrapAll('<div class="save-load"></div>');
    $('.save-load').insertAfter('.buttons');
    $('<p class="sl-help"><strong>Don\'t have time to finish? Save your work in progress!</strong><br/>Load it again when you are ready to submit your request!</p>').appendTo('.save-load');
});

// move logout button out of the main arena
$(function() {
    $('#target_form_logout').prependTo('.main-inner');
});
// INITIATE THE WIZARD

$(function() {
    $("#target_form").simpleWizard({
        // done state CSS class
        cssClassStepDone: "wizard-done",
        // active state CSS class
        cssClassStepActive: "wizard-current",
        // callbacks
        onInit: function() {

        },
        onChange: function() {
            $("html, body").animate({
                scrollTop: 0
            }, "fast");
            var stepHeight = $('.wizard-step.wizard-current').height();
            $('.wizard-content').height(stepHeight);
            // make sure we pick up changes in wizard height from changes to inputs
            $('.wizard-current select, .wizard-current input, .wizard-current textarea').change(function() {
                var stepHeight = $('.wizard-step.wizard-current').height();
                $('.wizard-content').height(stepHeight);
            });
            // make sure we pick up changes in wizard height from changes to row add/remove on site info
            $('.wizard-current .add-row, .wizard-current.remove-row').click(function() {
                var stepHeight = $('.wizard-step.wizard-current').height();
                $('.wizard-content').height(stepHeight);
            });
        },
        onFinish: function() {}
    });
});

// Field prepopulation

$(function() {

    function stamp() {
        function pad(x) {
            return ('0' + x).slice(-2, 5);
        }
        var date = new Date();
        var test = "test";
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!`
        var yy = date.getFullYear();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return pad(mm) + pad(dd) + pad(yy) + '.' + pad(h) + pad(m) + pad(s);
    }


    // add a class to the relationship field if it is selected
    $('#id_field_relationship_name,#_acl_id_field_relationship_name').change(function() {
        if (!$('#id_field_relationship_name,#_acl_id_field_relationship_name').hasClass('filltarget-locked')) {
            $('.id_field_relationship_name').addClass('preselected');
            $('.save-load').hide();
        }

    });

    // do the opposite if a blank selection is made - clears the form
    $('#id_field_relationship_name,#_acl_id_field_relationship_name').change(function() {
        if (!$('#_acl_id_field_relationship_name').val()) {
            $('.id_field_relationship_name').removeClass('preselected');
            $('.save-load').show();
        }

    });

    $('#id_site_field_site_id').on('postchange', function(e) {
        if (!$('.id_field_relationship_name').hasClass('preselected')) {
            // build the relationship field value
            var calcValue = e.target.value + '/' + stamp();
            // add it to a the options list
            $('#id_field_relationship_name').val(calcValue);
            setVolatileOption($('#_acl_id_field_relationship_name'), calcValue);
        }
    });
});

$('form').on('postreset', function(e) {
    $('.id_field_relationship_name').removeClass('preselected');

});

// General form alterations - moving some fields etc

$(function() {

    $('#site-info').prepend('<h2>Site Information</h2>');
    $('#access').prepend('<h2>Site Access Information</h2>');
    $('#submitter').prepend('<h2>Submitter Details</h2>');
    $('#legal-analysis').prepend('<h2>Legal Analysis/Title Review Memo</h2><h3 class="alert">Submitters do not need to enter the information requested in Tab 3. The legal negotiator assigned to work on the title review will provide the information in Tab 3. Submitters, please go to the Documents tab to upload documents and submit your request for legal review.</h3>');
    $('#documents').prepend('<h2>Documents</h2>');
    $('#communications').prepend('<h2>Communications</h2><h3> If you need to provide additional information for your matter, request a status update or add any information you want to provide at the point of the initial submission, please use the below fields to send a message.</h3><div id="comms-intro">Please note, this page is for chasing matters and general matter queries only. Once the matter has been assigned to legal, all future legal communications will be dealt with on the Notes tab.</div>');
    $('#notes').prepend('<h2>Notes</h2>');



    // Turn some text fields into text areas and set the rows property if you need them bigger

    $('#id_field_legal_summary_comments').toggleTextArea();
    $('#id_field_legal_summary_comments').prop('rows', '10');
    $('#id_field_legal_notes_to_submitter').toggleTextArea();
    $('#id_field_submitter_notes_to_legal').toggleTextArea();
    $('#id_field_legal_notes_to_submitter,#id_field_submitter_notes_to_legal').prop('rows', '25');
    $('#id_field_send_a_message_to_legal').toggleTextArea();
    $('#id_field_send_a_message_to_legal').prop('rows', '10');
    $('#id_field_send_a_message_to_the_submitter').toggleTextArea();
    $('#id_field_send_a_message_to_the_submitter').prop('rows', '10');



    $('<h3>Please date all entries with your latest comment at the top of the list. On submission the recipient will be notified by email. (Please use this format: Date Initials Notes)</h3>').insertBefore('.id_field_legal_notes_to_submitter');
    $('<p class="help">Please type the full Site ID. If this request does not have a Site ID, please type New_Site. Please ensure you do not include any spaces in this box.</p>').insertBefore('.id_site_field_site_id');
    $('<hr />').insertBefore('.id_field_status .label');
    $('<hr />').insertBefore('.id_field_are_the_above_details_correct .label');
    $('<hr />').insertBefore('.id_field_another_loan_1 .label');
    $('<hr />').insertBefore('.id_field_another_loan_2 .label');
    $('<hr />').insertBefore('.id_field_another_loan_3 .label');
    $('<hr />').insertBefore('.id_field_another_loan_4 .label');
    $('<hr />').insertBefore('.id_field_sndasmemorandum_of_lease .label');
    $('<hr />').insertBefore('.id_field_name_the_public_access_roads_to_site_and_special_routes_if_any_to_tmo_cell_site .label');

    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_title_report_date_prepared');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_title_report_updated_date');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_date_recorded');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_date_recorded_1');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_date_recorded_2');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_date_recorded_3');
    $('<p class="help">Please use date format mm/dd/yyyy</p>').insertAfter('#id_field_date_recorded_4');
    $('<hr />').insertBefore('.id_field_summary_update_legal_only .label');
    $('<h3 class="amended-address">Please use the fields below to provide the correct site information.</h3>').insertBefore('.id_field_updated_site_address');

    // comms fields emphasis on who can send the form
    $('<strong>Submitter use only</strong></br>').insertBefore('#id_field_send_a_message_to_legal');
    $('<strong>Legal use only</strong></br>').insertBefore('#id_field_send_a_message_to_the_submitter');
    $('<strong>Submitter use only</strong></br>').insertBefore('#id_field_submitter_notes_to_legal');
    $('<strong>Legal use only</strong></br>').insertBefore('#id_field_legal_notes_to_submitter');

});

// CONDITIONAL FIELDS

$(function() {

    $('#id_field_do_you_have_any_additional_documents').showFields('id_field_document_');

    // DEPENDSON CONDITIONALS

    // submits
    
     $('.submits').dependsOn({
        '#id_field_title_review_passed_ta_review': {
            values: ['Yes']
        }
    }, {
        hide: false,
        disable: false,
        onEnable: function() {
            $('.submits').insertBefore('.buttons-6');
        },
        onDisable: function() {
            $('.submits').insertBefore('.buttons-5');
        }
    });

    // site information

    $('.id_field_updated_site_address,.id_field_updated_towncity,.id_field_updated_state,.id_field_updated_zip_code,.id_field_updated_market,.id_field_updated_region,.amended-address').dependsOn({
        '#id_field_are_the_above_details_correct': {
            values: ['No']
        }
    }); 

    $('.id_field_other_site_type').dependsOn({
        '#id_field_please_select_the_site_type_from_the_drop_down_list': {
            values: ['Other please specify']
        }
    }); 

    $('.id_field_describe_access_issues').dependsOn({
        '#id_field_any_known_or_possible_access_issues_to_the_site': {
            values: ['Yes']
        }
    }); 

    $('.id_field_please_upload_the_survey').dependsOn({
        '#id_field_does_tmo_have_a_current_survey_note_current_means_survey_in_last_6_months': {
            values: ['Yes']
        }
    }); 

    $('.id_field_is_there_a_primeground_lease').dependsOn({
        '#id_field_is_the_property_owner_the_landlord': {
            values: ['Yes']
        }
    }); 

    $('.id_field_please_upload_the_primeground_lease').dependsOn({
        '#id_field_is_there_a_primeground_lease': {
            values: ['Yes']
        }
    }); 

    // legal analysis

    $('.id_field_title_report_updated_date').dependsOn({
        '#id_field_has_title_report_been_updated': {
            values: ['Yes']
        }
    }); 

    $('.id_field_upload_the_survey,.id_field_please_upload_the_access_easement_from_the_property_owner_utility_or_adjacent_parcel_owner').dependsOn({
        '#id_field_any_knownpossible_access_issues': {
            values: ['Yes']
        }
    }); 

    $('.loan-1').dependsOn({
        '#id_field_mortgage_on_property_1': {
            values: ['Yes']
        }
    });
    $('.id_field_date_recorded,.id_field_deed_book,.id_field_page_number,.id_field_instrument_number').dependsOn({
        '#id_field_is_the_mortgage_one_million_or_more': {
            values: ['Yes']
        }
    }); 
    $('.id_field_section_reference,.id_field_lender_notice_address').dependsOn({
        '#id_field_lender_consent_required_for_lease_or_sublease_to_tmo': {
            values: ['Yes']
        }
    }); 
    $('.id_field_default_details').dependsOn({
        '#id_field_notice_of_default_on_loan': {
            values: ['Yes']
        }
    }); 
    $('.id_field_foreclosure_details').dependsOn({
        '#id_field_loan_foreclosure': {
            values: ['Yes']
        }
    });

    $('.loan-2').dependsOn({
        '#id_field_another_loan_1': {
            values: ['Yes']
        }
    }); 
    $('.id_field_date_recorded_1,.id_field_deed_book_1,.id_field_page_number_1,.id_field_instrument_number_1').dependsOn({
        '#id_field_is_the_mortgage_one_million_or_more_1': {
            values: ['Yes']
        }
    }); 
    $('.id_field_section_reference_1,.id_field_lender_notice_address_1').dependsOn({
        '#id_field_lender_consent_required_for_lease_or_sublease_to_tmo_1': {
            values: ['Yes']
        }
    }); 
    $('.id_field_default_details_1').dependsOn({
        '#id_field_notice_of_default_on_loan_1': {
            values: ['Yes']
        }
    }); 
    $('.id_field_foreclosure_details_1').dependsOn({
        '#id_field_loan_foreclosure_1': {
            values: ['Yes']
        }
    });


    $('.loan-3').dependsOn({
        '#id_field_another_loan_2': {
            values: ['Yes']
        }
    }); 

    $('.id_field_date_recorded_2,.id_field_deed_book_2,.id_field_page_number_2,.id_field_instrument_number_2').dependsOn({
        '#id_field_is_the_mortgage_one_million_or_more_2': {
            values: ['Yes']
        }
    }); 
    $('.id_field_section_reference_2,.id_field_lender_notice_address_2').dependsOn({
        '#id_field_lender_consent_required_for_lease_or_sublease_to_tmo_2': {
            values: ['Yes']
        }
    }); 
    $('.id_field_default_details_2').dependsOn({
        '#id_field_notice_of_default_on_loan_2': {
            values: ['Yes']
        }
    }); 
    $('.id_field_foreclosure_details_2').dependsOn({
        '#id_field_loan_foreclosure_2': {
            values: ['Yes']
        }
    });

    $('.loan-4').dependsOn({
        '#id_field_another_loan_3': {
            values: ['Yes']
        }
    }); 
    $('.id_field_date_recorded_3,.id_field_deed_book_3,.id_field_page_number_3,.id_field_instrument_number_3').dependsOn({
        '#id_field_is_the_mortgage_one_million_or_more_3': {
            values: ['Yes']
        }
    }); 
    $('.id_field_section_reference_3,.id_field_lender_notice_address_3').dependsOn({
        '#id_field_lender_consent_required_for_lease_or_sublease_to_tmo_3': {
            values: ['Yes']
        }
    }); 
    $('.id_field_default_details_3').dependsOn({
        '#id_field_notice_of_default_on_loan_3': {
            values: ['Yes']
        }
    }); 
    $('.id_field_foreclosure_details_3').dependsOn({
        '#id_field_loan_foreclosure_3': {
            values: ['Yes']
        }
    });

    $('.id_field_default_details_4').dependsOn({
        '#id_field_notice_of_default_on_loan_4': {
            values: ['Yes']
        }
    }); 
    $('.loan-5').dependsOn({
        '#id_field_another_loan_4': {
            values: ['Yes']
        }
    }); 
    $('.id_field_date_recorded_4,.id_field_deed_book_4,.id_field_page_number_4,.id_field_instrument_number_4').dependsOn({
        '#id_field_is_the_mortgage_one_million_or_more_4': {
            values: ['Yes']
        }
    });
    $('.id_field_section_reference_4,.id_field_lender_notice_address_4').dependsOn({
        '#id_field_lender_consent_required_for_lease_or_sublease_to_tmo_4': {
            values: ['Yes']
        }
    }); 

    $('.id_field_foreclosure_details_4').dependsOn({
        '#id_field_loan_foreclosure_4': {
            values: ['Yes']
        }
    });

    $('.id_field_sndamol_description').dependsOn({
        '#id_field_sndasmemorandum_of_lease': {
            values: ['Yes']
        }
    }); 
    $('.id_field_lien_description').dependsOn({
        '#id_field_liensmechanic_liens': {
            values: ['Yes']
        }
    }); 
    $('.id_field_tax_delinquency_or_judgment_description').dependsOn({
        '#id_field_tax_delinquencies_or_judgments': {
            values: ['Yes']
        }
    }); 
    $('.id_field_fines_or_penalties_description').dependsOn({
        '#id_field_finespenalties': {
            values: ['Yes']
        }
    }); 
    $('.id_field_describe_environmental_issues').dependsOn({
        '#id_field_environment_issues_identified_in_title_report': {
            values: ['Yes']
        }
    }); 
    $('.id_field_describe_easement_covenants_restrictions').dependsOn({
        '#id_field_easement_covenants_restrictions': {
            values: ['Yes']
        }
    }); 
    $('.id_field_describe_title_caveats_requirements').dependsOn({
        '#id_field_other_title_caveats_requirements': {
            values: ['Yes']
        }
    }); 
    // comms

    $('.id_field_send_a_message_to_legal,.id_field_send_a_message_to_the_submitter').dependsOn({
        '#id_field_do_you_need_to_contact_legal': {
            values: ['Yes']
        }
    }); 

    // notes
    $('.id_field_submitter_notes_to_legal,.id_field_legal_notes_to_submitter,.wizard-step-indicator#step-notes,.id_field_legal_review_summary_comments').dependsOn({
        '#id_field_title_review_passed_ta_review': {
            values: ['Yes']
        }
    }, {

        onEnable: function() {
            $('#step-communications').removeClass('last');
            $('#i .wizard-next').show();
        },
        onDisable: function() {
            $('#step-communications').addClass('last');
            $('#communications .wizard-next').hide();
        }
    });


    $('.id_field_update_and').dependsOn({
        '#id_field_status': {

            values: ['Assigned ES Consulting', 'Assigned Attorney Level at ES Consulting', 'Assigned TMO']
        },
        '#id_field_title_review_passed_ta_review': {
            values: ['Yes']
        }
    }, {
        onEnable: function() {
            $('#id_field_submitter_notes_to_legal').prop('readonly', true);
        },
        onDisable: function() {
            $('#id_field_submitter_notes_to_legal').prop('readonly', false);
        }

    });


    $('.id_field_update_and_submitter').dependsOn({
        '#id_field_status': {
            values: ['Assigned ES Consulting (with Submitter)', 'Assigned Attorney Level at ES Consulting (with Submitter)', 'Assigned TMO (with Submitter)']
        },
        '#id_field_title_review_passed_ta_review': {
            values: ['Yes']
        }
    }, {
        onEnable: function() {
            $('#id_field_legal_notes_to_submitter').prop('readonly', true);
        },
        onDisable: function() {
            $('#id_field_legal_notes_to_submitter').prop('readonly', false);
        }

    });

    $('.id_field_legal_summary_comments').dependsOn({
        '#id_field_status': {
            values: ['Assigned ES Consulting', 'Assigned Attorney Level at ES Consulting', 'Assigned TMO']
        }
    });

   $('.id_field_select_authorised_signatory').dependsOn({
        '#id_field_status': {
            values: ['Assigned ES Consulting (with Submitter)', 'Assigned Attorney Level at ES Consulting (with Submitter)', 'Assigned TMO (with Submitter)']
            }
        }, {
            onEnable: function() {
                $('#id_field_select_authorised_signatory').css("pointer-events","none").addClass('readonly');
            },
            onDisable: function() {
                $('#id_field_select_authorised_signatory').css("pointer-events","default").removeClass('readonly');
            },
            hide: false
        });
   




}); // end conditional

// Add classes for validation or hiding

$(function() {

    $('.id_field_creation_date').hide();
    $('.id_field_leasing_document').hide();
    $('#id_field_preliminary_title_report').prop('required', true);
    $('.required input,.required select,.required textarea').prop('required', true);
    $('.id_field_title_review_passed_ta_review').hide();
    $("#id_field_status").css("pointer-events","none").addClass('readonly');
});

// If a file field already has a linked file make it non-mandatory

$('input,select').change(function() {
    $('.formfileinput a.link:contains("(link)")').each(function() {
        var fileWrapper = $(this).closest('.form-element');
        fileWrapper.removeClass('required').find('input').prop('required', false).addClass('populated');

    });
});

// filetype validation

$('input[type="file"]').simpleFileInput({

    placeholder : 'Please upload a document',
    buttonText : 'Select',
    width: 470,
    allowedExts : ['pdf', 'doc', 'docx', 'rtf', 'png', 'jpg', 'jpeg', 'xml', 'rtf', 'csv','otd','ott','gif','txt']

});



// set wizard height 

$(function() {

    var stepHeight = $('.wizard-step.wizard-current').height();
    $('.wizard-content').height(stepHeight);
    $('.wizard-current select, .wizard-current input, .wizard-current textarea').change(function() {
        var stepHeight = $('.wizard-step.wizard-current').height();
        $('.wizard-content').height(stepHeight);
    });
});

$(function() {
    // requiredness of elements depending on visibility

    $('.form-element').on('show', function() {
        $(this).find('input,select,textarea').not('.populated').prop('required', true).closest('.form-element').addClass('required');
    });
    $('.form-element').on('hide', function() {
        $(this).find('input,select,textarea').not('.populated').prop('required', false).closest('.form-element').removeClass('required');
    });

    // specific exceptions to the above

    $('.id_field_legal_notes_to_submitter,.id_field_submitter_notes_to_legal,.id_field_legal_summary_comments,.checkbox,.id_field_updated_site_address,.id_field_updated_towncity,.id_field_updated_state,.id_field_updated_zip_code,.id_field_updated_market,.id_field_updated_region,.id_field_send_a_message_to_legal,.id_field_send_a_message_to_the_submitter').on('show', function() {
        $(this).find('input,select,textarea').prop('required', false);
    });
});

// help popup tab
$(function() {

    $(".help-tab").offset({
        top: 100
    });
    var helpTab = '<div class="help-tab"><div class="inner"><div class="help-label"><a href="#">Need help?</a></div><div class="help-content">Call <span class="pink"><strong>(248) 565-3499</strong></span><br/>Hours of support = <strong>8am-8pm</strong> EST<br/>Monday - Friday<br/><strong>Comments and suggestions?</strong><br/>email <a href="mailto:feedback@esc-l.com">feedback@esc-l.com<br/><div class="close"><a href="#"><strong>Got it</strong></a></div></div></div></div>';
    $('.form-wrapper').prepend(helpTab);

    $('.help-content').hide();

    $('.help-tab .help-label a').click(function(e) {
        $('.help-content').fadeIn(200);
        e.preventDefault();
    });

    $('.help-tab .help-content .close a').click(function(e) {
        $('.help-content').fadeOut(200);
        e.preventDefault();
    });

    // hide it when user clicks out
    $(".main").mouseup(function(e) {
        var subject = $(".help-content");

        if (e.target.id != subject.attr('class')) {
            subject.fadeOut(200);
        }
    });

    $('.help-tab').sticky('.form-wrapper', {
        useTransition: false,
        animate: false
    });
    $('.help-tab').sticky('setOffset', 350);


});

// help hovers 

$(function() {
    var helpOne = '<div class="help-popup legal"><div class="inner"><div class="icon"><strong>?</strong></div>';
    $(helpOne).insertAfter('#id_field_update_and');
    var helpOneText = '<table class="popup"><tr><th>Action</th><th>What this means</th></tr><tr><td>Return to submitter</td><td>Form is updated with changes. Submitter becomes form owner and is notified.</td></tr><tr><td>Remain with Legal </td><td>Form is updated; Submitter is notified if new comments added. You remain owner of the record.</td></tr><tr><td>Abandon Instruction </td><td>Form status set to Abandoned. Submitter is notified.</td></tr><tr><td>Comms</td><td>Form is updated, legal/submitter is notified if you have added a comment to the Comms tab but <strong>NOT</strong> added a comment in the Notes tab.</td></tr></table>';

    $('.help-popup.legal .icon').balloon({
        html: true,
        contents: helpOneText,
        position: "right",
        css: {
            padding: '20px',
            fontSize: '90%',
            backgroundColor: '#fff',
            opacity: '1',
            color: '#393939'
        }
    });

    var helpTwo = '<div class="help-popup submit"><div class="inner"><div class="icon"><strong>?</strong></div>';
    $(helpTwo).insertAfter('#id_field_update_and_submitter');
    var helpTwoText = '<table class="popup"><tr><th>Action</th><th>What this means</th></tr><tr><td>Return to Legal</td><td>Form is updated with changes. Legal becomes form owner and is notified.</td></tr><tr><td>Remain with Submitter </td><td>Form is updated; Legal is notified if new comments added. You remain owner of the record.</td></tr><tr><td>Abandon Instruction</td><td>Form status set to Abandoned. Legal is notified.</td></tr><tr><td>Send your communications note</td><td>Form is updated, legal/submitter is notified if you have added a comment to the Comms tab but <strong>NOT</strong> added a comment in the Notes tab.</td></tr></table>';

    $('.help-popup.submit .icon').balloon({
        html: true,
        contents: helpTwoText,
        position: "right",
        css: {
            padding: '20px',
            fontSize: '90%',
            backgroundColor: '#fff',
            opacity: '1',
            color: '#393939'
        }
    });

    var helpSiteType = '<div class="help-popup site-type"><div class="inner"><div class="icon"><strong>?</strong></div>';
    $(helpSiteType).insertAfter('.id_site_field_site_type select');
    var helpSiteTypeText = '<p class="help-popup-para">This Site Type was populated from the information in ElemenT</p>';

    $('.help-popup.site-type .icon').balloon({
        html: true,
        contents: helpSiteTypeText,
        position: "right",
        css: {
            padding: '20px',
            fontSize: '90%',
            backgroundColor: '#fff',
            opacity: '1',
            color: '#393939'
        }
    });

    var helpSaveLoad = '<div class="help-popup sl"><div class="inner"><div class="icon"><strong>?</strong></div>';
    $(helpSaveLoad).insertAfter('.sl-help');
    var helpSaveLoadText = '<p class="help-popup-para">When you save a file it is saved on your computer’s local drive. Re-loaded files can only be retrieved from the computer’s local drive where they were saved. They are not accessible from any other source.</p>';

    $('.help-popup.sl .icon').balloon({
        html: true,
        contents: helpSaveLoadText,
        position: "right",
        css: {
            padding: '20px',
            fontSize: '90%',
            backgroundColor: '#fff',
            opacity: '1',
            color: '#393939'
        }
    });


    
});



// load in the reference if there is an id in the url
$('#id_field_relationship_name').on('chosen:ready', function (){
    loadReference = $.urlParam('id'); // id
    if(loadReference !== null) {
        $('div.id_field_relationship_name .chosen-search-input').val(loadReference).keyup().blur();
        window.setTimeout(function() {
           $('#id_field_relationship_name').val(loadReference).change();
        }, 2000);
    }
});

// fix for side id dropdown 

$('#id_site_field_site_id').mousedown(function(){

    $('.id_site_field_site_id,.id_site_field_name,.id_field_relationship_name').find('label.error').remove();
    $('#id_site_field_site_id,#id_site_field_name,#id_field_relationship_name,#_acl_id_field_relationship_name').removeClass('error');
});


$('label.error:visible').livequery(function(){
    errorParentElement = $(this).closest('.form-element .input');
    $(this).appendTo(errorParentElement);
    // hide one of the duplicates for chosen select 
    $("form label[for='_acl_id_field_relationship_name']").hide();
});

$('.form-element[disabled="disabled"]').livequery(function(){
       $(this).find('input,select,textarea').val('').change(); 
});


// Change field labels for the mortgage fields

$(function(){
    $('.loan-1 label,.loan-2 label,.loan-3 label,.loan-4 label,.loan-5 label').each(function() {
    var text = $(this).text();
    $(this).html(text.replace(' 1', '')
    .replace(' 2', '')
    .replace(' 3', '')
    .replace(' 4', ''));
    });

});

$('#id_field_relationship_name').change(function(){
        window.setTimeout(function() {
            if(!$('#id_field_relationship_name').val()) {
                $('select').change();
            }
        }, 1000);

});