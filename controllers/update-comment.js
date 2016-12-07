/* jslint node: true */
exports.changeVariation = function (params, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		variation = params.variation,
		response = params.response,
		position = -1,
		request = params.request;

	function error () {
		variation.currentRouteParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	if (variation.params && variation.params.idput) {
		[].forEach.call(variation.specific, function (item, i) {
			if (item.id === variation.params.idput) {
				position = i;
			}
		});
		if (position === -1) {
			error();
		}
		variation.specific[position].message = request.body.message;
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(variation.specific, null, "    "));
	} else {
		error();
	}

	next(variation);
};