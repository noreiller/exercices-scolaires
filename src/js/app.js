require.config({
	paths: {
		// DEPENDENCIES
		'underscore': '../../node_modules/underscore/underscore-min'
		, 'jquery': '../../node_modules/jquery/dist/jquery.min'
		, 'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min'
		, 'json3': '../../node_modules/json3/lib/json3'
		, 'text': '../../node_modules/requirejs-text/text'
		// LIBS
		, 'polyfills': './polyfills'
		, 'tools': './tools'
		, 'slideshow': './slideshow'
		, 'checkbox-checker': './checkbox-checker'
		, 'sub-checkbox': './sub-checkbox'
		, 'maths': './maths'
		, 'french': './french'
	}
	, shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});

define([
	'exports'
	, 'underscore'
	, 'jquery'
	, 'tools'
	, 'text!../data/data.json'
	// Load dependencies
	, 'polyfills'
	, 'bootstrap'
	, 'json3'
	, 'checkbox-checker'
	, 'sub-checkbox'
] , function (App, _, $, Tools, Data) {
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
