$(window).load(function () {
  var $catalog = $('.catalog').masonry();
  // поведение элементов каталога

  setTimeout(function () {
    $catalog.masonry('destroy');
    $catalog.masonry({
      itemSelector: '.catalog__item',
      isFitWidth  : true,
      gutter      : 5
    });
  }, 0);
})

$(document).ready(function () {

  //попапы
  $('.fancybox').fancybox();

  //тогглер табов в навигации
  $('.js-authorize').on('click', function (e) {
    e.preventDefault();
    $('.js-tabs').slideToggle();
    $(this).hide();
  })


  // тогглер меню
  $('.js-toggler').on('click tap', function (e) {
    e.stopPropagation();
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
    $('.book-nav').removeClass('active');
  });


  // тогглер меню
  $('.js-toggler-book').on('click tap', function (e) {
    e.stopPropagation();
    $('.languages-nav').removeClass('active');
    $('.book-nav').toggleClass('active');
    $('.nav').removeClass('active');
    if ($('body').hasClass('open-sidebar') && !$('.book-nav').hasClass('active')) {
      $('body').removeClass('open-sidebar');
    }
    else {
      $('body').addClass('open-sidebar');	  
    }

  });
  
  $('.st__btn').on('click tap', function (e) {
	  // $('.languages-nav').toggleClass('active');
	  $('.settings-nav').toggleClass('visible');
	  $('.settings-div').toggleClass('hidden');	  
  });

  //отлавливаем клики и скрываем менюшки
  $(document).click(function (event) {
    if (!$(event.target).closest('.nav').length) {
      if ($('.nav').is(":visible")) {
        $('.nav').removeClass('active');
      }
    }
    // if (!$(event.target).closest('.book-nav').length) {
      // if ($('.book-nav').is(":visible")) {
        // $('.book-nav').removeClass('active');
      // }
    // }
    if (!$(event.target).closest('.settings').length) {
      $('.settings').fadeOut();
    }
  })


  // табы
  $('.js-tabs').on('click', '.js-tabs-head', function () {
    var $current = $(this);
    $current.addClass('active').siblings().removeClass('active');
    $current.closest('.js-tabs').find('.js-tabs-item').removeClass('active').eq($current.index()).addClass('active');
  });

  /*
  $('.js-slide-parent').on('click', '.book-nav__link', function () {
    $(this).parent().toggleClass('active').find('.js-slide-child').slideToggle('fast');
    $(this).parent().siblings().removeClass('active').find('.js-slide-child').slideUp('fast');
  });
  */

  // языки
  $('.click-nav > ul').toggleClass('no-js js');
  $('.click-nav .js ul').hide();
  $('.click-nav .js').click(function (e) {
    $('.click-nav .js ul').slideToggle(200);
    $('.clicker').toggleClass('active');
    $('.click-nav').toggleClass('click-active');
    e.stopPropagation();
  });
  
  $(document).click(function () {
    if ($('.click-nav .js ul').is(':visible')) {
      $('.click-nav .js ul', this).slideUp();
      $('.clicker').removeClass('active');
      $('.click-nav').removeClass('click-active');
    }
  });

  $('.js-filters-block input').on('click', function () {
    $('.js-filters-block input:checked').length && $('.js-clear-filters').fadeIn()
  })

  $('.js-clear-filters').on('click', function (e) {
    e.preventDefault();
    var $parent = $(this).closest('.js-filters');
    $(this).fadeOut().closest('.js-filters').find('input[type="radio"].js-popular').prop('checked', true);
    $parent.find('input[type="checkbox"]').prop('checked', true);
  });

  $('.js-filters-close').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.js-filters').fadeOut();
    $('.js-filters-call').toggleClass('active');
    $('.page-title').toggle();
    $('body').removeClass('oh')

  });

  $('.js-filters-call').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.fa-user').removeClass('active');
    $('.page-title').toggle();
    $('.js-filters').fadeToggle();
    $('body').toggleClass('oh')
  });


  console.log(editHeight)
  //фикс панельки битрикса
  if ($('#bx-panel').length) {
    var offset = $('#bx-panel').height();

    if ($('.js-edit').length) {
      var editHeight = parseInt($('.js-edit').css('top'))
      $('.js-edit').css('top', editHeight + offset + 'px')
    }
    $('.header-container').css('top', offset + 'px');
    $('.nav').css('top', offset + 'px');
    $('.book-nav').css('top', offset + 'px');
    $('.edit-ico').css('margin-top', offset + 50 + 'px');
    $(window).scroll(function (e) {
      var scrollTop = $(this).scrollTop();
      if (scrollTop <= offset) {
        $('.header-container').css('margin-top', -scrollTop + 'px')
        $('.nav').css('margin-top', -scrollTop + 'px')
        $('.book-nav').css('margin-top', -scrollTop + 'px')
      }
      if (scrollTop > offset) {
        $('.header-container').css('margin-top', -offset + 'px')
        $('.nav').css('margin-top', -offset + 'px')
        $('.book-nav').css('margin-top', -offset + 'px')
        $('.edit-ico').css('margin-top', offset + 50 + +'px')
      }
    });
  }

  $(document).on('click', '.js-add-langjs-add-language', function() {
    $('.add-book-form__add-language').append('<div class="add-next-language"><div class="book-language add-book-form__select"><select id="book-language"> <option value="en">EN</option><option value="ru">RU</option><option value="fr">FR</option></select></div></div><div class="add-book-form__title"><input type="text" placeholder="Title"></div>');
    $('.book-language').each(function(i){
      $(this).find('select').attr('id', 'book-language_'+i );
    });
    $('.add-book-form__title').each(function(i){
      $(this).find('input').attr('id', 'add-book-title_'+i );
    });
  });

  $(document).on('click tap', '.js-toggler-book', function(e) {
    e.stopPropagation();
    $('.book-nav').toggleClass('active');
    $('.nav').removeClass('active')
  });

  $(document).on('click tap', '.js-languages-item', function(e) {
    e.stopPropagation();
    $('.js-languages-item').removeClass('active');
    $(this).addClass('active');
    //$('.book-nav').append('<div class="book-language__title"><span>Title<i class="fa fa-pencil"></i></span></div>')
  });

  $('.js-languages-item').on('click', function (e) {
    e.preventDefault();
    $('.languages-content').removeClass('active');
    //$('.courses-dropdown__link').removeClass('courses-dropdown__link_active');
    //$(this).addClass('courses-dropdown__link_active');
    var $target = $(this).data('target');
    $("[data-content=" + $target + "]").addClass('active');
    //$('.nav__sublist').hide();
    //$('.js-sublist-title').text($(e.target).text())
  })

  //Preview  Image
  $('#image_file_upload').change(function() {
        var filename = $('#image_file_upload').val();
        $('.add-book-form__filename').html(filename);
    });



  /* File Upload Functions */
  /*
	function maskImgs() {
		$.each($('.img-wrapper img'), function(index, img) {
			var src = $(img).attr('src');
			var parent = $(img).parent();
      var parentLevel = $(img).parents('.file-upload-wrapper');
			parent
				.css('background', 'url(' + src + ') no-repeat center center')
				.css('background-size', 'cover');
      parentLevel.addClass('active-image');
			$(img).remove();
		});
	}

	var preview = {
		init: function() {
			preview.setPreviewImg();
			preview.listenInput();
		},
		setPreviewImg: function(fileInput) {
			var path = $(fileInput).val();
			var uploadText = $(fileInput).parents('.book-upload').find('.file-upload-text');

			if (!path) {
				$(uploadText).val('');
			} else {
				path = path.replace(/^C:\\fakepath\\/, "");
				$(uploadText).val(path);

				preview.showPreview(fileInput, path, uploadText);
			}
		},
		showPreview: function(fileInput, path, uploadText) {
			var file = $(fileInput)[0].files;

			if (file && file[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					var previewImg = $(fileInput).siblings('.preview');
					var img = $(previewImg).find('img');

					if (img.length == 0) {
						$(previewImg).html('<img src="' + e.target.result + '" alt=""/>');
					} else {
						img.attr('src', e.target.result);
					}

					uploadText.val(path);
					maskImgs();
				}

				reader.onloadstart = function() {
					$(uploadText).val('uploading..');
				}

				reader.readAsDataURL(file[0]);
			}
		},
		listenInput: function() {
			$('.file-upload-native').on('change', function() {
				preview.setPreviewImg(this);
			});
		}
	};
	preview.init();

  /* Languages menu */
  $(document).on('click', '.js-languages-menu', function() {
    $('.book-nav').removeClass('active');
    $('.languages-nav').toggleClass('active');
    if ($('body').hasClass('open-sidebar') && !$('.languages-nav').hasClass('active')) {
      $('body').removeClass('open-sidebar');
    }
    else {
      $('body').addClass('open-sidebar');
    }
  });

  $('.languages-info').tooltipster({
   animation: 'fade',
   delay: 200,
   theme: 'tooltipster-punk',
   trigger: 'click'
  });

  $(document).on('change', '.languages-nav select', function(){
    $('.languages-nav button').addClass('active');
  });

  $(document).on('change', '.settings select, .settings input', function(){
    $('.settings button').addClass('active');
  });

  $('.languages-form').on('change', function(){
    $('.languages-nav button').addClass('active');
  });

  /* Scroll Header */
  $(window).scroll(function(){
     if ($(this).scrollTop() > 0){
        $('.redactor .header').addClass("scrolled");
     }
     else{
        $('.redactor .header').removeClass("scrolled");
     }
   });

  $('#languages-submit').on('click', function(e){
    e.preventDefault();
    $('.redactor-item').remove();
    var k = $(".redactor .languages-nav option[selected='selected']").length;
    for (var i=0; i<k; i++) {
      $('.book-redactor').append('<div class="book-redactor__item redactor-item"><div class="redactor-item__heading text-center"><a class="redactor-item__heading-language">EN</a></div><div class="redactor-item__content"></div></div>');
    }
    var $redactorItem = $('.redactor-item');
    if (k == 1) {
      $redactorItem.css('width', '100%');
    }
    else if (k == 2) {
      $redactorItem.css('width', '50%');
    }
    else {
      $redactorItem.css('width', '400px');
    }
    console.log(k);
  });

   $(function() {
     var $redactorItem = $('.redactor-item');
     var k = $redactorItem.length;
     if (k == 1) {
       $redactorItem.css('width', '100%');
     }
     else if (k == 2) {
       $redactorItem.css('width', '50%');
     }
     else {
       $redactorItem.css('width', '400px');
     }
   });

   $('.header__book-indicator').on('click', function(e){
     $('.sync-menu').css('top', '0');
   });

   /* Active class to type buttons on  Sync page */
   $('.sync-menu__actions a').on('click', function(e){
     e.preventDefault();
     $('.sync-menu__actions a').removeClass('active');
     $(this).addClass('active');
     if ($('.sync-menu__link-cells').hasClass('active')) {
       $('.cell').addClass('active');
       $(".cell").each(function (i) {
         $(".redactor-item-translate .redactor-item__content").append('<span class="cell-translate cell-translate_'+ i +'"></span>');
         $(".cell-translate_" + i + "").height($(this).height());
         $(".cell-translate_" + i + "").offset({top:$(this).offset().top, left:0});
         if ($(this).hasClass('cell-three')) {
           $(".cell-translate_" + i + "").css({'border-top':'4px solid #555', 'background':'#ccc'});
           $(".cell-translate_" + i + "").height($(this).height());
         }
         else if($(this).hasClass('cell-two')) {
           $(".cell-translate_" + i + "").css('background', '#ccc');
         }
         else if($(this).hasClass('cell')) {
           $(".cell-translate_" + i + "").css('background', '#fff');
         }
      });
     }
     else {
       $('.cell').removeClass('active');
       $('.cell-translate').remove();
     }
   });

   // Show percents of complete in sync menu
   $('.sync-menu__submit').on('click', function(e){
     e.preventDefault();
     $(this).remove();
     $('.sync-menu__percents').fadeIn();
   });

   $('.js-waveform').on('click', function(e) {
     e.preventDefault();
     if ($(this).hasClass('active')) {
       $(this).removeClass('active');
       $('.waveform').fadeOut();
     }
     else {
       $(this).addClass('active');
       $('.waveform').fadeIn();
     }
   });
});

$('#waveform').on('change', function() {
  var waveformWidth = $(this).width();
  $('.scroll-waveform').width(waveformWidth);
});
