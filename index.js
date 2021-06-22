const projects = require('./data-store');
const http = require('http');
const async = require('async');
let server;

const requestListener = async function(req, res) {
  var url = req.url;

  if (url && url.indexOf('/projects/' !== -1) && req.method === 'GET') {
    console.log(url.split('/'))
    var badMsg = {
      'message': 'BAD REQUEST'
    };
    if (url && url.split('/') && url.split('/')[2] && typeof(url.split('/')[2]) == 'number') {
      var id = parseInt(url.split('/')[2]);
      var result = await projects.filter(project => project.id == id);
    }
    if(result && result.length > 0){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end('BAD REQUEST');
    }
  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end('BAD REQUEST');
  }
}

server = http.createServer(requestListener);
server.listen(8000, function() {
  console.log("server start at port 8000");
});


module.exports = server;    