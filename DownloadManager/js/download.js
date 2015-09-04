(function() {

	var hostName = "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/HT1425/sample_iPod.m4v.zip";
	var blob = null;
	
	function exportToFileEntry(entry) {

		var stato = document.getElementById("stato");

		chrome.fileSystem.getDisplayPath(entry, function(path) {
			fileDisplayPath = path;
			stato.innerText = "Esporto su: " + fileDisplayPath;
		});

		entry.createWriter(function(fileWriter) {

			var truncated = false;

			fileWriter.onwriteend = function(e) {
				if (!truncated) {
					truncated = true;
					this.truncate(blob.size);
					return;
				}
			};

			fileWriter.onerror = function(e) {
				stato.innerText = 'Export fallito: ' + e.toString();
			};

			fileWriter.write(blob);

		});

	}

	function doExportToDisk() {

		chrome.fileSystem.chooseEntry({
			type: "saveFile",
			suggestedName: "nuovo",
			accepts: [{
				description: "Zip Files",
				extensions: ["zip"]
			}],
			acceptsAllTypes: true
		}, exportToFileEntry);

	}

	function download() {

		console.log("download");
		var xhr = new XMLHttpRequest();
		xhr.open('GET', hostName, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
  			blob = this.response;
  			doExportToDisk();
		};

		xhr.send();
	}

	document.getElementById("download").addEventListener("click", download);	

})();