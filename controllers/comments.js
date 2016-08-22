/* jslint node: true */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		variation = params.variation,
		response = params.response,
		item;

	if (variation.params && variation.params.id) {
		item = [].filter.call(variation.specific, function (item) {
			return item.id === variation.params.id;
		});
		if (item.length !== 0) {
			variation.specific = item[0];
		} else {
			variation.currentRouteParameters.statusCode = 302;
			response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
		}
	}

	mainCallback(variation);
};