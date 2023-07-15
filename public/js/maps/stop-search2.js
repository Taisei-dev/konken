// 2020.12.11GoogleMapからMapboxへ切替のため新規作成
mapboxgl.accessToken =
    "pk.eyJ1IjoidG93bmNyZWF0aW9uLWJ1c2l0IiwiYSI6ImNraWVieW90YTExa2MyeXF4bXRtcDBja24ifQ.86n8voLBP3hmzlCFnJGbNA";

// デフォルトlnglat 広島駅
var lat_default = 34.3977941;
var lon_default = 132.4731516;
var map;

function initMap() {
    // --- 現在地を取得 ---
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // (1) 位置情報の取得に成功した場合
            function (pos) {
                var lnglat = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                };
                displayMap(lnglat);
            },
            // （2）位置情報の取得に失敗した場合
            function (error) {
                var message = "";
                switch (error.code) {
                    // 位置情報が取得できない場合
                    case error.POSITION_UNAVAILABLE:
                        message = "位置情報の取得ができませんでした。";
                        break;
                    // Geolocationの使用が許可されない場合
                    case error.PERMISSION_DENIED:
                        message = "位置情報取得の使用許可がされませんでした。";
                        break;
                    // タイムアウトした場合
                    case error.PERMISSION_DENIED_TIMEOUT:
                        message = "位置情報取得中にタイムアウトしました。";
                        break;
                }
                var lnglat = { lat: lat_default, lon: lon_default };
                displayMap(lnglat);

                $.toast({
                    text: "位置情報が取得できませんでした。", //表示したいテキスト(HTML使用可)
                    showHideTransition: "slide", // 表示・消去時の演出
                    bgColor: "#333", // 背景色
                    textColor: "#eee", // 文字色
                    allowToastClose: false, // 閉じるボタンの表示・非表示
                    hideAfter: 3000, // 自動的に消去されるまでの時間(ミリ秒)(falseを指定すると自動消去されない)
                    stack: 5, // 一度に表示できる数
                    textAlign: "center", // テキストの配置
                    position: "bottom-center", // ページ内での表示位置
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    } else {
        message = "本ブラウザではGeolocationが使えません";
        console.log(message);
        $.toast({
            text: "位置情報が取得できませんでした。", //表示したいテキスト(HTML使用可)
            showHideTransition: "slide", // 表示・消去時の演出
            bgColor: "#333", // 背景色
            textColor: "#eee", // 文字色
            allowToastClose: false, // 閉じるボタンの表示・非表示
            hideAfter: 3000, // 自動的に消去されるまでの時間(ミリ秒)(falseを指定すると自動消去されない)
            stack: 5, // 一度に表示できる数
            textAlign: "center", // テキストの配置
            position: "bottom-center", // ページ内での表示位置
        });
        var lnglat = { lat: lat_default, lon: lon_default };
        displayMap(lnglat);
        toastr.info(message);
    }
}

function displayMap(lnglat) {
    map = new mapboxgl.Map({
        container: "map_canvas",
        style: "mapbox://styles/towncreation-busit/ckiiqae390rix19mz1fjcuaxw",
        zoom: 16,
        center: lnglat,
    });
    //スケールコントロール
    var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "metric",
    });
    map.addControl(scale, "bottom-left");
    //ズームボタン
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.on("load", function () {
        map.loadImage("../img/mapicon.png", function (error, image) {
            if (error) throw error;
            map.addImage("mapicon", image);
            map.addSource("point", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [lnglat.lon, lnglat.lat],
                            },
                        },
                    ],
                },
            });
            map.addLayer({
                id: "points",
                type: "symbol",
                source: "point",
                layout: {
                    "icon-image": "mapicon",
                    "icon-size": 0.6,
                    "icon-anchor": "bottom",
                    // マーカー表示数の制限を撤廃
                    "icon-allow-overlap": true,
                },
            });
        });
        map.loadImage("../img/busitmap-stop.png", function (error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);
            var url = "/webapi/stops.json";
            map.addSource("stops", {
                type: "geojson",
                data: url,
            });
            map.addLayer({
                id: "stops",
                type: "symbol",
                source: "stops",
                layout: {
                    "icon-anchor": "bottom",
                    // マーカー表示数の制限を撤廃
                    "icon-allow-overlap": true,
                    "icon-image": "custom-marker",
                },
            });

            map.on("click", "stops", function (e) {
                var coords = e.features[0].geometry.coordinates.slice();
                stop = e.features[0].properties;
                str = stop.name;

                if (stop.num && stop.num != "null") {
                    if (isNaN(stop.num)) {
                        str = str + " " + stop.num;
                    } else {
                        str = str + " のりば " + stop.num;
                    }
                }
                if (stop.alias && stop.alias != "null") {
                    str = str + " " + stop.alias;
                }
                if (stop.ruby && stop.ruby != "null") {
                    str = str + "<br />" + stop.ruby;
                }
                if (stop.direction_info && stop.direction_info != "null") {
                    str = str + "<br />" + stop.direction_info;
                }
                var content =
                    '<a href="/stop?stationsid=' + stop.id + '">' + str;

                new mapboxgl.Popup({ offset: [0, -46] })
                    .setLngLat(coords)
                    .setHTML(content)
                    .addTo(map);
            });
        });
    });
}
