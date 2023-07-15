const fs = require("fs");
const kurukenStops = require("./data.json");

const longtitudeOffset = -0.0025;
const latitudeOffset = 0.0032;

fs.writeFileSync(
    "stops.json",
    JSON.stringify({
        type: "FeatureCollection",
        features: kurukenStops.map((val) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        (val.Position.Longitude + longtitudeOffset).toString(),
                        (val.Position.Latitude + latitudeOffset).toString(),
                    ],
                },
                properties: {
                    id: val.Sid,
                    name: val.Name,
                    lat: (val.Position.Longitude + longtitudeOffset).toString(),
                    lon: (val.Position.Latitude + latitudeOffset).toString(),
                    num: "",
                    ruby: val.Yomigana,
                    alias: null,
                    direction_info: "",
                },
            };
        }),
    })
);
