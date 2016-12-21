/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.treeOfCategories = require('../modules/tree-of-categories');

	publics.changeVariations = function (params, next) {
		var NA = this,
			variations = params.variations,
			mongoose = NA.modules.mongoose,
			Category = mongoose.model('category');

		website.components.treeOfCategories(Category, function (treeOfCategories) {

			variations.specific = treeOfCategories;

			next(variations);
		});
	};

}(website));

exports.changeVariations = website.changeVariations;