var http = require('http');
var dt = require('./myDate');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {	  
		fs.readFile('../accordian.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.write("The date and time is currently --- : " + dt.myDateTime());
		res.write("URL : " + req.url + " --- "  + url.parse(req.url, true).pathname);
		var q = url.parse(req.url, true).query;
		var txt = q.year + " " + q.month;
		res.end(txt);
		if (err) throw err;
	  });
  }).listen(8080);
