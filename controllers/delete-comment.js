/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		position = -1;

	[].forEach.call(locals.specific, function (item, i) {
		if (item.id === locals.params.id) {
			position = i;
		}
	});
	if (position !== -1) {
		locals.specific.splice(position, 1);
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
			response.statusCode = 204;
			response.setHeader("Content-Length", 0);
			response.end();
		});
	} else {
		response.statusCode = 404;
		locals.specific = {
			error: {
				code: 404,
				message: "Not Found"
			}
		};

		next();
	}
};