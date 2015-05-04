define([
	'app'
	, 'underscore'
	, 'jquery'
	, 'tools'
], function (App, _, $, Tools) {
	'use strict';

	var Module = function () {
		this.operations = {
			'multiplication': {
				label: 'x'
				, op: '*'
			}
			, 'division': {
				label: '/'
				, op: '/'
			}
		};
	};

	Module.prototype.generateMultipleOperations = function (options) {
		var defaults = {
			// the quantity of operations
			quantity: 5
			// allow operations duplicates
			, allowDuplicates: false
			// allow operations duplicates when figures or number are reversed
			, allowReversed: false
			// @see also options in this.generateSingleOperation
		};

		if (typeof options.table === 'number') {
			options.table = [options.table];
		}

		options = $.extend({}, defaults, options || {});

		var operations = [];
		var tmp = [];
		var max = 9 * options.table.length;

		// Check requested quantity when no duplicates
		if (!options.allowDuplicates) {
			if (!options.allowSame) {
				max -= (options.table.length);
			}

			if (!options.allowReversed) {
				max -= (options.table.length * (options.table.length + 1) * 0.5 - options.table.length);
			}
		}

		for (var i = 0; i < Number(options.quantity); i++) {
			var operation = this.generateSingleOperation(options);

			// generate an operation even if it's a reversed duplicate
			if (!options.allowDuplicates && options.allowReversed) {
				while (tmp.indexOf(operation.computed) !== -1) {
					operation = this.generateSingleOperation(options);
				}
			}
			// generate an operation even if it's a regular duplicate
			else if (options.allowDuplicates && !options.allowReversed) {
				while (tmp.indexOf(operation.computedReversed) !== -1) {
					operation = this.generateSingleOperation(options);
				}
			}
			// generate an unique operation
			else if (!options.allowDuplicates && !options.allowReversed)  {
				while (
					tmp.indexOf(operation.computed) !== -1
					&& tmp.indexOf(operation.computedReversed) !== -1
				) {
					operation = this.generateSingleOperation(options);
				}
			}

			operations.push(operation);

			tmp.push(operation.computed);

			if (!options.allowReversed) {
				tmp.push(operation.computedReversed);
			}
		}

		return operations;
	};

	Module.prototype.generateSingleOperation = function (options) {
		var defaults = {
			// the figure table, an array of integers from 1 to 9
			table: _.range(1,9)
			// the operation, choose between 'multiplication' and 'division'
			, operation: 'multiplication'
			// the minimum figure or number
			, min: 1
			// the maximum figure or number
			, max: 9
			// allow the same figure or number in the operation
			, allowSame: true
		};

		options = $.extend(defaults, options || {});

		var details = {
			left: options.table.length === 1
				? options.table[0]
				: options.table[Tools.random(0, options.table.length - 1)]
			, right: Tools.random(options.min, options.max)
			, operation: this.operations[options.operation].label
		};

		if (!options.allowSame) {
			while (details.right === details.left) {
				details.right = Tools.random(options.min, options.max, [details.left]);
			}
		}

		operation = formatOperation(details);

		return operation;
	};

	function formatOperation (details) {
		var operation = {
			details: details
			, computed: ''
			, computedReversed: ''
		};

		if (!details.result) {
			operation.details.result = details.left * details.right;
		}

		operation.computed =
			details.left
			+ details.operation
			+ details.right
			+ '='
			+ operation.details.result
		;

		operation.computedReversed =
			details.right
			+ details.operation
			+ details.left
			+ '='
			+ operation.details.result
		;

		return operation;
	}

	Tools.Maths = new Module();

	return Tools.Maths;
});
