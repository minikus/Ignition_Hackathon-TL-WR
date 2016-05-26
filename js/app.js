$(function(){
  var links = $.parseJSON(localStorage.getItem('myLinks')) || {};
  var savedPos = (links[location.href] || {}).scroll;
  console.log('load ' + savedPos);

  $('#saveForLater').click(function(){
    $('#overlay,#tlwr').show();
  });
  $('#todayAlarm,#weekendAlarm').timeDropper();
  $('#today,#weekend').click(function() {
    addScrollPos();
	addToCalendar(this.id === 'weekend', $('#' + this.id + 'Alarm').val());
    $('#overlay,#tlwr').hide();
  });
  $('#close').click(function() {
    $('#overlay,#tlwr').hide();
  });

  setTimeout(function() {
	$('#saveForLater').addClass('scrolling');
    $('html, body').animate({
      scrollTop: savedPos
    }, 500, function() {
	  $('#saveForLater').removeClass('scrolling');
	});
  }, 100);

  function addScrollPos() {
	var links = {};
	try {
      links = $.parseJSON(localStorage.getItem('myLinks')) || {};
	} catch (e) {
      console.log(e);
	}
    savedPos = $(document).scrollTop();
	var iconUrl = $('link[rel="icon"]:first').attr('href');
	iconUrl = (iconUrl.indexOf('/') === -1 ? location.host : '') + iconUrl;
	links[location.href] = {
	  title: document.title,
	  scroll: savedPos,
	  icon: iconUrl
	};
    localStorage.setItem('myLinks', JSON.stringify(links));
    console.log('save ' + savedPos);
  }
 
  function addToCalendar(weekend, time) {
    var lastCal = $.parseJSON(localStorage.getItem('lastCal'));
	if (lastCal && new Date(lastCal.date) > new Date()) {
      return;
    }
	var setFor = new Date();
	setFor.setDate(setFor.getDate() + (weekend ? 7 - setFor.getDay(): 1));
	setFor.setHours(0, 0, 0, 0);
    localStorage.setItem('lastCal', JSON.stringify({date: setFor}));
	var parts = /^(\d+):(\d+)\s(am|pm)$/.exec(time);
	var startTime = new Date(setFor.getTime());
	startTime.setDate(startTime.getDate() - 1);
	startTime.setHours(parseInt(parts[1]) + (parts[3] === 'am' ? 0 : 12), parseInt(parts[2]), 0);
	var endTime = new Date(startTime.getTime());
	endTime.setMinutes(endTime.getMinutes() + 15);
	console.log(startTime + '  ' + endTime);
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
	  formatGDatetime(startTime) + '/' + formatGDatetime(endTime) + '&location=Anywhere' +
	  '&text=My+Reading&details=Read+these+articles+later.%0A%0A--%0Ahttp://www.thevocal.com.au/MyReading.html';
	var ical = 'http://addtocalendar.com/atc/ical?utz=600&uln=en-US&vjs=1.5&e%5B0%5D%5Bdate_start%5D=' +
	  formatIDatetime(startTime) + '&e%5B0%5D%5Bdate_end%5D=' + formatIDatetime(endTime) +
	  '&e%5B0%5D%5Btimezone%5D=Australia%2FSydney&e%5B0%5D%5Btitle%5D=My+Reading' +
	  '&e%5B0%5D%5Bdescription%5D=Read+these+articles+later.%0A%0A--%0Ahttp://www.thevocal.com.au/MyReading.html&e%5B0%5D%5Blocation%5D=Anywhere';
	window.open(getMobileOperatingSystem() === 'iOS' ? ical : gcal);
  }
  
  function formatGDatetime(time) {
    return time.getUTCFullYear() + pad(time.getUTCMonth() + 1) + pad(time.getUTCDate()) +
	  'T' + pad(time.getUTCHours()) + pad(time.getUTCMinutes()) + pad(time.getUTCSeconds()) + 'Z';
  }
  
  function formatIDatetime(time) {
    return time.getFullYear() + '-' + pad(time.getMonth() + 1) + '-' + pad(time.getDate()) +
	  ' ' + pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds());
  }
  
  function pad(value) {
    return (value < 10 ? '0' : '') + value;
  }

  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      return 'iOS';
    } else if (userAgent.match(/Android/i)) {
      return 'Android';
    } else {
      return 'unknown';
    }
  }



});
