/* -------------------------------------------

Name: 		Tastyc
Version:  1.0
Author:		Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). mail: miller.themes@gmail.com

------------------------------------------- */
$(function() {

  "use strict";
  /*-------------------------
  preload
  -------------------------*/
  $(document).ready(function() {
    $('.tst-menu-frame').addClass('tst-active');
    $('html').addClass('is-animating');
    setTimeout(function() {
      $(".tst-app").animate({
        opacity: 1
      }, {
        duration: 400,
        complete: function() {
          $('html').removeClass('is-animating');
          $('.tst-menu-frame').removeClass('tst-active');
        }
      });
    }, 1200);
  });
  /*-------------------------
  swup js
  -------------------------*/
  const options = {
    containers: ['#tst-dynamic-content', '#tst-dynamic-menu , #tst-dynamic-banner'],
    animateHistoryBrowsing: true,
    linkSelector: '.tst-menu nav ul li a:not([data-no-swup]), .tst-anima-link:not([data-no-swup])',
    animationSelector: '[class="tst-dynamic-banner"]'
  };
  const swup = new Swup(options);
  /*-------------------------
  datepicker
  -------------------------*/
  $('#my-element').datepicker({
    minDate: new Date(),
  });
  /*-------------------------
  nice select
  -------------------------*/
  $('select').niceSelect();
  /*-------------------------
  mobile menu
  -------------------------*/
  if ($(window).width() < 992) {
    $('.menu-item-has-children > a').addClass('mobile-fix');
  }
  $('.mobile-fix').attr('href', '');
  $('.tst-menu-btn').on('click', function() {
    $('.tst-menu-btn , .tst-menu nav').toggleClass('tst-active');
    $('.tst-minicart-window , .tst-popup-bg').removeClass('tst-active');
  });
  /*-------------------------
  minicart
  -------------------------*/
  $('.tst-cart').on('click', function() {
    $('.tst-minicart-window').toggleClass('tst-active');
    $('.tst-menu-btn , .tst-menu nav , .tst-popup-bg').removeClass('tst-active');
  });

  $('.woocommerce-mini-cart__buttons a').on('click', function() {
    $('.tst-minicart-window').removeClass('tst-active');
  });
  /*-------------------------
  popup
  -------------------------*/
  $('.tst-res-btn').on('click', function() {
    $('.tst-popup-bg').toggleClass('tst-active');
    $('.tst-minicart-window , .tst-menu-btn , .tst-menu nav').removeClass('tst-active');
  });
  $('.tst-close-popup').on('click', function() {
    $('.tst-popup-bg').removeClass('tst-active');
  });
  /*-------------------------
  menu after scroll
  -------------------------*/
  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 120) {
      $(".tst-menu-frame").addClass("tst-active");
    } else {
      $(".tst-menu-frame").removeClass("tst-active");
    }
  });
  /*-------------------------
  main title after scroll
  -------------------------*/
  $(window).scroll(function() {
    $(".tst-main-title , .tst-main-slider-nav , .tst-main-pagination").css("opacity", 1 - $(window).scrollTop() / 500);
  });
  /*-------------------------
  parallax
  -------------------------*/
  $(window).on('scroll', parallax)

  function parallax() {
    var s = $(window).scrollTop();

    function parallaxDown(e, t) {
      $(e).css({
        'position': 'relative',
        'top': (s * t) + 'px'
      });
    }
    parallaxDown('.tst-parallax', .3);
  }
  /*-------------------------
  fade scroll object
  -------------------------*/
  $(window).scroll(function() {
    $('.tst-fade-up , .tst-fade-down').each(function(i) {
      var bottom_of_object = $(this).offset().top - 200 + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window > bottom_of_object) {
        $(this).addClass('tst-active');
      }
      if (bottom_of_window < bottom_of_object) {
        $(this).removeClass('tst-active');
      }
    });
  });
  if ($(window).width() < 992) {
    $('footer').removeClass('tst-fade-down');
  } else {
    $('footer').addClass('tst-fade-down');
  }
  $(window).on('resize orientationChange', function(event) {
    if ($(window).width() < 992) {
      $('footer').removeClass('tst-fade-down');
    } else {
      $('footer').addClass('tst-fade-down');
    }
  });
  /*-------------------------
  onepage navigation and anchor scroll
  -------------------------*/
  $('.tst-onepage a , .tst-anchor-scroll').on("click", function() {
    $(".tst-onepage .current-menu-item").removeClass("current-menu-item");
    $(this).closest('li').addClass("current-menu-item");
    var theClass = $(this).attr("class");
    $('.' + theClass).parent('li').addClass('current-menu-item');
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 140
    }, 800);
    return false;
  });
  /*-------------------------
  fancybox
  -------------------------*/
  $('[data-fancybox="gal"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1000,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });
  /*-------------------------
  just slider
  -------------------------*/
  $.fancybox.defaults.hash = false;
  var swiper = new Swiper('.tst-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      prevEl: '.tst-prev',
      nextEl: '.tst-next',
    },
    pagination: {
      el: '.tst-blog-pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  /*-------------------------
  banner slider
  -------------------------*/
  var swiper = new Swiper('.tst-main-slider', {
    slidesPerView: 1,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.tst-main-pagination',
      clickable: true,
    },
    parallax: true,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      prevEl: '.tst-main-prev',
      nextEl: '.tst-main-next',
    },
  });
  /*-------------------------
  footer gallery slider
  -------------------------*/
  var swiper = new Swiper('.tst-footer-gallery', {
    slidesPerView: 4,
    spaceBetween: 15,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      prevEl: '.tst-fg-prev',
      nextEl: '.tst-fg-next',
    },
  });
  /*-------------------------
  testimonials slider
  -------------------------*/
  var swiper = new Swiper('.tst-testimonials-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    centeredSlides: true,
    loop: true,
    navigation: {
      prevEl: '.tst-testi-prev',
      nextEl: '.tst-testi-next',
    },
    pagination: {
      el: '.tst-testi-pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
      },
    },
  });
  /*-------------------------
  menu slider
  -------------------------*/
  var menu = ['Main dishes', 'Salads', 'Drinks', 'Desserts']
  var mySwiper = new Swiper('.swiper-menu', {
    effect: 'fade',
    parallax: true,
    speed: 600,
    pagination: {
      el: '.swiper-menu-nav',
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + (menu[index]) + '</span>';
      },
    },
  })
  /*-------------------------
  counter up
  -------------------------*/
  var count = 0;
  $(window).scroll(function() {
    var oTop = $('.tst-number').offset().top - window.innerHeight;
    if (count == 0 && $(window).scrollTop() > oTop) {
      $('.tst-number').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 3000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }
        });
      });
      count = 1;
    }
  });
  /*-------------------------
  map
  -------------------------*/
  if ($("div").is("#map")) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/stoscar/ckggs77460wxw19ob8q5wldwf',
      center: [-79.394900, 43.643102],
      zoom: 13

    });

    var marker = new mapboxgl.Marker()
      .setLngLat([-79.394900, 43.643102])
      .addTo(map);
  }
  $('.tst-lock').on('click', function() {
    $('.tst-with-map').toggleClass('tst-active');
    $('.tst-map').toggleClass('tst-active');
    $('.tst-lock').toggleClass('tst-active');
    $('.tst-lock .fas').toggleClass('fa-unlock');
  });
  /*----------------------------------------------------------
  ------------------------------------------------------------

  REINIT

  ------------------------------------------------------------
  ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function() {
    /*-------------------------
    scroll up after transition
    -------------------------*/
    if ($('html').hasClass('is-rendering')) {
      $("html, body").animate({
        scrollTop: 0
      }, {
        duration: 0,
        complete: function() {}
      });
    }
    /*-------------------------
    clean vievport
    -------------------------*/
    $('.tst-minicart-window , .tst-popup-bg , .tst-menu-btn , .tst-menu nav').removeClass('tst-active');
    /*-------------------------
    mobile menu
    -------------------------*/
    if ($(window).width() < 992) {
      $('.menu-item-has-children > a').addClass('mobile-fix');
    }
    $('.mobile-fix').attr('href', '');
    $('.tst-menu-btn').on('click', function() {
      $('.tst-menu-btn , .tst-menu nav').toggleClass('tst-active');
      $('.tst-minicart-window , .tst-popup-bg').removeClass('tst-active');
    });
    /*-------------------------
    minicart
    -------------------------*/
    $('.tst-cart').on('click', function() {
      $('.tst-minicart-window').toggleClass('tst-active');
      $('.tst-menu-btn , .tst-menu nav , .tst-popup-bg').removeClass('tst-active');
    });

    $('.woocommerce-mini-cart__buttons a').on('click', function() {
      $('.tst-minicart-window').removeClass('tst-active');
    });
    /*-------------------------
    popup
    -------------------------*/
    $('.tst-res-btn').on('click', function() {
      $('.tst-popup-bg').toggleClass('tst-active');
      $('.tst-minicart-window , .tst-menu-btn , .tst-menu nav').removeClass('tst-active');
    });
    $('.tst-close-popup').on('click', function() {
      $('.tst-popup-bg').removeClass('tst-active');
    });

    /*-------------------------
    onepage navigation and anchor scroll
    -------------------------*/
    $('.tst-onepage a , .tst-anchor-scroll').on("click", function() {
      $(".tst-onepage .current-menu-item").removeClass("current-menu-item");
      $(this).closest('li').addClass("current-menu-item");
      var theClass = $(this).attr("class");
      $('.' + theClass).parent('li').addClass('current-menu-item');
      $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 140
      }, 800);
      return false;
    });
    /*-------------------------
    fancybox
    -------------------------*/
    $('[data-fancybox="gal"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1000,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $.fancybox.defaults.hash = false;
    /*-------------------------
    just slider
    -------------------------*/
    $.fancybox.defaults.hash = false;
    var swiper = new Swiper('.tst-slider', {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      navigation: {
        prevEl: '.tst-prev',
        nextEl: '.tst-next',
      },
      pagination: {
        el: '.tst-blog-pagination',
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    /*-------------------------
    banner slider
    -------------------------*/
    var swiper = new Swiper('.tst-main-slider', {
      slidesPerView: 1,
      speed: 800,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.tst-main-pagination',
        clickable: true,
      },
      parallax: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: '.tst-main-prev',
        nextEl: '.tst-main-next',
      },
    });
    /*-------------------------
    footer gallery slider
    -------------------------*/
    var swiper = new Swiper('.tst-footer-gallery', {
      slidesPerView: 4,
      spaceBetween: 15,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        prevEl: '.tst-fg-prev',
        nextEl: '.tst-fg-next',
      },
    });
    /*-------------------------
    testimonials slider
    -------------------------*/
    var swiper = new Swiper('.tst-testimonials-slider', {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      centeredSlides: true,
      loop: true,
      navigation: {
        prevEl: '.tst-testi-prev',
        nextEl: '.tst-testi-next',
      },
      pagination: {
        el: '.tst-testi-pagination',
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
        },
      },
    });
    /*-------------------------
    menu slider
    -------------------------*/
    var menu = ['Main dishes', 'Salads', 'Drinks', 'Desserts']
    var mySwiper = new Swiper('.swiper-menu', {
      effect: 'fade',
      parallax: true,
      speed: 600,
      pagination: {
        el: '.swiper-menu-nav',
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },
      },
    })
    /*-------------------------
    counter up
    -------------------------*/
    var count = 0;
    $(window).scroll(function() {
      var oTop = $('.tst-number').offset().top - window.innerHeight;
      if (count == 0 && $(window).scrollTop() > oTop) {
        $('.tst-number').each(function() {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 3000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
        });
        count = 1;
      }
    });
    /*-------------------------
    map
    -------------------------*/
    if ($("div").is("#map")) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/stoscar/ckggs77460wxw19ob8q5wldwf',
        center: [-79.394900, 43.643102],
        zoom: 13

      });
      var marker = new mapboxgl.Marker()
        .setLngLat([-79.394900, 43.643102])
        .addTo(map);
    }
    $('.tst-lock').on('click', function() {
      $('.tst-with-map').toggleClass('tst-active');
      $('.tst-map').toggleClass('tst-active');
      $('.tst-lock').toggleClass('tst-active');
      $('.tst-lock .fas').toggleClass('fa-unlock');
    });

  });
});
