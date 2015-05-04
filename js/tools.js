define([
	'jquery'
], function ($) {
	'use strict';

	/**
	 * Helpers
	 * @return {Tools}
	 */
	var Tools = {
		serializeForm: function (formElement) {
			var values = {};

			for (var i = 0; i < formElement.length; i++) {
				if (['INPUT', 'SELECT'].indexOf(formElement[i].tagName) !== -1) {
					if (formElement[i].type === 'radio') {
						if (formElement[i].checked) {
							values[formElement[i].name] = Tools.format(formElement[i].value);
						}
					}
					else if (formElement[i].type === 'checkbox') {
						if (formElement[i].checked) {
							var value = Tools.format(formElement[i].value);

							if (!values[formElement[i].name]) {
								values[formElement[i].name] = value;
							}
							else {
								if (typeof values[formElement[i].name].length === 'undefined') {
									values[formElement[i].name] = [values[formElement[i].name]];
								}

								values[formElement[i].name].push(value);
							}
						}
					}
					else {
						values[formElement[i].name] = Tools.format(formElement[i].value);
					}
				}
			}

			return values;
		}

		/**
		 * Generate a random number betwwen the two given ones with number exclusions
		 * @param	{number} min The minimum value
		 * @param	{number} max The maximum value
		 * @param	{array} exclude The excluded numbers
		 * @return {number}		 The random value
		 * @todo	Use exclude
		 */
		, random: function (min, max, exclude) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/**
		 * Format an entry
		 * @param	{mixed} value The entry
		 * @return {mixed}			 The result
		 */
		, format: function (value) {
			var v;

			try {
				v = JSON.parse(value);
			} catch(e) {
				v = String(value);
			}

			return v;
		}
	};

	return Tools;
});
