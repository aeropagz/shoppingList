const app = require("./app");
const https = require("https");
const http = require("http");
const fs = require("fs");
const enviroment = require("./enviroment");

const port = process.env.PORT || 8080;

if (enviroment.production) {
  https
    .createServer(
      {
        key: fs.readFileSync(
          "/etc/letsencrypt/live/simplelist.de-0001/privkey.pem"
        ),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/simplelist.de-0001/cert.pem"
        ),
        ca: fs.readFileSync(
          "/etc/letsencrypt/live/simplelist.de-0001/chain.pem"
        ),
      },
      app
    )
    .listen(port, () => {
      console.log(`HTTPS Server started on Port ${port}`);
    });
}

http.createServer(app).listen(port + 1, () => {
  console.log(`HTTP Server started on Port ${port + 1}`);
});
