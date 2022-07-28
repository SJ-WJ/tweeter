$(document).ready(function() {
  const maxLength = 140;
  $('#tweet-text').keyup(function() {
    const charLength = $(this).val().length;
    const counter = maxLength - charLength;
   
    $('.counter').text(counter);
    
    if (counter < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black");
    }
  });
});