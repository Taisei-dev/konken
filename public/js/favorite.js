$(function(){
    $("#favorite a").click(function(){
        $(".fav,.fav-inner").addClass("active");
        if($("#favorite a img").attr("src")=="/img/common/icon_favo.png") {
            $(".no").css("display","none");
            $(".on").css("display","block");
        } if ($("#favorite a img").attr("src")=="/img/common/icon_favo_on.png") {
            $(".no").css("display","block");
            $(".on").css("display","none");
        } 
    });
    $(function(){
        $(".fav,.close").on("click", function() {
            $(".fav,.fav-inner").removeClass("active");
        });
    });
});

    $(function(){  
        var left = Math.floor(($(window).width() - $(".fav-inner").width()) / 2);  
        var top  = Math.floor(($(window).height() - $(".fav-inner").height()) / 2);  
        $(".fav-inner")  
            .css({  
                "top": top,  
                "left": left,  
                "opacity": 1  
             })  
           
    });
