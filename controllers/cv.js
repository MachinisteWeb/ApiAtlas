/* jslint node: true */
exports.changeVariations = function (params, next) {
	var NA = this,
		variations = params.variations,
		response = params.response;

	if (variations.params && variations.params.subpart) {
		if (variations.specific[variations.params.subpart]) {
		variations.specific = variations.specific[variations.params.subpart];
		} else {
			variations.routeParameters.statusCode = 302;
			response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
		}
	}

	next(variations);
};