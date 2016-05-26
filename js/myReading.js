$(function(){
  var links = $.parseJSON(localStorage.getItem('myLinks')) || {};
  var list = [];
  $.each(links, function(link, details) {
	list.push('<li><a href="' + link + '">' + details.title + '</a></li>');
  });
  $('#myReading').html(list.join(''));
});
