function displayMap(locationArray) {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: locationArray[0]
        });

        for (var i = 0; i < locationArray.length; i++) {
          /*var markerIcon = "";
          switch (locationArray[i].type) {
            case "restaurant":
            markerIcon = "1.png";
            break;
            case "park":
            markerIcon = "2.png";
            break;
          }*/
          var marker = new google.maps.Marker({
            position: locationArray[i],
            //icon: markerIcon,
            map: map
          });
        }
      }
      
      // how to call this function?
      /*
      searchReslt = [
      {lat: 32.7157, lng: -117.1611, type: "restaurant"},
      {lat: 34.0522, lng: -118.2437, type: "park"},
      {lat: 37.7749, lng: -122.4194, type: "park"}
      ];
      displayMap(searchReslt);
      */