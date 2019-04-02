/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this;

	NA.utils.comments.updateItem.call(NA, locals.params.id, request.body.message, locals, function (err, item) {
		if (err instanceof ReferenceError) {
			return NA.utils.comments.createItem.call(NA, locals.params.id, request.body.message, locals, function (err, item) {
				if (err) {
					response.statusCode = 400;
					return next();
				}

				response.statusCode = 201;
				response.setHeader("Content-Length", 0);
				response.location("/api/contents/" + item.id + "/");
				response.end();
			});
		} else if (err) {
			response.statusCode = 400;
			return next();
		}

		response.statusCode = 204;
		response.setHeader("Content-Length", 0);
		response.location("/api/contents/" + item.id + "/");
		response.end();
	});
};