/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$.ajax({
    type: "GET",
    url: "/apiv1/cookie/histories/latlng/center",
    dataType: "json",
    success: function (latlng) {
        var lat = parseFloat(latlng.latitude);
        var lon = parseFloat(latlng.longitude);
        if (!isNaN(lat) && !isNaN(lon)) {
            localStorage.setItem('lat', lat);
            localStorage.setItem('lon', lon);
        }
    }
});

