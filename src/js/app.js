require.config({
	paths: {
		// DEPENDENCIES
		'jquery': '../../bower_components/jquery/jquery.min'
		, 'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap.min'
		, 'json3': '../../bower_components/json3/lib/json3.min'
		, 'text': '../../bower_components/requirejs-text/text'
		// LIBS
		, 'polyfills': './polyfills'
		, 'tools': './tools'
		, 'slideshow': './slideshow'
		, 'checkbox-checker': './checkbox-checker'
		, 'maths': './maths'
	}
	, shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});

define([
	'exports'
	, 'jquery'
	, 'tools'
	, 'text!../data/data.json'
	// Load dependencies
	, 'polyfills'
	, 'bootstrap'
	, 'json3'
	, 'checkbox-checker'
] , function (App, $, Tools, Data) {
	'use strict';

	// Define the main App module
	App = {
		name: $('body').data('app')
		, module: false
		, data: JSON.parse(Data)
	};

	// Check if we need to load the dedicated module
	for (var i in App.data.app.works) {
		var work = App.data.app.works[i];

		if (work.name == App.name && work.module) {
			App.module = true;
		}

		if (work.works) {
			for (var j in work.works) {
				var subWork = work.works[j];

				if (subWork.name == App.name && subWork.module) {
					App.module = true;
				}
			}
		}
	}

	// Load the dedicated module if required
	if (App.module) {
		require(['work-' + App.name], function () {});
	}

	return App;
});
