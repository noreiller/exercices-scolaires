define([
	'app'
	, 'jquery'
	, 'tools'
], function (App, $, Tools) {

	// PUBLIC CLASS DEFINITION
	// =======================

	var subCheckbox	 = function (element) {
		this.$element = $(element);
		this.$master = this.$element.find('input[type="checkbox"][sub-checkbox="master"]:first');

		if (!this.$master.length) {
			this.$master = this.$element.find('input[type="checkbox"]:first');
		}

		this.enable();
	};

	subCheckbox.prototype.check = function (event) {
		var enabled = this.$master.is(':checked');

		this.$element.find('input[type="checkbox"]').not(this.$master).each(function (ind, el) {
			if (enabled) {
				$(el)
					.removeAttr('disabled')
					.prop('checked', true)
				;
			}
			else {
				$(el)
					.prop('checked', false)
					.attr('disabled', 'disabled')
				;
			}
		});
	};

	subCheckbox.prototype.enable = function (event) {
		this.disable();
		this.$master.on('change', $.proxy(this.check, this));
		this.check();
	};

	subCheckbox.prototype.disable = function (event) {
		this.$master.off('change', $.proxy(this.check, this));
	};


	// PLUGIN DEFINITION
	// =================

	var old = $.fn.subCheckbox;

	$.fn.subCheckbox = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bs.sub-checkbox');

			if (!data) $this.data('bs.sub-checkbox', (data = new subCheckbox(this)));
			if (typeof option == 'string') data[option].call($this);
		});
	};

	$.fn.subCheckbox.Constructor = subCheckbox;


	// NO CONFLICT
	// ===========

	$.fn.subCheckbox.noConflict = function () {
		$.fn.subCheckbox = old;
		return this;
	};


	// DATA-API
	// ========

	$(window).on('load', function () {
		$('[data-ride="sub-checkbox"]').each(function () {
			var $subCheckbox = $(this);
			$subCheckbox.subCheckbox($subCheckbox.data());
		});
	});

	return $.fn.subCheckbox;
});
