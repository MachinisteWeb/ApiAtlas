/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.mongoose = require('./modules/mongoose');

	publics.setModules = function () {
		var NA = this,
			path = NA.modules.path;

		NA.modules.cookie = require('cookie');
		NA.modules.mongoose = require('mongoose');
		NA.modules.RedisStore = require('connect-redis');
		NA.modules.marked = require('marked');
		NA.modules.guid = require('guid');
		NA.modules.common = require(path.join(NA.serverPath, NA.webconfig.variationsRelativePath, 'common.json'));
	};

	publics.setConfigurations = function (next) {
		var NA = this,
			mongoose = NA.modules.mongoose;

		//website.components.mongoose.initialisation(mongoose, 'mongodb://127.0.0.1:27017/blog', function (mongoose) {
			publics.mongooseSchemas(mongoose);
			next();
		//});
	};

	publics.mongooseSchemas = function (mongoose) {
		publics.schemas = {};

		publics.schemas.article = require('../models/Article');
		publics.schemas.category = require('../models/Category');

		mongoose.model('article', website.schemas.article, 'article');
		mongoose.model('category', website.schemas.category, 'category');
	};

	publics.setSessions = function (next) {
        var NA = this,
        	session = NA.modules.session,
        	RedisStore = NA.modules.RedisStore(session);

        NA.sessionStore = new RedisStore();

		next();
	};

}(website));

exports.setModules = website.setModules;
exports.setSessions = website.setSessions;
exports.setConfigurations = website.setConfigurations;
exports.changeVariation = website.changeVariation;