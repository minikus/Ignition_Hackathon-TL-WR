$(function(){
  var links = $.parseJSON(localStorage.getItem('myLinks')) || {};
  var savedPos = (links[location.href] || {}).scroll;
  console.log('load ' + savedPos);
  
  $('#saveForLater').click(function(){
    $('#overlay,#tlwr').show();
  });
  $('#today,#weekend').click(function() {
    addScrollPos();
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
});
