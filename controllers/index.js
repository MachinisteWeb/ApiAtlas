/* jslint node: true, esversion: 6 */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		variation = params.variation,
		http = NA.modules.http,
		chain = "";

	http.get({
  		hostname: "www.lesieur.name",
	  	port: 80,
	  	path: "/api/comments/",
	  	agent: false
	}, function (response) {
		response.on("data", function (chunk) {
			JSON.parse(chunk).forEach(function (comment) {
				chain += `<div>
					<h4>
						${comment.id}
					</h4>
					<p>
						${comment.message}
					</p>
				</div>`;
			});

			variation.comments = chain;
			mainCallback(variation);
		});
	}).on('error', function () {
		variation.commentsList = "";
		mainCallback(variation);
	});
};