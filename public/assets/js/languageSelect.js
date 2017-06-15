$(function () {


  var languages = ($.parseJSON($('#json_languages').html()));
  var availableLangs = languages.languages;
  var choosenLangs = [];
  var $languagesForm = $('.js-languages-list');
  var $languagesList = $languagesForm.find('ol');
  var $btn = $languagesForm.find('button');



  $($languagesForm).submit(function (event) {
    //event.preventDefault();
    //console.log('qqqq');
    //console.log( $( this ).serialize() );
  });

  choosenLangs.push(languages.primary);
  for (var key in languages.secondary) {
    choosenLangs.push(languages.secondary[key]);
  }
  var langs;


  function languages_tooltip() {
    $('.languages-info').tooltipster({
     animation: 'fade',
     delay: 200,
     theme: 'tooltipster-punk',
     trigger: 'click'
    });
  }
  var firstItem = true;

  function generateSelect(selected, available) {
    langs = $.extend({}, available);
    $languagesList.empty();
    firstItem = true;
    $.each(selected, function (key, value) {
      var current = value;
      var $el;
      if (firstItem) {
        $el = $('<li><div class="select-wrap"><select name="primary" class="js-lang-select"></select></div><span class="languages-info delete-lang"><i class="fa fa-minus"></i></span></li>');
        firstItem = false;
      } else {
        $el = $('<li><div class="select-wrap"><select name="secondary[]" class="js-lang-select"></select></div><span class="languages-info delete-lang"><i class="fa fa-minus"></i></span></li>');
      }
      var $select = $el.find('select');
      $('<option value="">Выберите язык</option>').appendTo($select);
      $.each(langs, function (key, value) {
        var $option = $('<option value=' + key + '>' + value + '</option>');
        if (current == key) {
          $option.attr('selected', 'selected')
        }
        $option.appendTo($select);


        languages_tooltip()
      });
      delete langs[current];
      $el.appendTo($languagesList);

      languages_tooltip()
    });
  }

  function addSelect(available) {
    if (Object.keys(available).length == 1 || $('.js-lang-select').length >= Object.keys(availableLangs).length - 1) {
      $('.js-add-lang').hide();
    }
    var $el = $('<li><div class="select-wrap"><select name=""  class="js-lang-select"></select></div><span class="languages-info delete-lang"><i class="fa fa-minus"></i></span></li>');
    var $select = $el.find('select');
    $('<option value="">Выберите язык</option>').appendTo($select);
    $.each(available, function (key, value) {
      var $option = $('<option value=' + key + '>' + value + '</option>');
      $option.appendTo($select);
    });
    // delete langs[current];	
    $el.appendTo($languagesList);
    languages_tooltip();
	//удаляем выбранный язык
	$('.delete-lang').on('click tap', function (e){	 
	  $(this).parent().remove();
	  e.stopPropagation();
	});
  }

  $('body').on('change', '.js-lang-select', function () {
    var langs = [];
    $.each($('.js-lang-select'), function () {
      langs.push(parseInt($(this).val()));
      //console.log(langs);
    });
    //generateSelect(langs, availableLangs);
  });

  generateSelect(choosenLangs, availableLangs);

  //console.log(languages);

  $('.js-add-lang').on('click tap', function (e) {
    e.preventDefault();
    addSelect(langs);
  }); 
  
  
});
