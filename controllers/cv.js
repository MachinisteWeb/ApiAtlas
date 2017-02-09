/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this;

	if (locals.params && locals.params.subpart) {
		if (locals.specific[locals.params.subpart]) {
		locals.specific = locals.specific[locals.params.subpart];
		} else {
			response.statusCode = 302;
			response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
		}
	}

	next();
};