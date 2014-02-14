(function () {
	// 'use strict';

	/**
	 * Generate a school work
	 */
	var SchoolWork = function () {
		this.debug = true;
		this.controllerId = "mathematics-multiplication-division";
		this.fullscreenId = "sw-fullscreen-wrapper";
		this.slideshowId = "sw-fullscreen-presentation";

		this.MathOperations = {
			'multiplication': {
				label: 'x'
				, op: '*'
				, min: 1
				, max: 9
			}
			, 'division': {
				label: '/'
				, op: '/'
				, min: 1
				, max: 9
			}
		};
		this.parameters = {
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
			, allowSameFigure: {
				type: 'boolean'
				, value: false
			}
			, allowReversedFigure: {
				type: 'boolean'
				, value: false
			}
		};

		this.currentParameters = {};
		this.currentSerie = [];

		return this;
	};

	/**
	 * Init the school work
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.init = function () {
		this.controllerElement = document.getElementById(this.controllerId);
		this.slideshowElement = document.getElementById(this.slideshowId);
		this.fullscreenElement = document.getElementById(this.fullscreenId);

		this.listenController();

		return this;
	};

	/**
	 * Listen to the controller form submission
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.listenController = function () {
		var self = this;

		this.controllerElement.addEventListener('submit', controllerSubmission);
		document.querySelector('#' + this.controllerId + ' .sw-restart').addEventListener('click', controllerRestart);

		function controllerSubmission (event) {
			event.preventDefault();
			self.newWork();
		}

		function controllerRestart (event) {
			event.preventDefault();

			if (self.currentSerie.length < 1) {
				self.newWork();
			}
			else {
				self.showSlideshow();
			}
		}

		return this;
	};

	/**
	 * Load a new serie
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.newWork = function () {
		this.updateParameters();
		this.generateSerie();
		this.updateSlideshow();

		return this;
	};

	/**
	 * Updates the parameters with the new ones
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.updateParameters = function () {
		for (var i in this.parameters) {
			var
				inputElements = document.querySelectorAll('[name=' + i + ']')
				, inputElement = inputElements[0]
			;

			if (
				inputElement.tagName === 'INPUT'
				&& ['radio', 'checkbox'].indexOf(inputElement.type) !== -1
			) {
				if (inputElements.length < 2 && inputElement.checked) {
					this.currentParameters[i] = Tools.format(inputElement.value || this.parameters[i].value, this.parameters[i].type);
				}
				else {
					this.currentParameters[i] = this.parameters[i].value;

					for (var j = 0; j < inputElements.length; j++) {
						if (inputElements[j].checked) {
							this.currentParameters[i] = Tools.format(inputElements[j].value || this.parameters[i].value, this.parameters[i].type);
						}
					}
				}
			}
			else {
				this.currentParameters[i] = Tools.format(inputElement.value || this.parameters[i].value, this.parameters[i].type);
			}
		}

		return this;
	};

	/**
	 * Generate a serie of single operation
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.generateSerie = function () {
		this.currentSerie = [];
		this.tmpSerie = [];

		for (var i = 0; i < Number(this.currentParameters.quantity); i++) {
			var operation = this.generateSingleOperation();

			this.currentSerie.push(operation.details);

			this.tmpSerie.push(operation.computed);
			if (!this.currentParameters.allowReversedFigure) {
				this.tmpSerie.push(operation.computedR);
			}

			if (this.debug && window.console) {
				console.info(operation.computed);
			}
		}

		return this;
	};

	/**
	 * Generate a single operation of a serie
	 * @return {Object}
	 */
	SchoolWork.prototype.generateSingleOperation = function () {
		var operation = {
			details: {
				left: this.currentParameters.table > 0
					? this.currentParameters.table
					: Tools.random(
						this.MathOperations[this.currentParameters.operation].min
						, this.MathOperations[this.currentParameters.operation].max
					)
				, right: Tools.random(
					this.MathOperations[this.currentParameters.operation].min
					, this.MathOperations[this.currentParameters.operation].max
				)
				, result: 0
			}
			, computed: ''
			, computedR: ''
		};

		if (!this.currentParameters.allowSameFigure) {
			while (operation.details.right === operation.details.left) {
				operation.details.right = Tools.random(
					this.MathOperations[this.currentParameters.operation].min
					, this.MathOperations[this.currentParameters.operation].max
				);
			}
		}

		operation.details.result = operation.details.left * operation.details.right;
		operation.computed =
			operation.details.left
			+ this.MathOperations[this.currentParameters.operation].label
			+ operation.details.right
			+ '='
			+ operation.details.result
		;
		operation.computedR =
			operation.details.right
			+ this.MathOperations[this.currentParameters.operation].label
			+ operation.details.left
			+ '='
			+ operation.details.result
		;

		while (this.tmpSerie.indexOf(operation.computed) !== -1) {
			operation = this.generateSingleOperation();
		}

		return operation;
	};

	/**
	 * Update the slideshow
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.updateSlideshow = function () {
		// hide the slideshow
		// $(this.fullscreenElement).modal('hide');

		// stop the slideshow
		// $(this.slideshowElement).carousel('pause');

		// empty the slideshow
		$(this.slideshowElement).find('.item').remove();

		// add each operation of the serie
		for (var i in this.currentSerie) {
			var
				slide = document.createElement('DIV')
				, text = ''
			;

			slide.classList.add('item');

			// add the active className to the first slide
			if (i === 0) {
				slide.classList.add('active');
			}

			if (this.currentParameters.operation == 'division') {
				text += this.currentSerie[i].result;
			}
			else {
				text += this.currentSerie[i].left;
			}

			text += this.MathOperations[this.currentParameters.operation].label;

			text += this.currentSerie[i].right;

			slide.appendChild(document.createTextNode(text));
			$('.carousel-inner', this.slideshowElement).append(slide);
		}

		// update the infos
		document.getElementById('sw-fullscreen-presentation-index').innerHTML = '1';
		document.getElementById('sw-fullscreen-presentation-length').innerHTML = this.currentParameters.quantity;

		this.showSlideshow();

		return this;
	};

	/**
	 * Show the slideshow
	 * @return {SchoolWork}
	 */
	SchoolWork.prototype.showSlideshow = function () {
		var self = this;

		// show the slideshow
		$(this.fullscreenElement).modal('show');

		// update the slideshow options and start it
		$(this.slideshowElement).carousel({
			interval: this.currentParameters.delay
			, pause: false
		});

		$(this.slideshowElement).on('slide.bs.carousel', checkSlideshowEnd);
		$(this.slideshowElement).on('slid.bs.carousel', updateSlideshowInfos);
		$(this.fullscreenElement).one('hide.bs.modal', hideSlideshow);

		var now = Date.now();

		function checkSlideshowEnd () {
			window.console.log('slide', Date.now() - now);
			if ($('.active', this).index() + 1 == self.currentSerie.length) {
				$(self.fullscreenElement).modal('hide');
			}
		}

		function updateSlideshowInfos () {
			document.getElementById('sw-fullscreen-presentation-index').innerHTML = $('.active', this).index() + 1;
		}

		function hideSlideshow () {
			window.console.log('hideSlideshow', Date.now() - now);

			// pause and reset slideshow
			$(self.slideshowElement).carousel('pause');
			$(self.slideshowElement).carousel(0);

			// remove listeners
			$(self.slideshowElement).off('slide.bs.carousel', checkSlideshowEnd);
			$(self.slideshowElement).off('slid.bs.carousel', updateSlideshowInfos);

			// destroy carousel
			$(self.slideshowElement).removeData('bs.carousel');
		}
	};

	/**
	 * Helpers
	 * @return {Tools}
	 */
	var Tools = {
		/**
		 * Generate a random number betwwen the two given ones
		 * @param  {number} min The minimum value
		 * @param  {number} max The maximum value
		 * @return {number}     The random value
		 */
		random: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		, format: function (value, type) {
			var v;

			switch (type) {
				case 'string':
					v = String(value);
					break;
				default:
					v = JSON.parse(value);
					break;
			}

			return v;
		}
	};

	// Init a new school work
	window.SchoolWork = new SchoolWork().init();
}());
