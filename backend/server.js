const app = require('./app');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 8080;

https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/simplelist.de-0001/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/simplelist.de-0001/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/simplelist.de-0001/chain.pem')
	},app)
	.listen(port, () => {
		console.log(`Server started on Port ${port}`);
	});
