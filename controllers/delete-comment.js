/* jslint node: true */
exports.changeVariations = function (params, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		variations = params.variations,
		response = params.response,
		position = -1;

	function error () {
		variations.routeParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	if (variations.params && variations.params.id) {
		[].forEach.call(variations.specific, function (item, i) {
			if (item.id === variations.params.id) {
				position = i;
			}
		});
		if (position === -1) {
			error();
		}
		variations.specific.splice(position, 1);
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(variations.specific, null, "    "));
	} else {
		error();
	}

	next(variations);
};