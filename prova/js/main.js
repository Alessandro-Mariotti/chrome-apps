var FS = (function() {
  function chooseRoot() {
    var options = {
      type: "openDirectory"
    };

    function gotDirectoryEntry(de) {
      if (!chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        return;
      }
      console.dir(de);
    }
    chrome.fileSystem.chooseEntry(options, gotDirectoryEntry);
    //   chrome.fileSystem.getWriteableEntry(directoryEntry, function(fileEntry) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'https://s3-eu-west-1.amazonaws.com/themadbox.fluid.sport/timeslots/55d4b6313746ed81788b456b.mp4', true);
    //     xhr.responseType = 'blob';
    //     xhr.onload = function(e) {
    //       var blob = this.response;
    //       fileEntry.createWriter(function(fileWriter) {
    //         var truncated = false;
    //         filewriter.onwriteend = function() {
    //           if (!truncated) {
    //             truncated = true;
    //             this.truncate(blob.size);
    //             return;
    //           }
    //         };
    //         fileWriter.onerror = function(e) {
    //           console.dir(e);
    //           console.log(e.toString());
    //         };
    //         fileWriter.write(blob);
    //       });
    //     };
    //     xhr.send();
    //   });
    // });
  }
  return {
    chooseRoot: chooseRoot
  };
})();