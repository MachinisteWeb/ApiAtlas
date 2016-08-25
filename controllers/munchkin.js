/* jslint node: true */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		variation = params.variation,
		response = params.response;

	function redirect() {
		variation.currentRouteParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	function check(param, callback) {
		if (variation.params[param]) {
			if (variation.specific[variation.params[param]]) {
				variation.specific = variation.specific[variation.params[param]];
			} else {
				redirect();
			}
		}
		if (callback) {
			callback();
		}
	}

	if (variation.params) {
		check("game", function () {
			check("stack", function () {
				check("type");
			});
		});
	}

	mainCallback(variation);
};