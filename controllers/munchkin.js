/* jslint node: true */
exports.changeVariations = function (params, next) {
	var NA = this,
		variations = params.variations,
		response = params.response;

	function redirect() {
		variations.routeParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	function check(param, callback) {
		if (variations.params[param]) {
			if (variations.specific[variations.params[param]]) {
				variations.specific = variations.specific[variations.params[param]];
			} else {
				redirect();
			}
		}
		if (callback) {
			callback();
		}
	}

	if (variations.params) {
		check("game", function () {
			check("stack", function () {
				check("type");
			});
		});
	}

	next(variations);
};