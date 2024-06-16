/*jslint browser: true*/
/*global $, jQuery, alert*/
(function ($) {
    "use strict";
// aos active
    AOS.init({
        duration: 650,
          once: true
     });
    // Responsive Navigation JS
    $(".nav-mobile").click(function () {
        $(".navlist").stop().slideUp(300);
        $(this).next(".navlist").stop().slideToggle(300);
    });
    
    // testimonial-carosel
    $('.testimonial-carosel').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 300,
                settings: "unslick" // destroys slick
            }
        ]
    });

    // Featured profile slider
    $('.featured-profile-slider').slick({
        // dots: true,
        prevArrow: '<i class="fa-solid fa-angle-left slick-arrow absolute fz-24 gray-clr"></i>',
        nextArrow: '<i class="fa-solid fa-angle-right slick-arrow absolute fz-24 gray-clr"></i>',
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 300,
                settings: "unslick" // destroys slick
            }
        ]
    });

    // Stories gallery slider 1
    $('.s-gallery-1').slick({
        infinite: true,
        dots: false,
        speed: 800,
        arrows: false,
        slidesToShow: 3,
        vertical: true,
        cssEase: "linear",
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 300,
                settings: "unslick" // destroys slick
            }
        ]
    });
    // Stories gallery slider 2
    $('.s-gallery-2').slick({
        infinite: true,
        dots: false,
        speed: 2000,
        cssEase: "linear",
        slidesToShow: 3,
        arrows: false,
        vertical: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 300,
                settings: "unslick" // destroys slick
            }
        ]
    });


// new product carousel (shop page)
    $('.new-product-slider').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        autoHeight:true,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 1,
                nav: false,
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })

  // regular product carousel (shop page)
    $('.regular-product-slider').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        autoHeight:true,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 1,
                nav: false,
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })
  // regular product carousel (single shop page)
    $('.related-product-slider').owlCarousel({
        loop: true,
        autoplay: false,
        smartSpeed: 1000,
        dots: false,
        autoHeight:true,
        nav: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 1,
                nav: false,
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })


   










}(jQuery));

