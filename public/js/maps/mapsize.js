var b = 45;   // アプリケーションバーの高さ 45px
var w = '375px';            // width  default
var h = (667 - b) + 'px';   // height default
if (document.all) {
    w = document.body.clientWidth + 'px';
    h = (document.body.clientHeight - b) + 'px';
} else {
    w = innerWidth + 'px';
    h = (innerHeight - b) + 'px';
}
var mc = document.getElementById('map_canvas');
//console.log(w);
//console.log(h);
mc.style.width = w;
mc.style.height = h;
