/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.treeOfCategories = require('../modules/tree-of-categories');

	publics.changeVariations = function (next, locals) {
		var NA = this,
			mongoose = NA.modules.mongoose,
			Category = mongoose.model('category');

		website.components.treeOfCategories(Category, function (treeOfCategories) {

			locals.specific = treeOfCategories;

			next();
		});
	};

}(website));

exports.changeVariations = website.changeVariations;