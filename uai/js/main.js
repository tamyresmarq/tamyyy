jQuery(document).ready(function($) {

    // Range Slider init
    if($("#yearSlider").length == 1 ){
      var sliderB = new Slider("#yearSlider", {
        min: 2000,
        max: 2019,
        value: [2010, 2015],
        labelledby: ['year-from', 'year-to']
      });
    }

    if($(".radio-container").length >= 1 ){
      $('.radio-container').click(function(e){
        $('.radio-container').removeClass('active' );
        $(this).addClass('active');
      });
    }

    // Login modal
    $(".logar").on('click', function(){
      $("#logar").addClass('opened');
      $("#banner-flutuante-unique").css('display', 'none');
    });
    $("#logar .close").on("click", function() {
      $("#logar").removeClass("opened");
      $("#banner-flutuante-unique").css('display', '');
    });
    $(".logar-acesso").on("click", function() {
      $("#logar").removeClass("opened");
      $("#banner-flutuante-unique").css('display', '');
      $(".logar").hide();
      $(".user").addClass("logado");
    });
    $(".conta").on("click", function() {
      $("#conta").addClass("opened");
    });
    $("#conta .close").on("click", function() {
      $("#conta").removeClass("opened");
      $("#banner-flutuante-unique").css('display', '');
    });

    // Megamenu
    $(".megamenu .menu-item").mouseenter(function() {
      $(".menu-aberto").removeClass("active");
        $(this).find(".menu-aberto").addClass("active");
      });
      $(".menu-aberto").mouseleave(function() {
        $('body').removeClass("active-menu-aberto");
      });
      $(".megamenu").mouseleave(function() {
        $(".menu-aberto").removeClass("active");
      });
      $(".menu-aberto .close").on("click", function() {
        $(".menu-aberto").removeClass("active");
    });

    // Floting banner
    var abre = function() {
      $('.banner-flutuante').animate({ right: "50px" }, 'swing');
    }
    var fecha = function() {
      $('.banner-flutuante').animate({ right: "50px" }, 'swing');
      $('.banner').removeClass('click');
    }
    var abreApoei1 = function () {
      $('.banner.banner1').addClass('click');
      $('.banner.banner2').removeClass('click');
      abre();
      $('.banner.banner1 #defensor').animate({ right: "0px" }, 200);
      $(".banner.banner1 .content").show();
      $(".banner.banner2 .content").hide();
    }
    var fechaApoei1 = function () {
      $('.banner.banner1 #defensor').animate({ right: "-496px" }, 200, function() {
        $(".banner.banner1 .content").hide();
      });
    }
    var abreApoei2 = function () {
      $('.banner.banner2').addClass('click');
      $('.banner.banner1').removeClass('click');
      abre();
      $(".banner.banner2 #newsletter").animate({ right: "0" }, 200);
      $(".banner.banner2 .content").show();
      $(".banner.banner1 .content").hide();
    }
    var fechaApoei2 = function () {
      $('.banner.banner2 #newsletter').animate({ right: "-496px" }, 200, function() {
        $(".banner.banner2 .content").hide();
      });
    }

    $('.banner-flutuante .banner.banner1 .rounded-banner, .banner-flutuante .banner.banner1 .texto').on('click', function () {
      abreApoei1();
      fechaApoei2();
    })

    $('.banner-flutuante #defensor .close').on('click', function () {
      fechaApoei1();
      fecha();
    })

    $('.banner-flutuante .banner.banner2 img').on('click', function () {
      abreApoei2();
      fechaApoei1();
    })

    $('.banner-flutuante #newsletter .close').on('click', function () {
      fechaApoei2();
      fecha();
    })

    $('input[data-mask]').each( function() {
        $(this).mask( $( this ).attr('data-mask') );
    });

    fechaApoei1();
    fechaApoei2();

    // Read more links
    $('.sos-post-card').each(function() {
        const postLink = $(this).find('a').attr('href');
        const readMore = $(this).find('.read-more-link');

        readMore.css('cursor', 'pointer');
        readMore.click(function() {
            document.location.href = postLink;
        });
    });
});