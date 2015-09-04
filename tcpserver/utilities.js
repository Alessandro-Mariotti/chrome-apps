function str2ab(str) {
        var encoder = new TextEncoder('utf-8');
        return encoder.encode(str).buffer;
	}

function ab2str(ab) {
    var dataView = new DataView(ab);
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(dataView);
}