/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    $("#q").focus(function () {
        var input = $(this).offset().top - 10;
        $('html,body').animate({scrollTop: input}, 'fast');
    });
});

$(function () {
    $('#q').autocomplete({
        source: function (req, res) {
            $.ajax({
                url: "/api/autocomplete?word=" + req.term,
                //data:{ selectLang: "ja", freeword: req.term },
                dataType: "json",
                success: function (data) {
                    res(data);
                }
            });
        },
        autoFocus: true,
        delay: 300,
        select: function (evnet, ui) {
            $(this).val(ui.item.value);
            $('#search').submit();
        },
        open: function (result) {
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $('.ui-autocomplete').off('menufocus hover mouseover');
            }
        },
        minLength: 2
    });
});
