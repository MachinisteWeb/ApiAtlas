/* jslint node: true, esversion: 6 */
exports.changeVariation = function (params, mainCallback) {
	var NA = this,
		variation = params.variation,
		http = NA.modules.http;

	http.get({
  		hostname: "www.lesieur.name",
	  	port: 80,
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