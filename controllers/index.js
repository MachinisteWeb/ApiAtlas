/* jslint node: true, esversion: 6 */
exports.changeVariations = function (next, locals) {
	var NA = this,
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
			locals.comments = chain;
			next();
		});
	}).on('error', function () {
		locals.comments = "";
		next();
	});
};