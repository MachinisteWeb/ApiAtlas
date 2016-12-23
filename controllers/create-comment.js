/* jslint node: true */
exports.changeVariations = function (next, locals, request) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		guid = NA.modules.guid;

	locals.specific.push({
		"id": guid.raw(),
		"message": request.body.message
	});
	fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "));

	next();
};