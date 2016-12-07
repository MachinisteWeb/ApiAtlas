/* jslint node: true */
exports.changeVariation = function (params, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		guid = NA.modules.guid,
		variation = params.variation,
		request = params.request;

	variation.specific.push({
		"id": guid.raw(),
		"message": request.body.message
	});
	fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(variation.specific, null, "    "));

	next(variation);
};