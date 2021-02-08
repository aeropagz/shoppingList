import { app } from "./app.js";
import https from "https";
import http from "http";
import fs from "fs";
import { enviroment } from "./enviroment.js";
import { initDb } from "./db/index.js";

const port = process.env.PORT || 8080;
(async () => {
  await initDb();
})();
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
