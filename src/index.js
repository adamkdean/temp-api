var restify = require('restify');

var server = new restify.createServer();
server.use(restify.bodyParser());

server.get('/', function(req, res, next) {
    res.send('200 OK');
});

server.post('/submit', function(req, res, next) {
    var api_key = req.body.api_key,
        t1 = req.body.t1,
        t2 = req.body.t2;

    console.log('process.env.API_KEY: %s', process.env.API_KEY);
    console.log('api_key: %s', api_key);

    if (process.env.API_KEY === undefined || api_key != process.env.API_KEY) {
        res.send('403 FORBIDDEN', process.env.API_KEY === undefined, api_key != process.env.API_KEY);
        return;
    }

    res.send('api %s - t1 %s - t2 %s', api_key, t1, t2);

});

server.listen(process.env.PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
