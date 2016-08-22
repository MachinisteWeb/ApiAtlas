/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.treeOfCategories = require('../../components/controllers/tree-of-categories');

	publics.changeVariation = function (params, mainCallback) {
		var NA = this,
			variation = params.variation,
			mongoose = NA.modules.mongoose,
			Category = mongoose.model('category');

		website.components.treeOfCategories(Category, function (treeOfCategories) {

			variation.specific = treeOfCategories;

			mainCallback(variation);
		});
	};

}(website));

exports.changeVariation = website.changeVariation;