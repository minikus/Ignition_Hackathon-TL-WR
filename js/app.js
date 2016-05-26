$(function(){
  $("#saveForLater").click(function(){
      $("#goToSaved").show();
      savedLocation = $(document).scrollTop();
      localStorage.setItem('scrollTop', savedLocation);
      console.log(savedLocation);
  });

  var savedLocation = localStorage.getItem('scrollTop')
  $("#goToSaved").click(function(){
    $("html, body").animate({
      scrollTop:savedLocation
    }, 500)
  })

  if(savedLocation) {
    console.log(savedLocation)
    $("#goToSaved").show();
  }

});
