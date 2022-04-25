
//$(document).ready(function() {
//    var owl = $("#bus");
//    owl.owlCarousel({
//        items : 6, //ブラウザの幅が1199px 以上の時 6
//        itemsDesktop : [1199,6], // 1199px から 600px　まで 6つ
//        itemsDesktopSmall : false, // betweem 900px and 601px
//        itemsTablet: [600,5], //600px から 479px　まで　5つ
//        itemsMobile : [375,4], // 479px　以下は 4つ
//        navigation : true,
//        lazyLoad : true
//    });
//});
//
$(document).ready(function() {
$('#bus').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:4,
            nav:true
        },
        600:{
            items:5,
            nav:true
        },
        1000:{
            items:6,
            nav:true,
            loop:false
        }
    }
});
});

$(function(){
        $(".dropdown").on("click", function() {
            $(this).next("div").slideToggle();
            $(this).toggleClass("active");//追加部分
        });
    });
