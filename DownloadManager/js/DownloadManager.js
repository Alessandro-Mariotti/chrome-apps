var DownloadManager = function() {
	this.resources = [];
	this.directoryEntry = null;
	self = this;
}
DownloadManager.prototype.add = function(downloadResource) {
	this.resources.push(downloadResource);
}
DownloadManager.prototype.downloadAll = function() {
	_.forEach(this.resources, function(resource) {
		if (resource.action === 'download') {
			resource.download();
		}
	}, this);
}
DownloadManager.prototype.download = function(resource) {
	var self = this;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', resource.address, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		blob = this.response;
		resource.save(blob);
	};
	xhr.send();
}