/* jslint node: true */
exports.changeVariations = function (next, locals, request, response) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		position = -1;

	function error () {
		locals.routeParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	if (locals.params && locals.params.idput) {
		[].forEach.call(locals.specific, function (item, i) {
			if (item.id === locals.params.idput) {
				position = i;
			}
		});
		if (position === -1) {
			error();
		}
		locals.specific[position].message = request.body.message;
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "));
	} else {
		error();
	}

	next();
};