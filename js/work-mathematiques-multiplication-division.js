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
		for (var i in defaultParameters) {
			var
				inputElements = document.querySelectorAll('[name=' + i + ']')
				, inputElement = inputElements[0]
			;

			if (
				inputElement.tagName === 'INPUT'
				&& ['radio', 'checkbox'].indexOf(inputElement.type) !== -1
			) {
				if (inputElements.length < 2 && inputElement.checked) {
					parameters[i] = Tools.format(inputElement.value || defaultParameters[i].value, defaultParameters[i].type);
				}
				else if (inputElements.length < 2 && !inputElement.checked) {
					if (defaultParameters[i].type == 'boolean') {
						parameters[i] = !Tools.format(inputElement.value || defaultParameters[i].value, defaultParameters[i].type);
					}
					else {
						delete parameters[i];
					}
				}
				else {
					parameters[i] = defaultParameters[i].value;

					for (var j = 0; j < inputElements.length; j++) {
						if (inputElements[j].checked) {
							parameters[i] = Tools.format(inputElements[j].value || defaultParameters[i].value, defaultParameters[i].type);
						}
					}
				}
			}
			else {
				parameters[i] = Tools.format(inputElement.value || defaultParameters[i].value, defaultParameters[i].type);
			}
		}

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
		window.console.log(parameters);
	}

	function updateSlideshow () {
		// reset the slideshow
		Tools.Slideshow.reset();

		// add each operation
		for (var i in operations) {
			var
				$slide = $('<div></div>')
				, text = ''
			;

			if (operations[i].details.operation == '/') {
				text += operations[i].details.result;
			}
			else {
				text += operations[i].details.left;
			}

			text += operations[i].details.operation;

			text += operations[i].details.right;

			$slide.html(text);
			$slide.addClass('item');

			// add the active className to the first slide
			if (Number(i) === 0) {
				$slide.addClass('active');
			}

			Tools.Slideshow.addSlide($slide);
		}

		Tools.Slideshow.show(parameters.delay);
	}
});
