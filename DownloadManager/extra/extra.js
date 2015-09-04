var address = 'https://s3-eu-west-1.amazonaws.com/themadbox.fluid.sport/timeslots/55d4b6313746ed81788b456b.mp4';
var D = (function() {
	var blob = null;

	function download(address) {
		console.log("download");
		var xhr = new XMLHttpRequest();
		xhr.open('GET', address, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			blob = this.response;
		};
		xhr.send();
	}

	function save() {
		if (blob)
			console.log("OK");
	}
	return {
		download: download,
		save: save
	}
})();
$(document).ready(function() {
	D.download();
	D.save();
});