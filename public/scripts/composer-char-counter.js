
$(document).ready(function() {
  let input = $('#tweet-text');

  input.on('input', function() {
    const len = 140 - this.value.length;
    $(".counter")
      .val(len)
      .toggleClass('warning', len < 0);
  });

});



