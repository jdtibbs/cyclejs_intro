var exec = require('child_process').exec;
var fs = require('fs');

console.log('Do an initial build...');
exec('node ./scripts/build.js', function(error, stdout, stderr) {
	if (error !== null) {
		console.log(error);
	}
});



// watch for file changes and execute a build.
console.log('Start watching files for changes...');
var watch = fs.watch('./app', {
	persistent: true,
	recursive: true
});

var doBuild = false;

watch.on('change', function(event, filename) {
	if (!doBuild) {
		// prevents processing duplicates, we only care that something changed.
		doBuild = true;
		// use a timeout to allow all the 'change' events to pass before we execute a build.
		setTimeout(function() {
			doBuild = false;
			console.log('One or more files changed, start a build...');
			exec('node ./scripts/build.js', function(error, stdout, stderr) {
				if (error !== null) {
					console.log(error);
				}
				console.log('...build is complete.');
				// TODO: implement hot module reloading, put an end to browser refresh requirement!!!!
			});
		}, 800);
	}
});

watch.on('error', function(error) {
	console.log('Watch error:');
	console.log(error);
});

console.log('Start the server...');
exec('node ./scripts/server.js', function(error, stdout, stderr) {
	if (error !== null) {
		console.log(error);
	}
});
