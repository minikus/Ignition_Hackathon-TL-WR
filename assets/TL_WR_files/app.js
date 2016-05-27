$(function(){
  $( "#alarm" ).timeDropper();
  $( "#alarm2" ).timeDropper();


  var links = $.parseJSON(localStorage.getItem('myLinks'));
  var savedPos = ((links || {})[location.href] || {}).scroll;
  var links = $.parseJSON(localStorage.getItem('myLinks')) || {};
  var savedPos = (links[location.href] || {}).scroll;
  console.log('load ' + savedPos);

  $('#saveForLater').click(function(){
    $('#overlay,#tlwr').show();
  });
  $('#today,#weekend').click(function() {
    addScrollPos();
	addToCalendar();
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
  $('.timepicker').wickedpicker({twentyFour: true});
  var twelveHour = $('.timepicker-12-hr').wickedpicker();
  $('.time').text('//JS Console: ' + twelveHour.wickedpicker('time'));
  $('.timepicker-24-hr').wickedpicker({twentyFour: true});



  function addToCalendar() {
    var lastCal = $.parseJSON(localStorage.getItem('lastCal'));
	if (lastCal && new Date(lastCal.date) > new Date()) {
      return;
    }
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('lastCal', JSON.stringify({date: tomorrow}));
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20160527T110000Z/20160527T170000Z&location=Anywhere&text=My+Reading&details=Read+these+articles+later.%0A%0A--%0Ahttp://www.thevocal.com.au/MyReading.html';
	var ical = 'http://addtocalendar.com/atc/ical?utz=600&uln=en-US&vjs=1.5&e%5B0%5D%5Bdate_start%5D=2016-05-27%2012%3A00%3A00&e%5B0%5D%5Bdate_end%5D=2016-05-27%2018%3A00%3A00&e%5B0%5D%5Btimezone%5D=Australia%2FSydney&e%5B0%5D%5Btitle%5D=My+Reading&e%5B0%5D%5Bdescription%5D=Read+these+articles+later.%0A%0A--%0Ahttp://www.thevocal.com.au/MyReading.html&e%5B0%5D%5Blocation%5D=Anywhere';
	window.open(getMobileOperatingSystem() === 'iOS' ? ical : gcal);
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
