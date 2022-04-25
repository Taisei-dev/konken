/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*-- address bar -------------------------------------------------------------------*/
// アドレスバー非表示
window.addEventListener('load', function () {
	setTimeout(doScroll, 100);
}, false);  
  
// iPhoneを回転させた場合にもステータスバーを消す  
window.onorientationchange = function() {
	setTimeout(doScroll, 100);
};  
  
function doScroll() {
	if (window.pageYOffset === 0) {
		window.scrollTo(0, 1);
	}
}
/*-- other ------------------------------------------------------------------------*/

// link area
$(function() {
    $('.stopBusBox01.type01 li').click(function() {
       	if ($(this).find('a').attr('href')) {
            window.location = $(this).find('a').attr('href');
        }
        return false;
    });
});

// tab
$(function() {
	$(".timetableBox").css('display','none');
	$(".navi_timetable li").click(function() {
		var num = $(".navi_timetable li").index(this);
		$(".timetableBox").css('display','none');
		$(".timetableBox").eq(num).css('display','block');
		$(".navi_timetable li").removeClass('stay');
		$(this).addClass('stay');
	
		if ($('.navi_timetable li.li01').hasClass('stay')) {
			$('.navi_timetable li.li02, .navi_timetable li.li03').children('span').css('paddingBottom','4px');
			$(this).parents('body').css('backgroundColor','#FFF');
		} else if ($('.navi_timetable li.li02').hasClass('stay')) {
			$('.navi_timetable li.li02, .navi_timetable li.li03').children('span').css('paddingBottom','5px');
			$(this).parents('body').css('backgroundColor','#D0F3FF');
		} else {
			$('.navi_timetable li.li02, .navi_timetable li.li03').children('span').css('paddingBottom','5px');
			$(this).parents('body').css('backgroundColor','#FFDDDD');
		}
	});
	$(".timetableBox:first").css('display','block');
});

