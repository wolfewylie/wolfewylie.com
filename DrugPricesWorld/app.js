var map;
var searchString;
var drugname;
var layer_0;
    function initialize() {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: new google.maps.LatLng(30, -40),
        zoom: 2
      });
      var style = [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            { saturation: -66 }
          ]
        },
        {
          featureType: 'administrative.country',
          elementType: 'all',
          stylers: [
            { visibility: 'on' }
          ]
        },
        {
          featureType: 'administrative.province',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        }
      ];
      var styledMapType = new google.maps.StyledMapType(style, {
        map: map,
        name: 'Styled Map'
      });
      map.mapTypes.set('map-style', styledMapType);
      map.setMapTypeId('map-style');
      layer_0 = new google.maps.FusionTablesLayer({
        query: {
          from: "1oaSXQKCReLswfWF6ecDA-q91GfY8kf2RVf8iApDW"
        }
      });
    }
    function changeMap(drugname) {
      searchString = document.getElementById(drugname).dataset.value;
      var whereClause;
      $('.label').text('What ' + drugname + ' costs around the world...');
      layer_0.setOptions({
        query: {
          from: searchString,
        },
        map: map,
        styleId: 2,
        templateId: 2
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
