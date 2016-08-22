/* jslint node: true */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		variation = params.variation,
		response = params.response,
		position = -1;

	function error () {
		variation.currentRouteParameters.statusCode = 302;
		response.setHeader("Location", NA.webconfig.urlRelativeSubPath);
	}

	if (variation.params && variation.params.id) {
		[].forEach.call(variation.specific, function (item, i) {
			if (item.id === variation.params.id) {
				position = i;
			}
		});
		if (position === -1) {
			error();
		}
		variation.specific.splice(position, 1);
		fs.writeFile(path.join(NA.websitePhysicalPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(variation.specific, null, "    "));
	} else {
		error();
	}

	mainCallback(variation);
};