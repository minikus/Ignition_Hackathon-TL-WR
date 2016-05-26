$(function(){
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
	links[location.href] = {
	  title: document.title,
	  scroll: savedPos
	};
    localStorage.setItem('myLinks', JSON.stringify(links));
    console.log('save ' + savedPos);
  }
  
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
	window.open(gcal);
  }
});
