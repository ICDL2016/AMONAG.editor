$(function () {
  // panel toggler
  $('.js-top-block-call').on('click', function () {
    $('.js-top-block').fadeToggle();
    $(this).toggleClass('active');
  })

  // placing mark according to type
  $('.js-mark-mode').on('click', function (e) {
    e.preventDefault();
    var $item = $(this), $targetNode = $('.book-page'), type = $item.data('type'), count, $node, $wrap, wrapCount = 0, $wrapText, html, wrapHtml;
    if ($item.hasClass('active')) {
      $item.removeClass('active');
      $targetNode.off('click.mark')
    } else {
      $item.addClass('active').siblings().removeClass('active');
      $targetNode.off('click.mark');
      $targetNode.on('click.mark', function (e) {
        var $clickedNode = $(e.target);
        if (!!$clickedNode.data('type')) {
          return;
        }
        var isExist = checkMark($clickedNode, type) || checkSeparator($clickedNode, type);
        if (!isExist) {
          count = $targetNode.find('[data-mark="' + type + '"]').length + 1
          switch (type) {
            case 3:
              $node = $('<div data-type="mark" data-mark="' + type + '" class="mark-line"><span>1</span></div>')
              $node.insertAfter($clickedNode);
              break;
            case 2:
              $node = $('<i data-type="mark" data-mark="' + type + '"><span></span></i>');
              $clickedNode.append($node);
              if ($clickedNode.parent('.mark-wrapper').length) {
                html = $('<div>').append($clickedNode.clone()).html();
                wrapHtml = $('<div>').append($clickedNode.closest('.mark-wrapper').clone()).html();
                var replace = wrapHtml.replace(html, html + '</div><div class="mark-wrapper">');
                var main = $('.book-page'), mainHtml = main.html();
                var replaceMain = mainHtml.replace(wrapHtml, replace)
                main.html(replaceMain)
              } else {
                $wrap = $('<div class="mark-wrapper">')
                $clickedNode.next().prevUntil(".mark-wrapper, [data-mark=" + type + "]").wrapAll($wrap);
                $wrapText = $clickedNode.closest('.mark-wrapper')
                $wrapText.append($wrapText.children().get().reverse())
              }
              break;
            default:
              $node = $('<i data-type="mark" data-mark="' + type + '"><span>1</span></i>');
              $clickedNode.append($node);
          }
          recalc($targetNode, '[data-mark="' + type + '"]')
        }
      })
    }
  });

  //activating mark
  $(document).on('click', '[data-type="mark"]', function (e) {
    $(this).toggleClass('active')
  });

  //
  function checkMark(node, type) {
    return node.find('[data-mark="' + type + '"]').length
  }

  function checkSeparator(node, type) {
    return node.hasClass('mark-line') || node.next().hasClass('mark-line')
  }

  //call when placing new mark
  function recalc(parent, target) {
    parent.find($(target)).each(function (i, e) {
      $(e).find('span').text(++i);
    })
  }


  console.log('qqq')

//  audio mark

  //wave form
  if ( $('#waveform').length ) {
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      scrollParent: true
    });


  // wavesurfer.load('../music/7.mp3');
  wavesurfer.load('../music/2.mp3');
  //wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
  //wavesurfer.load('../music/HarryPotter.mp3');


  wavesurfer.on('ready', function () {
    // wavesurfer.play();
    wavesurfer.zoom(0);
  });


  $('.js-waveform-play-pause').on('click', function () {
    wavesurfer.playPause();
    var item = $(this).find('.fa');
    if (item.hasClass('fa-play')) {
      item.removeClass('fa-play').addClass('fa-pause')
    }
    else if (item.hasClass('fa-pause')) {
      item.removeClass('fa-pause').addClass('fa-play')
    }
    if ($(this).hasClass("first-start")) {
      $(this).removeClass("first-start");
      $('.cell').eq(0).addClass("voice-cell");
    }
  });


  var zoomLevel = 1;
  $('.js-zoom-in').on('click', function () {
    ++zoomLevel
    if (!(zoomLevel <= 6)) {
      zoomLevel = 6
    }
    wavesurfer.zoom(zoomLevel)
  });
  $('.js-zoom-out').on('click', function () {
    --zoomLevel
    zoomLevel >= 1 ? wavesurfer.zoom(zoomLevel) : zoomLevel = 1;
    wavesurfer.zoom(zoomLevel);
  });

  $('.js-wave-marker').on('click', function () {
    wavesurfer.addRegion({
    start: wavesurfer.getCurrentTime(), // time in seconds
    //end: wavesurfer.getCurrentTime(), // time in seconds
    color: '#800000'
    });
    $(".cell.voice-cell").next(".cell").addClass("voice-cell");
    $(".cell.voice-cell").eq(0).removeClass("voice-cell");
  })

  var scrollPos, $wave = $('wave')
  $('.js-swipe-right').on('click', function () {
    scrollPos = $wave.scrollLeft()
    $wave.scrollLeft(scrollPos + 10)
  })

  $('.js-swipe-left').on('click', function () {
    scrollPos = $wave.scrollLeft()
    console.log(scrollPos)
    $wave.scrollLeft(scrollPos - 10)
  })
  }
});
