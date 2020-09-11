$(window).load(function () {
  // img to svg   
  $('.to-svg').each(function (index, el) {
    $.imgToSvg($(this));
  });
  // resizing
  $('.js-resizing').each(function (index, el) {
    $.resizing($(this));
  });

  // menu fixed
  /* var alturamenu = $(window).height();
  console.log(alturamenu);
  $(window).on('scroll', function() {
      if ($(window).scrollTop() > alturamenu) {
          $('.content-header').addClass('menu-fixed');
      } else {
          $('.content-header').removeClass('menu-fixed');
      }
  }); */

  // Bottom up
  $('#btn-icon-up').click(function(){
    $('body, html').animate({
      scrollTop: '0px'
    }, 300);
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 300){
      $('#btn-icon-up').slideDown(300);
    }else{
      $('#btn-icon-up').slideUp(300);
    };
  });

  // Bottom responsive
  var trigger = $('#hamburger'),
    isClosed = true;

  trigger.click(function () {
    burgerTime();
  });

  function burgerTime() {
    if (isClosed == false) {
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = true;
      $('.content-header').removeClass('active-menu');
    } else {
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = false;
      $('.content-header').addClass('active-menu');
    }
  }

  // FANCYBOX
  $('.fancybox-thumb').fancybox({
    openEffect: "zoom",
    closeEffect: "zoom",
    padding: 4,
    helpers: {
      media: {}
    }
  });
  //Tabs about
  $('ul.tabs-content li:first').addClass('active');
  $('.content-section-tabs article').hide();
  $('.content-section-tabs article:first').show();

  $('ul.tabs-content li a').click(function () {
    $('ul.tabs-content li').removeClass('active');
    $(this).parent().addClass('active');
    $('.content-section-tabs article').hide();

    var activeTab = $(this).attr('href');
    $(activeTab).show();
    return false;
  });
  // Slider
  $('.flexslider').flexslider({
    animation: "slide",
    controlNav: ""
  });
});

//Change img -> svg
$.imgToSvg = function (image) {
  var $img = image;
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  $.get(imgURL, function (data) {
    var $svg = jQuery(data).find('svg');
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    $img.replaceWith($svg);

    if ($img.hasClass('map-animate'))
      $.myScrollAnimate();
  }, 'xml');
}
//Resizing
$.resizing = function (element) {
    $(window).resize(function () {
      var width = element.outerWidth();
      element.css({
        height: width * eval(element.attr("data-resizing"))
      }), element.hasClass("panel") && element.parent().find(".panel").css({
        height: width * eval(element.attr("data-resizing"))
      })
    }).resize()
  },

  // POPUPS
  $.activeLoading = function () {
    $(".modal__loading").addClass("active")
  }, $.deactiveLoading = function () {
    $(".modal__loading").removeClass("active")
  }, $.showMessage = function (t, e) {
    e = e || "", $box = $(".message__popup"), $box.find(".message__text").text(t), $box.addClass("active"), setTimeout(function () {
      $box.removeClass("active"), setTimeout(function () {
        $box.find(".message__text").text("")
      }, 400)
    }, 8e3)
  }, $.showMessagePopUp = function (t, e) {
    e = e || "", $box = $("#ventana-modal"), $box.find(".message__text").text(t), $box.addClass("active"), setTimeout(function () {
      $box.removeClass("active"), setTimeout(function () {
        $box.find(".message__text").text("")
      }, 400)
    }, 8e3)
  }