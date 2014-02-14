define([
	'app'
	, 'jquery'
	, 'tools'
	, 'text!../tpl/modal-fullscreen.html'
	, 'text!../tpl/carousel.html'
	, 'text!../tpl/carousel-counter.html'
], function (App, $, Tools, ModalTpl, CarouselTpl, CarouselCounterTpl) {
	'use strict';

	var Module = function () {
		this.initModal();
		this.initCarousel();
	};

	Module.prototype.initModal = function () {
		// set the modal wrapper
		this.$modal = $(ModalTpl).attr('id', 'slideshow');

		// add the modal into the page
		$('body').append(this.$modal);

		// update the modal references
		this.$modalTitle = $('.modal-title', this.modal);
		this.$modalInner = $('.modal-body', this.modal);
	};

	Module.prototype.initCarousel = function () {
		// add the carousel into the modal
		this.$modalInner.html(CarouselTpl);
		this.$modalTitle.html(CarouselCounterTpl);

		// update the carousel references
		this.$carousel = $('.carousel', this.modal);
		this.$carouselInner = $('.carousel-inner', this.carousel);
		this.$carouselIndex = $('.carousel-index', this.modal);
		this.$carouselCounter = $('.carousel-count', this.modal);
	};

	Module.prototype.getIndex = function () {
		return $('.item.active', this.$carouselInner).index();
	};

	Module.prototype.getLength = function () {
		return $('.item', this.$carouselInner).length;
	};

	Module.prototype.addSlide = function (slide) {
		this.$carouselInner.append(slide);
		this.update();
	};

	Module.prototype.update = function () {
		this.$carouselIndex.html(this.getIndex() + 1);
		this.$carouselCounter.html(this.getLength());
	};

	Module.prototype.show = function (delay) {
		var self = this;

		// show the slideshow
		this.$modal.modal('show');

		// start the carousel with options
		this.$carousel.carousel({
			interval: delay || 5000
			, pause: false
		});

		// listen events
		this.$carousel.on('slide.bs.carousel', checkSlideshowEnd);
		this.$carousel.on('slid.bs.carousel', updateSlideshowInfos);
		this.$modal.one('hide.bs.modal', hideSlideshow);

		function checkSlideshowEnd () {
			if (self.getIndex() + 1 == self.getLength()) {
				hideSlideshow();
			}
		}

		function updateSlideshowInfos () {
			self.update();
		}

		function hideSlideshow () {
			// cancel events listeners
			self.$carousel.off('slide.bs.carousel', checkSlideshowEnd);
			self.$carousel.off('slid.bs.carousel', updateSlideshowInfos);

			self.hide();
		}
	};

	Module.prototype.hide = function () {
		// pause and reset slideshow
		this.$carousel.carousel('pause');
		this.$carousel.carousel(0);

		// destroy carousel
		this.$carousel.removeData('bs.carousel');
		this.$modalInner.empty();

		// hide the modal
		this.$modal.modal('hide');

		// update
		this.update();
	};

	Module.prototype.reset = function () {
		// reset the carousel html
		this.initCarousel();

		// update the infos
		this.update();
	};

	Tools.Slideshow = new Module();

	return Tools.Slideshow;
});
