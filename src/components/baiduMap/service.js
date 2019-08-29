const HTTP = 'http';
const HTTPS = 'https';
const ak = 'TOBEREPLACED';
const API_MAP = {
  URL: protocol() + '://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=baidumapinit'
};
const API_GEOCODER = {
  URL: protocol() + '://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&callback=baidumapinit&output=json&coordtype=wgs84ll&location='
};
const API_IP_LOCATOR = {
  URL: protocol() + '://api.map.baidu.com/location/ip?ak=' + ak + '&callback=baidumapinit&coor=bd09ll'
};
let timeoutMonitor;

export function load() {
  return getScript(API_MAP.URL).then(function() {
    clearTimeout(timeoutMonitor);
    window.baiduMapScriptLoaded = true;
    displayMap();
  });
}

export function show(element, mapOptions) {
  return new Promise(resolve => {
    // eslint-disable-next-line
    const map = new BMap.Map(element);
    map.centerAndZoom(mapOptions.centerAndZoom, 14);
    map.enableScrollWheelZoom();
    map.addEventListener('tilesloaded', showMarker);

    function showMarker() {
      resolve(map);

      const point = map.getCenter();

      addMarker(point);
      map.removeEventListener('tilesloaded', showMarker);
    }

    function addMarker(point) {
      // eslint-disable-next-line
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }
  });
}

export function getScript(APIURL, ignoreLoaded) {
  return new Promise((resolve, reject) => {
    if (window.baiduMapScriptLoaded && !ignoreLoaded) {
      resolve();
    } else {
      window.baidumapinit = resolve;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = APIURL;
      document.body.appendChild(script);

      timeoutMonitor = setTimeout(function() {
        reject();
      }, 10000);
    }
  });
}

export function displayMap() {
  Array.prototype.slice.call(document.querySelectorAll('baidu-map')).forEach(function(node) {
    node.querySelector('.baidu-map-instance').style.display = 'block';
  });
}

export function getGeoLocation(coords) {
  return new Promise((resolve, reject) => {
    const request = API_GEOCODER.URL + coords.latitude + ',' + coords.longitude;

    getScript(request, true).then(
      function(res) {
        clearTimeout(timeoutMonitor);
        resolve(res.result);
      },
      function() {
        reject();
      }
    );
  });
}

export function getGeoCity(coords) {
  return new Promise((resolve, reject) => {
    getGeoLocation(coords).then(
      function(position) {
        resolve(position.addressComponent.city);
      },
      function() {
        reject();
      }
    );
  });
}

export function getBaiduCity() {
  return new Promise((resolve, reject) => {
    const request = API_IP_LOCATOR.URL;

    getScript(request, true).then(
      function(res) {
        clearTimeout(timeoutMonitor);
        if (res.status === 0) {
          resolve(res);
        } else {
          reject();
        }
      },
      function() {
        reject();
      }
    );
  });
}

function protocol() {
  return isHttp() ? HTTP : HTTPS;
}

function isHttp() {
  return location.protocol === HTTP;
}
