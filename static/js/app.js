var fullGallery;
var initialLoad = true;
var fadeTime = 200;
function onHashChange() {
	var gallery = $('#gallery');
	if (location.hash && location.hash != "#") {
		var match = location.hash.match(/#(\w*)/);
		if (match.length != 2) {
			return;
		}
		var category = match[1];
		var items = fullGallery.find('a[data-category="' + category + '"]');
		gallery.removeClass();
		gallery.addClass(category);
		if (items.length > 0) {
			if (!initialLoad) {
				gallery.fadeOut(fadeTime, function() {
					showGalleryItems(items, gallery);
					gallery.fadeIn(fadeTime);
				});
			} else {
				showGalleryItems(items, gallery);
			}
		} else {
			gallery.fadeOut(fadeTime);
			recalculateGalleryHeight(gallery);
		}
	} else {
		if (!initialLoad) {
			gallery.fadeOut(fadeTime, function() {
				gallery.removeClass();
				gallery.empty();
				gallery.append(fullGallery.children().clone());
				gallery.fadeIn(fadeTime);
				recalculateGalleryHeight(gallery);
			});
		}
		recalculateGalleryHeight(gallery);
	}
}
function showGalleryItems(items, gallery) {
	gallery.empty();
	var currentItem = 0;
	var itemsInGroup = 22;
	for (group = 0; group < items.length / itemsInGroup; group++) {
		var groupWrapper = $('<div class="groupWrapper"/>');
		var groupDiv = $('<div class="galleryGroup"/>');
		$('#gallery').append(groupWrapper);
		groupWrapper.append(groupDiv);

		for (i = 0; i < itemsInGroup; i++) {
			var item = $(items[currentItem++]);
			if (item.length == 0) {
				recalculateGalleryHeight(gallery);
				return;
			}
			var galleryItem = item.clone();
			galleryItem.removeClass();
			galleryItem.addClass('img img' + (i + 1));
			groupDiv.append(galleryItem);
		}
	}
	
}
function onMQLTrigger(mql) {
	recalculateGalleryHeight($('#gallery'));
}
function onPageLoaded() {
	var gallery = $('#gallery');
	if (gallery.length > 0) {
		fullGallery = gallery.clone();
		$(window).on('hashchange', onHashChange);
		initialLoad = true;
		onHashChange();
		initialLoad = false;
		
		if (window.matchMedia) {
			window.matchMedia("(max-width: 1400px)").addListener(onMQLTrigger);
			window.matchMedia("(max-width: 850px)").addListener(onMQLTrigger);
			window.matchMedia("(max-width: 602px)").addListener(onMQLTrigger);
			window.matchMedia("(max-width: 480px)").addListener(onMQLTrigger);
		}
	}

	if ($('#detailsPage').length <= 0) {
		return;
	}
	$('#detailsGallery').magnificPopup({
		delegate : 'a',
		type : 'image',
		gallery : {
			enabled : true
		}
	});
	$('#toggleSocialBar').click(function() {
		$('#storeLinks').removeClass('visible');
		if ($('#socialBar').hasClass('visible')) {
			$('#socialBar').removeClass('visible');
		} else {
			$('#socialBar').addClass('visible');
		}
	});
	$('#toggleStoreLinks').click(function() {
		$('#socialBar').removeClass('visible');
		if ($('#storeLinks').hasClass('visible')) {
			$('#storeLinks').removeClass('visible');
		} else {
			$('#storeLinks').addClass('visible');
		}
	});
}
function recalculateGalleryHeight(gallery) {
	setTimeout(function() {
		var galleryPos = gallery.offset().top;
		var galleryHeight = 0;
		var imgCount = 5;
		var lastImages = gallery.find('.img').slice(-5);
		for (i = 0; i < lastImages.length; i++) {
			var img = $(lastImages[i]);
			var imgPos = img.offset().top;
			var height = imgPos - galleryPos + img.height();
			if (height > galleryHeight) {
				galleryHeight = height;
			}
		}
		gallery.height(galleryHeight);
	}, 10);
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
