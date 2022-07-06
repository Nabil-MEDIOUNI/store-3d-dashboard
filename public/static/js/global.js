$(window).ready(() => {
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    overflow: 'visible',
  });
});

let clicked = true;

$('.bar-c').click(() => {
  if (clicked) {
    $('.bar').addClass('noAnim');
    clicked = false;
  } else {
    $('.bar').removeClass('noAnim');
    clicked = true;
  }
});
