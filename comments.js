// Create web server

// Import modules

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create server

var server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    var query = qs.parse(url.parse(req.url).query);
    console.log(query);
    var date = new Date();
    var time = date.toUTCString();
    console.log(time);

    if (path == '/') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (path == '/comments.json') {
        fs.readFile('./comments.json', function(err, data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
        });
    } else if (path == '/form') {
        fs.readFile('./form.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (path == '/create') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            console.log(post);
            fs.readFile('./comments.json', function(err, data) {
                var comments = JSON.parse(data);
                comments.push(post);
                fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
                    res.writeHead(302, {'Location': '/'});
                    res.end();
                });
            });
        });
    } else if (path == '/delete') {
        fs.readFile('./comments.json', function(err, data) {
            var comments = JSON.parse(data);
            comments.splice(query.index, 1);
            fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
                res.writeHead(302, {'Location': '/'});
                res.end();
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Not Found');
    }
});

// Start server

server.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});
