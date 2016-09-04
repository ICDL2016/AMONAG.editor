$(function () {
  $('.js-comments-close').on('click', function (e) {
    e.preventDefault();
    $('.js-comments').fadeOut();
  })

  $('body').on('click', '.js-comments-form-call', function (e) {
    e.preventDefault();
    $(this).closest('.comments-item').find('.js-comments-form').fadeIn();
  });
})


