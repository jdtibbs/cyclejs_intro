var fs = require('fs');

fs.createReadStream('./app/app.css')
	.pipe(fs.createWriteStream('./public/bundle.css'));
fs.createReadStream('./app/favicon.ico')
	.pipe(fs.createWriteStream('./public/favicon.ico'));
fs.createReadStream('./app/index.html')
	.pipe(fs.createWriteStream('./public/index.html'));
