import isDev from 'isdev';
import request from 'request'
import http from 'http';
import express from 'express';
import serveStatic from 'serve-static';

import { Config, Dir } from './config';
import { logServerConfig } from './logger';

import { hotMiddleware } from './middleware/hot';
import { isoMiddleware } from './middleware/iso';


const app = express();
const server = http.createServer(app);

// use ejs template engine on express
app
  .set('view engine', 'ejs')
  .set('views', Dir.views);

// loading the hot-middleware
if (isDev) app.use(hotMiddleware);

app.get('/api/search/:query', (req, res) => {
    commitRequest(req.params.query, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
})

var commitRequest = (query, callback) => {
    var headers = {
      'origin': 'https://www.rappad.co',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'accept': '*/*',
    };

    var dataString = `q=${query}`;

    var options = {
        url: 'https://www.rappad.co/beats/search_query',
        method: 'POST',
        headers: headers,
        body: dataString
    };


    request(options, callback);
}

app
  .use('/build', serveStatic(Dir.build))
  .use('/assets', serveStatic(Dir.assets))
  .use('/core', serveStatic(Dir.src))
  .use('/static', serveStatic(Dir.static))
  .use(isoMiddleware);

server
    .listen(process.env.PORT || 5000)
