var restify = require('restify'),
    moment = require('moment');

var server = new restify.createServer(),
    connectionString = proccess.env.DATABASE_URL || throw 'no database URL',
    client, query, sql;

server.use(restify.bodyParser());

server.get('/', function(req, res, next) {
    res.send('200 OK', process.env);
});

server.post('/submit', function(req, res, next) {
    var api_key = req.body.api_key,
        t1 = req.body.t1 || 0,
        t2 = req.body.t2 || 0,
        datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (process.env.API_KEY === undefined || api_key != process.env.API_KEY) {
        res.send('403 FORBIDDEN');
        return;
    }

    sql = "INSERT INTO temperature(datetime, t1, t2) VALUES ('" + datetime + "', '" + t1 + "', '" + t2 + "')";
    client = new pg.Client(connectionString);
    client.connect();
    query = client.query(sql);
    query.on('end', function() {
        client.end();

        res.send('200 OK - recorded ' + t1 + ', ' + t2);
    })
});

server.listen(process.env.PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
