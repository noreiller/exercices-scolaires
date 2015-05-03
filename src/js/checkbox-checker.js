define([
	'app'
	, 'jquery'
	, 'tools'
], function (App, $, Tools) {

	// PUBLIC CLASS DEFINITION
	// =======================

	var CheckboxChecker	 = function (el) {};

	CheckboxChecker.prototype.toggle = function (e) {
		var $inputs = $(this).parents('.form-group:first').find('input[type=checkbox]');

		$inputs.each(function (ind, el) {
			$(el).prop('checked', !$(el).prop('checked'));
		});
	};

	CheckboxChecker.prototype.uncheck = function (e) {
		var $inputs = $(this).parents('.form-group:first').find('input[type=checkbox]');

		$inputs.each(function (ind, el) {
			$(el).prop('checked', false);
		});
	};

	CheckboxChecker.prototype.check = function (e) {
		var $inputs = $(this).parents('.form-group:first').find('input[type=checkbox]');

		$inputs.each(function (ind, el) {
			$(el).prop('checked', true);
		});
	};


	// PLUGIN DEFINITION
	// =================

	var old = $.fn.checkboxChecker;

	$.fn.checkboxChecker = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bs.checkbox-checker');

			if (!data) $this.data('bs.checkbox-checker', (data = new CheckboxChecker(this)));
			if (typeof option == 'string') data[option].call($this);
		});
	};

	$.fn.checkboxChecker.Constructor = CheckboxChecker;


	// NO CONFLICT
	// ===========

	$.fn.checkboxChecker.noConflict = function () {
		$.fn.checkboxChecker = old;
		return this;
	};


	// DATA-API
	// ========

	$(document).on('click.bs.checkbox-checker.data-api', '[data-toggle="checkbox-checker"]', function (e) {
		$(this).checkboxChecker($(this).attr('data-option') || 'toggle');
	});

	return $.fn.checkboxChecker;
});
