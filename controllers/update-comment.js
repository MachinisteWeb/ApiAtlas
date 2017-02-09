/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		position = -1,
		isUuid = NA.modules.isUuid;

	[].forEach.call(locals.specific, function (item, i) {
		if (item.id === locals.params.id) {
			position = i;
		}
	});
	if (position !== -1) {
		if (!request.body.message) {
			response.statusCode = 400;
			locals.specific = {
				error: {
					code: 400,
					message: "Bad Request",
					description: "You have not set the `message` variable with `application/x-www-form-urlencoded` or `application/json` format."
				}
			};

			next();
		} else {
			locals.specific[position].message = request.body.message;
			fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
				response.statusCode = 204;
				response.setHeader("Content-Length", 0);
				response.end();
			});
		}
	} else {
		if (!isUuid(locals.params.id, 1)) {
			response.statusCode = 400;
			locals.specific = {
				error: {
					code: 400,
					message: "Bad Request",
					description: "Your uuid param is not a correct uuid v1."
				}
			};

			next();
		} else if (!request.body.message) {
			response.statusCode = 400;
			locals.specific = {
				error: {
					code: 400,
					message: "Bad Request",
					description: "You have not set the `message` variable with `application/x-www-form-urlencoded` or `application/json` format."
				}
			};

			next();
		} else {
			locals.specific.push({
				"id": locals.params.id,
				"message": request.body.message
			});
			fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
				response.statusCode = 201;
				response.setHeader("Content-Length", 0);
				response.location("/api/contents/" + locals.params.id + "/");
				response.end();
			});
		}
	}
};