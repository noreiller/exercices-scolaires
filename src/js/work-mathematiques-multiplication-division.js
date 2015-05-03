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
			operation: 'multiplication'
			, table: Tools.range(1,9)
			, quantity: 5
			, delay: 5
			, allowSame: false
			, allowReversed: false
			, allowDuplicates: false
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
		// update the default parameters with form values
		parameters = $.extend(defaultParameters, Tools.serializeForm($form[0]));

		// generate the operations
		operations = Tools.Maths.generateMultipleOperations(parameters);

		// display the slideshow
		updateSlideshow();
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
