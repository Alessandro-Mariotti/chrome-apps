var DownloadResource = function(object) {
	this.address = object.address;
	this.action = object.action;
	this.name = object.name;
	this.directoryEntry = null;
	this.fileWriter = null;
	this.fileEntry = null;
	this.fileSystem = null;
	this.initFileSystem();
}
DownloadResource.prototype.initFileSystem = function() {
	var self = this;
	window.webkitPersistentStorage.queryUsageAndQuota(
		function(usedBytes, grantedBytes) {
			console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
		},
		function(e) {
			console.log('Error', e);
		}
	);
	window.webkitPersistentStorage.requestQuota(1024 * 1024, function(grantedBytes) {
		var requestFileSystem = window.webkitRequestFileSystem || window.requestFileSystem;
		requestFileSystem(PERSISTENT, grantedBytes, function(fs) {
			self.fileSystem = fs;
		}, function(e) {
			console.log(e);
		});
	}, function(e) {
		console.log(e);
	});
}
DownloadResource.prototype.download = function() {
	var self = this;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', this.address, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		self.save(this.response);
	};
	xhr.send();
}
DownloadResource.prototype.save = function(blob) {
	this.fileSystem.root.getFile(this.name, {
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
			fileWriter.write(blob);
		}, errorHandler.handle);
	}, errorHandler.handle);
}