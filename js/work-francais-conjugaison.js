define([
	'app'
	, 'underscore'
	, 'jquery'
	, 'tools'
	, 'french'
	, 'slideshow'
], function (App, _, $, Tools) {
	'use strict';

	var displayName = 'francais-conjugaison';
	var $form = $('#' + App.name);
	var $restartButton = $('.restart', $form);
	var defaultParameters = {
		tenses: []
		, quantity: 10
		, subjects: _.pluck(Tools.French.getData('subjects'), 'key')
		, verb_groups: []
		, delay: 15
	};
	var parameters = {};
	var sentences = [];

	$form.on('submit', controllerSubmission);
	$restartButton.on('click', controllerRestart);

	function controllerSubmission (event) {
		event.preventDefault();
		newWork();
	}

	function controllerRestart (event) {
		event.preventDefault();

		if (sentences.length < 1) {
			newWork();
		}
		else {
			updateSlideshow();
		}
	}

	function newWork () {
		// update the default parameters with form values
		parameters = $.extend(defaultParameters, Tools.serializeForm($form[0]));

		// generate the sentences
		sentences = Tools.French.generateSubjectVerbSentences(parameters);

		// display the slideshow
		updateSlideshow();
	}

	function updateSlideshow () {
		// reset the slideshow
		Tools.Slideshow.reset(displayName);

		// add each sentence
		$.each(sentences, function (ind, sentence) {
			var $slide = $('<div></div>');
			var text = '';

			text += ('<p class="tense">' + sentence.tense + '</p>');
			text += ('<p><span class="subject">' + sentence.subject + '</span> <span class="verb">' + sentence.verb + '</span></p>');

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
