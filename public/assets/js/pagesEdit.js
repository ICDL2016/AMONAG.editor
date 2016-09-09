$(function () {

  var pagesEdit = false;
  $('.js-active-pages-edit').on('click', function (e) {
    e.stopPropagation();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active fa-unlock').addClass('fa-lock');
      pagesEdit = false;
      $('.js-redact-item').tooltipster('hide');
      $('.js-page-add').hide();
      $(this).closest('.book-nav__item').find('.page-add-form').remove();
    } else {
      pagesEdit = true;
      $(this).addClass('active fa-unlock').removeClass('fa-lock');
      $('.js-page-add').show();
    }
  });


  var originElement = '';
  //разметка тултипа
  var elRedact = $('<div class="tooltip-actions tooltip-actions_redact">' +
    '<span class="fa fa-pencil"/>' +
    '<span class="tooltip-wrap"><i class="fa fa-plus-circle js-tooltip-pageadd" /></span>' +
    '<span class="tooltip-wrap"><i class="fa fa-arrow-circle-up"></i></span>' +
    '<span class="tooltip-wrap"><i class="fa fa-arrow-circle-down"></i></span>' +
    '<span class="tooltip-wrap"><i class="fa fa-minus-circle"></i></span>' +
    '</div>');


  elRedact.find('.js-tooltip-pageadd').on('click', function () {
    $('.page-add-form').remove();
    var form = $('<form class="page-add-form">' +
      '<button type="submit">Save</button>' +
      '<i class="fa fa-close js-page-add_delete"></i>' +
      '</form>');
    // for (var key in choosenLangs) {
    $('<div class="page-add-form__item"><span> EN(English) </span><input type="text"> </div>').
    prependTo(form);
    console.log(availableLangs[choosenLangs[key]])
    // }
    form.insertAfter(originElement);
  });

  $('.js-redact-item').tooltipster({
    theme         : 'tooltipster-punk',
    trigger       : 'click',
    contentAsHTML : true,
    interactive   : true,
    minWidth      : 100,
    functionBefore: function (origin, continueTooltip) {
      console.log(origin);
      originElement = origin;
      origin.tooltipster('content', elRedact);
      continueTooltip();
    }
  });

  $('.js-sounds').tooltipster({
    theme         : 'tooltipster-default',
    trigger       : 'click',
    contentAsHTML : true,
    interactive   : true,
    minWidth      : 320,
    position      : 'bottom',
    functionBefore: function (origin, continueTooltip) {
      var $index = $(origin).closest('.edit-heads__item').index();
      var $el = $('.edit__item').eq($index).find('.edit-item__sound-multi');
      //originElement = origin;
      origin.tooltipster('content', $el);
      continueTooltip();
    }
  });

  var elOptions = $('<div class="tooltip-actions tooltip-actions_edit">' +
      '<div class="select-wrap">' +
      '<select>' +
      '<option value="">14px Уменьшенный</option>' +
      '<option value="">20px Обычный</option>' +
      '<option value="">24px Увеличенный</option>' +
      '<option value="">30px Большой</option>' +
      '<option value="">36px Самый большой</option>' +
      '</select>' +
      '</div>' +
      '<span class="fa fa-align-left"/>' +
      '<span class="tooltip-wrap"><i class="fa fa-align-center" /></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-align-right"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-align-justify"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-bold"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-italic"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-underline"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-paragraph"></i></span>' +
      '<span class="tooltip-wrap"><i class="fa fa-chain-broken"></i></span>' +
      '</div>'
    )
    ;

  $('.js-edit-options').tooltipster({
    theme         : 'tooltipster-punk',
    trigger       : 'click',
    contentAsHTML : true,
    interactive   : true,
    minWidth      : 100,
    functionBefore: function (origin, continueTooltip) {
      console.log(origin);
      originElement = origin;
      origin.tooltipster('content', elOptions);
      continueTooltip();
    }
  });

  //$('.tooltip-redactor')
  $('.js-redact-item').on('click', function (e) {
    if (pagesEdit == false) {
      e.preventDefault();
      $('.book-subnav__item .js-redact-item').removeClass('active');
      $('.js-redact-item').tooltipster('hide')
      $(this).addClass('active');
    } else {
      e.preventDefault();
    }
  });

  $('.js-page-add').on('click', function () {
    $(this).hide();
    var form = $('<form class="page-add-form">' +
      '<button type="submit">Save</button>' +
      '<i class="fa fa-close js-page-add_delete"></i>' +
      '</form>');
    //for (var key in choosenLangs) {
    $('<div class="page-add-form__item"><span> EN(English) </span><input type="text"> </div>').
    prependTo(form);
    console.log(choosenLangs[key]);
    //}
    form.insertBefore(this);
  });

  $('body').on('click', '.js-page-add_delete', function (e) {
    e.stopPropagation();
    $(this).closest('.page-add-form').remove();
    $('.js-page-add').show();
  })

  var languages = ($.parseJSON($('#json_languages').html()));
  var availableLangs = languages.languages;
  var choosenLangs = [];
  console.log(availableLangs);
  choosenLangs.push(languages.primary);
  for (var key in languages.secondary) {
    choosenLangs.push(languages.secondary[key]);
  }
  console.log(choosenLangs);

  $('.js-edit').on('click', function () {
    $('.js-edit-content').fadeIn('fast');
    $('.edit__items-wrap').css('margin-top', $('.edit__controls-wrap').height() + 'px');
    $('.edit-item__content').css('padding-bottom', $('.edit__controls-wrap').height() + 'px');
    $('body').addClass('oh');
    setHeight('.edit__item');
  })

  $('.js-edit-close').on('click', function () {
    $('.js-edit-content').fadeOut('fast');
    $('body').removeClass('oh');

  })


  if ($('.edit').length) {
    setHeight('.edit__item');
    $(window).resize(function () {
      setHeight('.edit__item');
    })
  }

  function setHeight(element) {
    var maxHeight = Math.max.apply(null, $('.edit__item').map(function () {
      return $(this).height();
    }).get());
    if ($(element).parent().height() < maxHeight) {
      $(element).css('height', maxHeight + 'px');
    }
  }


  $('.edit').scroll(function () {
    var offsetLeft = $(this).scrollLeft();
    $('.edit-heads').scrollLeft(offsetLeft);
  });

  $('.edit-heads').scroll(function () {
    var offsetLeft = $(this).scrollLeft();
    $('.edit').scrollLeft(offsetLeft);
  });


  $('.js-sound-single').click(function (e) {
    e.stopPropagation();
    $('.js-sound-single-elem').fadeOut();
    var $parent = $(this).closest('.js-sound-single-parent'), $elem = $parent.find('.js-sound-single-elem');
    $elem.fadeIn();
  })

  $('.edit__items-wrap').scroll(function () {
    $('.js-sounds').tooltipster('hide')
    $('.js-edit-options').tooltipster('hide')
  });

  var $head = $('.sound').not('.sound_contain');

  $('html').click(function (e) {
    if (!$(e.target).closest('.js-sound-single-elem').length) {
      $('.js-sound-single-elem').hide();
      $('.sound__item').hide();
      $('.sound__item .btn-submit').hide();
      $('.sound__item .fileform span').html('');
      $('.sound__item [type="file"]').val('');
      $('.sound__item [type="text"]').val('');
      $head.find('.sound__controls').hide();
      $('.sound__icons').show();
      $('.js-form-select .fa').removeClass('active').show();
    }
  })

  $('.fileform input').change(function () {
    var $val = $(this).val()
    $(this).parent().find('span').html($val);
    $(this).closest('.sound__item').find('.btn-submit').show()
    $(this).closest('.sound__item').find('.sound__controls').show()
    $(this).closest('.edit-item__sound-multi').find('.btn-submit').show();
    console.log('qqqq')
  })

  $('.sound [type="text"]').on('change keydown', function () {
    $(this).closest('.sound__item').find('.btn-submit').show();

    $(this).closest('.sound__item').find('.sound__controls').show();
  })


  $('.js-form-select .fa').on('click', function () {
    var $index = $(this).index();
    $(this).hide().siblings().hide();
    var $item = $(this).closest('.sound').find('.sound__item').eq($index);
    $item.find('.sound__logo').show();
    $(this).closest('.sound').find('.sound__icons').hide();
    $(this).closest('.sound').find('.sound__item').hide().eq($index).fadeIn();

    console.log($index);
  })

  $('.js-test').on('click', function (e) {
    e.preventDefault();
    console.log('qweqweqs');
  })

  // Edit book title
  $('.edit-book__title').on('click', function(event) {
    $('.edit-book__title').css('display', 'none');

    var lang = event.target.dataset.lang;
    var BookTitle = $('.languages-content__title[data-content-title="' +lang+ '"]');
    var currentBookTitleText = BookTitle.text();

    var form = $(
      '<form class="book-title__form">' +
      '<textarea type="text" id="book-title">' + currentBookTitleText + '</textarea>' +
      '<button type="submit" id="submit-book-title">Save</button>' +
      '</form>'
    );

    BookTitle.append(form);
    $('#book-title').focus();
    $('.book-title__form').submit(function(event) {
      event.preventDefault();
      var newBookTitleText = $('#book-title').val();

      if (currentBookTitleText !== newBookTitleText) {
        var submitNewTitle = confirm('Are you sure?');

        if (submitNewTitle) {
          BookTitle.contents().filter(function() {
            return this.nodeType == 3; }).first().replaceWith(newBookTitleText);
        } else {
          BookTitle.contents().filter(function() {
            return this.nodeType == 3; }).first().replaceWith(currentBookTitleText);
        }
      } else {
        BookTitle.contents().filter(function() {
          return this.nodeType == 3; }).first().replaceWith(currentBookTitleText);
      }

      form.remove();
      $('.edit-book__title').css('display', 'inline-block');
    })
  });
});
