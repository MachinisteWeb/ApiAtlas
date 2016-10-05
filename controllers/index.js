/* jslint node: true, esversion: 6 */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		variation = params.variation,
		http = NA.modules.http;

	http.get({
  		hostname: "localhost",
	  	port: 7765,
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
			variation.comments = chain;
			mainCallback(variation);
		});
	}).on('error', function () {
		variation.comments = "";
		mainCallback(variation);
	});
};