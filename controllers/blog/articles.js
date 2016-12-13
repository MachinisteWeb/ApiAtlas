/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.listOfArticles = require('../modules/list-of-articles');
	website.components.markdownRender = require('../modules/markdown-render');
	website.components.extendedFormatDate = require('../modules/extended-format-date');

	publics.changeVariation = function (params, next) {
		var NA = this,
			variation = params.variation,
			mongoose = NA.modules.mongoose,
			marked = NA.modules.marked,
			Article = mongoose.model('article'),
			session = params.request.session;

		variation.backend = {};
		variation.session = session;

		website.components.listOfArticles({
			Article: Article,
			marked: marked,
			markdownRender: website.components.markdownRender,
			session: variation.session,
			extendedFormatDate: website.components.extendedFormatDate,
			variation: variation
		}, function (listOfArticles) {

			variation.specific = listOfArticles;

			next(variation);
		});
	};

}(website));

exports.changeVariation = website.changeVariation;