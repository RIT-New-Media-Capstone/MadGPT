const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/getAPI': apiHandler.getAPI,
  '/test': apiHandler.testResponse,
  '/style.css': htmlHandler.getCSS,
  '/bundle.js': htmlHandler.getJS,
  '/logo.svg': htmlHandler.getLogo,
  notFound: htmlHandler.getIndex,
};

const onRequest = async (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const handlerFunction = urlStruct[parsedUrl.pathname];
  const { query } = parsedUrl;
  if (handlerFunction) {
    handlerFunction(request, response, query);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
