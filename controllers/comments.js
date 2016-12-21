/* jslint node: true */
exports.changeVariations = function (params, next) {
	var NA = this,
		variations = params.variations,
		response = params.response,
		item;

	if (variations.params && variations.params.id) {
		item = [].filter.call(variations.specific, function (item) {
			return item.id === variations.params.id;
		});
		if (item.length !== 0) {
			variations.specific = item[0];
		} else {
			variations.routeParameters.statusCode = 302;
			response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
		}
	}

	next(variations);
};