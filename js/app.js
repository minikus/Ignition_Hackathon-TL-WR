$(function(){
  var savedLocation = localStorage.getItem('scrollTop');
  console.log('load ' + savedLocation);
  
  $('#saveForLater').click(function(){
    savedLocation = $(document).scrollTop();
    localStorage.setItem('scrollTop', savedLocation);
    console.log('save ' + savedLocation);
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
