function onPageLoaded() {
	$('section#gallery').magnificPopup({
		delegate : 'a',
		type : 'image',
		gallery : {
			enabled : true
		}
	});
}

var popupWidth = 500;
var popupHeight = 500;
function shareFb(url) {
	var winTop = (screen.height / 2) - (popupHeight / 2);
    var winLeft = (screen.width / 2) - (popupWidth / 2);
    window.open('https://www.facebook.com/sharer/sharer.php?u='+ url,
    		'share on FB',
    		'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+popupWidth+',height='+popupHeight);
}

function shareTwitter(text) {
	winHeight = 300;
	winWidth = 300;
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://twitter.com/home?status='+ text,
			'share on Twitter',
    		'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+popupWidth+',height='+popupHeight);
}
function sharePinterest(imgUrl, url, description) {
	winHeight = 300;
	winWidth = 300;
	var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://www.pinterest.com/pin/create/button/?url=' + url +
    		'&media='+imgUrl +
    		'&description' + description,
    		'share on Twitter',
    		'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+popupWidth+',height='+popupHeight);
}
