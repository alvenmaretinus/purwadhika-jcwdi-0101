import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = 8000;

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/api':
      if (req.method === 'GET') {
        // set response header
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // set JSON response
        res.write(JSON.stringify({ message: 'Hello from /api endpoint' }));
        // end the response
        res.end();
      }
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
