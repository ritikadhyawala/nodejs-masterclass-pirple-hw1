var http = require("http");
var url = require("url");

var server = http.createServer(function (req, res) {
    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var chosenHandler = typeof (router[trimmedPath]) != "undefined" ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
        'trimmedPath': trimmedPath
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
        var payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log("Returning this response: ", statusCode, payloadString);
    });

});

var port = typeof (process.env.PORT) == "string" ? (parseInt(process.env.PORT) > 0 ? process.env.PORT : 3000) : 3000;
server.listen(port, function () {
    console.log('The server is up and running on port ' + port);
});

var handlers = {};
handlers.hello = function (data, callback) {
    callback(200, { "Welcome Message": "Completed the first homework assignment!!!" })
}
handlers.notFound = function (data, callback) {
    callback(404, { "Error": "Route not found" });
}
var router = {
    "hello": handlers.hello
};
