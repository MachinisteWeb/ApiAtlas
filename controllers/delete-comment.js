/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this;

	NA.utils.comments.deleteItem.call(NA, locals.params.id, locals, function (err) {
		if (err) {
			response.statusCode = 404;
			return next();
		}

		response.statusCode = 204;
		response.setHeader("Content-Length", 0);
		response.end();
	});
};