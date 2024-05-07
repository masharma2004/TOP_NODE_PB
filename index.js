const http= require('http');
const url= require('url');
const fs= require('fs');

const page404 = fs.readFileSync("./404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});
http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = q.pathname=="/" ? "./index.html" : "./"+q.pathname +".html";

    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(page404);
        return res.end();
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(8080);