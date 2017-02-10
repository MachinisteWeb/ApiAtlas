function badRequest(message, locals) {
	var error = new Error(message);
	locals.specific = {
		error: {
			code: 400,
			message: "Bad Request",
			description: error.message
		}
	};
	return error;
}

function emptyRequest(locals) {
	var error = new ReferenceError("This item does not exist.");
	locals.specific = {
		error: {
			code: 404,
			message: "Not Found",
			description: error.message
		}
	};
	return error;
}

exports.createItem = function (id, message, locals, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		isUuid = NA.modules.isUuid,
		item;

	if (!isUuid(id, 1)) {
		next(badRequest("Your uuid param is not a correct uuid v1.", locals));
	} else if (!message) {
		next(badRequest("You have not set the `message` variable with `application/x-www-form-urlencoded` or `application/json` format.", locals));
	} else {
		item = {
			"id": id,
			"message": message
		};
		locals.specific.push(item);
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
			next(null, item);
		});
	}
};

exports.updateItem = function (id, message, locals, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		position = -1,
		error;

	[].forEach.call(locals.specific, function (item, i) {
		if (item.id === id) {
			position = i;
		}
	});
	if (position !== -1) {
		if (!message) {
			next(badRequest("You have not set the `message` variable with `application/x-www-form-urlencoded` or `application/json` format.", locals));
		} else {
			locals.specific[position].message = message;
			fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
				next(null);
			});
		}
	} else {
		next(emptyRequest(locals));
	}
};

exports.deleteItem = function (id, locals, next) {
	var NA = this,
		fs = NA.modules.fs,
		path = NA.modules.path,
		position = -1;

	[].forEach.call(locals.specific, function (item, i) {
		if (item.id === id) {
			position = i;
		}
	});
	if (position !== -1) {
		locals.specific.splice(position, 1);
		fs.writeFile(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, "comments.json"), JSON.stringify(locals.specific, null, "    "), function () {
			next(null);
		});
	} else {
		next(emptyRequest(locals));
	}
};