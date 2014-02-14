define([
	'jquery'
], function ($) {
	'use strict';

	/**
	 * Helpers
	 * @return {Tools}
	 */
	var Tools = {
		/**
		 * Generate a random number betwwen the two given ones with number exclusions
		 * @param	{number} min The minimum value
		 * @param	{number} max The maximum value
		 * @param	{array} exclude The excluded numbers
		 * @return {number}		 The random value
		 * @todo	Use exclude
		 */
		random: function (min, max, exclude) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/**
		 * Format an entry to the requested type
		 * @param	{mixed} value The entry
		 * @param	{string} type The requested type
		 * @return {mixed}			 The result
		 */
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

		////////////////////////
		// UNDERSCORE METHODS //
		////////////////////////

		/**
		 * @see http://underscorejs.org/#range
		 */
		, range: function (start, stop, step) {
			if (arguments.length <= 1) {
				stop = start || 0;
				start = 0;
			}
			step = arguments[2] || 1;

			var len = Math.max(Math.ceil((stop - start) / step), 0);
			var idx = 0;
			var range = new Array(len);

			while(idx < len) {
				range[idx++] = start;
				start += step;
			}

			return range;
		}

		/**
		 * @see http://underscorejs.org/#shuffle
		 */
		, shuffle: function (obj) {
			var shuffled = [], rand;
			Tools.each(obj, function (value, index, list) {
				if (index === 0) {
					shuffled[0] = value;
				} else {
					rand = Math.floor(Math.random() * (index + 1));
					shuffled[index] = shuffled[rand];
					shuffled[rand] = value;
				}
			});
			return shuffled;
		}

		/**
		 * @see http://underscorejs.org/#each
		 */
		, each: function (obj, iterator, context) {
			if (obj === null) return;
			if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
				obj.forEach(iterator, context);
			} else if (obj.length === +obj.length) {
				for (var i = 0, l = obj.length; i < l; i++) {
					if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
				}
			} else {
				for (var key in obj) {
					if (_.has(obj, key)) {
						if (iterator.call(context, obj[key], key, obj) === breaker) return;
					}
				}
			}
		}
	};

	return Tools;
});
