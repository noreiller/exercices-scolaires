require.config({
	paths: {
		// DEPENDENCIES
		'jquery': '../../bower_components/jquery/jquery.min'
		, 'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap.min'
		, 'text': '../../bower_components/requirejs-text/text'
		// LIBS
		, 'tools': './tools'
		, 'slideshow': './slideshow'
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
	, 'bootstrap'
] , function (app, $, Tools, Data) {
	'use strict';

	// Define the main App module
	var App = {
		name: document.body.dataset.app
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
