/* jslint node: true, esversion: 6 */
exports.changeVariations = function (params, next) {
	var NA = this,
		variations = params.variations,
		http = NA.modules.http;

	http.get({
  		hostname: "localhost",
	  	port: NA.webconfig.httpPort,
	  	path: "/api/comments/",
	  	agent: false
	}, function (response) {
		var data = "",
			chain = "";
		response.on("data", function (chunk) {
		  	data += chunk;
		});
		response.on('end', function(){
			JSON.parse(data).forEach(function (comment) {
				chain += `<li>
					<h4>
						${comment.id}
					</h4>
					<p>
						${comment.message}
					</p>
				</li>`;
			});
			variations.comments = chain;
			next(variations);
		});
	}).on('error', function () {
		variations.comments = "";
		next(variations);
	});
};