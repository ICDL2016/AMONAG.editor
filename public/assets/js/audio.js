$(function () {
  var isOnce = false;
  isSlideshow = false;

  config = {
    timeOut: parseInt($('.js-pause-time').val()),
    repeatCount: parseInt($('.js-repeat-count').val() - 1),
    repeatAfterCount: parseInt($('.js-repeat-after-count').val())
  }

  timeOut = config.timeOut;
  repeatCount = config.repeatCount;
  repeatAfterCount = config.repeatAfterCount;
  nowPause = '';

  //парсим json фраз пришедший с сервера.

  var translations_new = ($.parseJSON($('#json_new').html()));

  //парсим json языков пришедший с сервера.

  var languages = ($.parseJSON($('#json_languages').html()));

  var availableLangs = languages.languages;
  var langs = [];
  langs.push(languages.primary);
  for (var key in languages.secondary) {
    langs.push(languages.secondary[key]);
  }

  languagesContent = [];

  for (var key in translations_new.content) {
    var item = {};
    for (var i = 0; i < langs.length; i++) {
      var phrase = langs[i];
      item[i] = translations_new.content[key].translations[phrase];
    }
    languagesContent.push(item);
  }


  currentLang = translations_new.language_id;

  //воспроизвести все на странице
  $('.js-play-all').on('click', function () {
    var $item = $('.js-sentence.active');
    if ($item.length) {
      myPlaylist.play($item.data('index'));
    } else {
      myPlaylist.play(0);
    }
  });


  //массив с путями к записям
  var playlist = [];
  translationsArray = [];
  for (var key in translations_new.content) {
    translationsArray.push(translations_new.content[key]);
  }

  $('.js-sentence').each(function () {
    var $index = $(this).index('.js-sentence');
    $(this).attr('data-index', $index);
    $(this).addClass('tooltip');
    if (translationsArray[$index].path) {
      playlist.push({position: $index, title: 'qq', mp3: 'http://amonag.ru' + translationsArray[$index].path})
    } else {
      playlist.push({position: $index, title: 'qq', mp3: 'assets/audio/5sec.mp3'})
      $(this).addClass('tooltip-noplay');
    }
  });


  $('.js-sentence').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.js-sentence').removeClass('active');
    myPlaylist.pause();
  });


  var timer;

  var playListCallbacks = {
    preload: 'auto',

    ready: function () {

    },
    loadstart: function () {
      //console.log('ended');
    },
    next: function () {
      console.log('hi next')
    },
    play: function () {
      $('.js-sentence').eq(myPlaylist.playlist[myPlaylist.current].position).addClass('active').siblings().removeClass('active');
    },
    playlistOptions: {
      //addTime: 'fast',
      //removeTime: 'fast',
      //shuffleTime: 'fast',
    },
    ended: function (event) {
      if (isSlideshow) {
        //setTimeout(function () {
        //  var $translationsTextParent = $('.translations__text');
        //  $translationsTextParent.empty();
        //  var contentObj = languagesContent[++currentIndex];
        //  if (contentObj) {
        //    for (var key in contentObj) {
        //      $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
        //    }
        //  } else {
        //    slideShowIndex = '';
        //    isSlideshow = false;
        //    $('.translations').removeClass('slideshow-active');
        //    $('.js-translations-close').click();
        //  }
        //}, timeOut * 1000)

      } else if (isOnce) {
        myPlaylist.pause();
        isOnce = false;
      }
    },
    error: function (event) {
      //function endAndStartTimer() {
      //  window.clearTimeout(timer);
      //  timer = setTimeout(function () {
      //    $("#jquery_jplayer_1").trigger($.jPlayer.event.ended);
      //  }, 6000);
      //}
      //
      //if (event.jPlayer.error.type == 'e_url') {
      //  $('#jp_container_1').addClass('error');
      //  endAndStartTimer();
      //}
    }
  }

  function testOut() {
    var $translationsTextParent = $('.translations__text');
    $translationsTextParent.empty();
    var contentObj = languagesContent[++currentIndex];
    if (contentObj) {
      for (var key in contentObj) {
        $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
      }
    } else {
      slideShowIndex = '';
      isSlideshow = false;
      $('.translations').removeClass('slideshow-active');
      $('.js-translations-close').click();
    }
  }

  //инициализация плейлиста
  myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, playlist, playListCallbacks);


  $("#jquery_jplayer").jPlayer({
    supplied: "mp3",
    wmode: "window"
  });

  $('.js-mp3-single').on('click', function (e) {
    e.preventDefault();
    $("#jquery_jplayer")
      .jPlayer("setMedia", {mp3: this.href})
      .jPlayer("play");
  });

  //разметка тултипа
  var el = $('<div class="tooltip-actions"><span class="icon-globe fa"/><span class="js-play tooltip-wrap"><i class="fa fa-volume-up"></i></span><span class="tooltip-wrap js-translation-popup"><i class="fa fa-play" /></span></div>');


  currentIndex = 0;

  //  кнопка плей в тултипе
  el.find('.js-play').on('click', function () {
    myPlaylist.play($(this).parent().data('index'));
    $('.tooltip').tooltipster('hide');
  });

  el.find('.js-comment').on('click', function () {
    $('.tooltip').tooltipster('hide');
    $('.js-comments').fadeIn();
  });


  //вызов окна с переводами в тултипе
  el.find('.js-translation-popup').on('click', function () {
    var $index = $(this).parent().data('index'), $translationsTextParent = $('.translations__text');
    currentIndex = $index;
    $translationsTextParent.empty();
    var contentObj = languagesContent[$index];
    for (var key in contentObj) {
      $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
    }
    $('.js-translations').fadeIn();
    $('.tooltip').tooltipster('hide');
  });


  //закрытие окна с переводами
  $('.js-translations-close').on('click', function (e) {
    e.preventDefault();
    $('.js-translations').fadeOut();
    myPlaylist.pause();
    $('.book-page__item').removeClass('active')
  });


  //воспроизведение записи в окне с переводами
  $('.js-translation-play').on('click', function (e) {
    e.preventDefault();
    myPlaylist.play(currentIndex);
    isOnce = true;
  })


  var callbackEnded = function () {
    var $translationsTextParent = $('.translations__text');
    $translationsTextParent.empty();
    var contentObj = languagesContent[++currentIndex];
    if (contentObj) {
      for (var key in contentObj) {
        $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
      }
    } else {
      slideShowIndex = '';
      $('.translations').removeClass('slideshow-active');
      $('.js-translations-close').click();
    }
  }


  var slideShowIndex;
  //запуск слайд шоу с воспроизведением
  $('.js-translation-slideshow').on('click', function (e) {
//    myPlaylist.play(currentIndex);
    slideShowIndex = currentIndex;
    isSlideshow = true;
    $('.translations').addClass('slideshow-active');
  });

  $('.js-translation-slideshow-all').on('click', function (e) {
    var $translationsTextParent = $('.translations__text');
    $translationsTextParent.empty();
    var contentObj;
    var $item = $('.js-sentence.active');
    if ($item.length) {
      currentIndex = $item.data('index');
      contentObj = languagesContent[$item.data('index')];
    }
    else {
      currentIndex = 0;
      contentObj = languagesContent[0];
    }
    if (contentObj) {
      for (var key in contentObj) {
        $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
      }
    }
    $('.translations').show();
    $('.js-translation-slideshow').click();
  });

  pauseTimeout = '';
  emptyPathTimeout = ''
  $('.translations').on('click', function () {
    if ($('#jp_container_1').hasClass('jp-state-playing') || nowPause) {
      $('.translations').removeClass('slideshow-active');
      //$('#jquery_jplayer_1').jPlayer('stop');
      console.log('here')
      pausePlayed = false;
      myPlaylist.pause();
      if (nowPause) {
        clearTimeout(pauseTimeout);
        clearTimeout(emptyPathTimeout);
        nowPause = false;
      }
      repeatCount = config.repeatCount;
      repeatAfterCount = config.repeatAfterCount;
      isSlideshow = false;
    }
    if ($('#jp_container_1').hasClass('error')) {
      window.clearTimeout(timer);
      $('.translations').removeClass('slideshow-active');
      myPlaylist.pause();
    }
  })


  //клик по кнопке следующей записи в окне с переводами
  $('.js-translation-right').on('click', function (e) {
    e.preventDefault();
    var $translationsTextParent = $('.translations__text');
    $translationsTextParent.empty();
    var contentObj = languagesContent[++currentIndex];
    if (contentObj) {
      for (var key in contentObj) {
        $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
      }
    } else {
      $('.js-translations-close').click();
    }
  });

  //клик по кнопке предыдущей записи в окне с переводами
  $('.js-translation-left').on('click', function (e) {
    e.preventDefault();
    var $translationsTextParent = $('.translations__text');
    $translationsTextParent.empty();
    var contentObj = languagesContent[--currentIndex];
    if (contentObj) {
      for (var key in contentObj) {
        $('<div class="translations__item">' + contentObj[key] + '</div>').appendTo($translationsTextParent);
      }
    } else {
      $('.js-translations-close').click();
    }
  });


  $('.tooltip').tooltipster({
    theme: 'tooltipster-punk',
    trigger: 'click',
    contentAsHTML: true,
    interactive: true,
    minWidth: 100,
    functionBefore: function (origin, continueTooltip) {
      myPlaylist.pause();
      $('.book-page__item').removeClass('active')
      origin.addClass('active');
      currentIndex = origin.data('index');
      if (origin.hasClass('tooltip-noplay')) {
        el.find('.fa-play').removeClass('js-play').addClass('disabled');
      } else {
        el.find('.fa-play').addClass('js-play').removeClass('disabled');
      }
      el.attr('data-index', currentIndex);
      origin.tooltipster('content', el);
      continueTooltip();
    }
  });


  $('.js-settings').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).toggleClass('active');
    $('.js-settings-child').toggle();
  })
})
