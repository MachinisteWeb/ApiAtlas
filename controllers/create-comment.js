/* jslint node: true */
exports.changeVariations = function (params, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		guid = NA.modules.guid,
		variations = params.variations,
		request = params.request;

	variations.specific.push({
		"id": guid.raw(),
		"message": request.body.message
	});
	fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(variations.specific, null, "    "));

	next(variations);
};