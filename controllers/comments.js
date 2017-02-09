/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		item;

	if (locals.params && locals.params.id) {
		item = [].filter.call(locals.specific, function (item) {
			return item.id === locals.params.id;
		});
		if (item.length !== 0) {
			locals.specific = item[0];
		} else {
			response.statusCode = 404;
			locals.specific = {
				error: {
					code: 404,
					message: "Not Found"
				}
			};
		}
	}

	next();
};