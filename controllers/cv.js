/* jslint node: true */
exports.changeVariation = function (params, next) {
	var NA = this,
		variation = params.variation,
		response = params.response;

	if (variation.params && variation.params.subpart) {
		if (variation.specific[variation.params.subpart]) {
		variation.specific = variation.specific[variation.params.subpart];
		} else {
			variation.currentRouteParameters.statusCode = 302;
			response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
		}
	}

	next(variation);
};