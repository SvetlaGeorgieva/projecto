const fs = require('fs');
const http = require('http');
const url = require('url');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

// Parse JSON file into object
const data = fs.readFileSync(`${__dirname}/data/sample-projects.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Create the server; handle routing
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  console.log(pathname);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const output = JSON.stringify(dataObj, null, 2);
    res.end(output);

    // Handle invalid URLs
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

// Start the server
server.listen(port, '127.0.0.1', () => {
  console.log(`Listening to requests on port ${port} `);
});
