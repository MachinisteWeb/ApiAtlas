/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		path = NA.modules.path,
		fs = NA.modules.fs,
		uuid = NA.modules.uuid,
		id;

	if (request.body.message) {
		id = uuid.v1();
		locals.specific.push({
			"id": id,
			"message": request.body.message
		});
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
			response.statusCode = 201;
			response.setHeader("Content-Length", 0);
			response.location("/api/comments/" + id + "/");
			response.end();
		});
	} else {
		response.statusCode = 400;
		locals.specific = {
			error: {
				code: 400,
				message: "Bad Request",
				description: "You have not set the `message` variable with `application/x-www-form-urlencoded` or `application/json` format."
			}
		};

		next();
	}

};