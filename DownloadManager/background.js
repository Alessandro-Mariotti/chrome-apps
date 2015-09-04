chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('window.html', {
		'outerBounds': {
			'left': 0,
			'top': 0,
			'width': 800,
			'height': 600
		}
	});
});