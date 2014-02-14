define([
	'app'
	, 'jquery'
	, 'tools'
	, 'maths'
	, 'slideshow'
], function (App, $, Tools) {
	'use strict';

	var
		$form = $('#' + App.name)
		, $restartButton = $('.restart', $form)
		, defaultParameters = {
			operation: {
				type: 'string'
				, value: 'multiplication'
			}
			, table: {
				type: 'number'
				, value: 0
			}
			, quantity: {
				type: 'number'
				, value: 5
			}
			, delay: {
				type: 'number'
				, value: 5
			}
			, allowSame: {
				type: 'boolean'
				, value: true
			}
			, allowReversed: {
				type: 'boolean'
				, value: false
			}
			, allowDuplicates: {
				type: 'boolean'
				, value: false
			}
		}
		, parameters = {}
		, operations = []
	;

	$form.on('submit', controllerSubmission);
	$restartButton.on('click', controllerRestart);

	function controllerSubmission (event) {
		event.preventDefault();
		newWork();
	}

	function controllerRestart (event) {
		event.preventDefault();

		if (operations.length < 1) {
			newWork();
		}
		else {
			updateSlideshow();
		}
	}

	function newWork () {
		updateParameters();
		operations = Tools.Maths.generateMultipleOperations(parameters);
		updateSlideshow();
	}

	function updateParameters () {
		// reset the parameters
		parameters = {};

		// update the parameters with form values
		$.each($form.serializeArray(), function (ind, field) {
			if (defaultParameters[field.name]) {
				parameters[field.name] = Tools.format(field.value, defaultParameters[field.name].type);
			}
		});

		// update the missing parameters with default ones
		$.each(defaultParameters, function (ind, param) {
			if (!parameters[ind]) {
				parameters[ind] = defaultParameters[ind].value;
			}
		});

		// if the table param is set and duplicates are not allowed, ensure
		// that the max is at least the quantity
		if (
			(!parameters.allowDuplicates || !parameters.allowReversed)
			&& parameters.table > 0
		) {
			if (parameters.allowSame) {
				parameters.max = parameters.quantity;
			}
			else {
				parameters.max = parameters.quantity + 1;
			}
		}
	}

	function updateSlideshow () {
		// reset the slideshow
		Tools.Slideshow.reset();

		// add each operation
		$.each(operations, function (ind, operation) {
			var
				$slide = $('<div></div>')
				, text = ''
			;

			if (operation.details.operation == '/') {
				text += operation.details.result;
			}
			else {
				text += operation.details.left;
			}

			text += operation.details.operation;

			text += operation.details.right;

			$slide.html(text);
			$slide.addClass('item');

			// add the active className to the first slide
			if (Number(ind) === 0) {
				$slide.addClass('active');
			}

			Tools.Slideshow.addSlide($slide);
		});

		Tools.Slideshow.show(parameters.delay);
	}
});
