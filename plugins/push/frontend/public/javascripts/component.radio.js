'use strict';

/* jshint undef: true, unused: true */
/* globals m */

if (!window.components) {
	window.components = {};
}

if (!window.components.radio) {
	var count = 0;

	var radio = window.components.radio = {

		controller: function(opts){
			if (!(this instanceof radio.controller)) {
				return new radio.controller(opts);
			}

			this.value = typeof opts.value === 'function' ? opts.value : m.prop(opts.value);
			this.options = m.prop(opts.options.map(window.components.selector.Option));
			this.id = 'comp-radio-' + count++;
		},
		
		view: function(ctrl){
			return m('.comp-radio', ctrl.options().map(function(o){
				var opts = {name: ctrl.id, 
					value: o.value(), 
					onchange: m.withAttr('value', ctrl.value)
				};
				if (('' + ctrl.value()) === ('' + o.value())) {
					opts.checked = 'checked';
				}

				return m('.comp-radio-option', opts.checked ? {class: 'active'} : {}, [
					m('input[type="radio"]', opts), 
					m('label', o.title()), 
					o.desc() ? m('span.help', o.desc()) : '',
					o.view ? o.view() : ''
				]);
			}));
		}
	};
}
