/*
function onInitFs(fs) {
	fs.root.getFile('log.txt', {
		create: true,
		exclusive: false
	}, function(fileEntry) {
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.onwriteend = function(e) {
				console.log('Write completed.');
			};
			fileWriter.onerror = function(e) {
				console.log('Write failed: ' + e.toString());
			};
			// Create a new Blob and write it to log.txt.
			var blob = new Blob(['Lorem Ipsum'], {
				type: 'text/plain'
			});
			fileWriter.write(blob);
		}, function(e) {
			console.log('Error', e);
		});
	}, function(e) {
		console.log('Error', e);
	});
}
*/
$(document).ready(function() {
	$('#parse').click(function(e) {
		e.preventDefault();
		var addresses = JSON.parse($('#download-resources-list').val());
		var manager = new DownloadManager();
		_.forEach(addresses.resources, function(resource) {
			manager.add(new DownloadResource(resource));
		});
		manager.downloadAll();
	});
	errorHandler = new ErrorHandler();
});