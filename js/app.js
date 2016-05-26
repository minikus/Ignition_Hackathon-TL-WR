$(function(){
  var savedLocation = localStorage.getItem('scrollTop');
  console.log('load ' + savedLocation);
  
  $('#saveForLater').click(function(){
    $('#overlay,#tlwr').show();
  });
  $('#today,#weekend').click(function() {
    savedLocation = $(document).scrollTop();
    localStorage.setItem('scrollTop', savedLocation);
    console.log('save ' + savedLocation);
    $('#overlay,#tlwr').hide();
  });

  setTimeout(function() {
	$('#saveForLater').addClass('scrolling');
    $('html, body').animate({
      scrollTop: savedLocation
    }, 500, function() {
	  $('#saveForLater').removeClass('scrolling');
	});
  }, 100);
});
