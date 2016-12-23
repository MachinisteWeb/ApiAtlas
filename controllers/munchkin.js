/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this;

	function redirect() {
		locals.routeParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	function check(param, callback) {
		if (locals.params[param]) {
			if (locals.specific[locals.params[param]]) {
				locals.specific = locals.specific[locals.params[param]];
			} else {
				redirect();
			}
		}
		if (callback) {
			callback();
		}
	}

	if (locals.params) {
		check("game", function () {
			check("stack", function () {
				check("type");
			});
		});
	}

	next();
};