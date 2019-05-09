/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		uuid = NA.modules.uuid;

	NA.utils.comments.createItem.call(NA, uuid(), request.body.message, locals, function (err, item) {
		if (err) {
			response.statusCode = 400;
			return next();
		}

		response.statusCode = 201;
		response.setHeader("Content-Length", 0);
		response.location("/api/comments/" + item.id + "/");
		response.end();
	});
};

