//--> storing all the variables if getCurrentPosition is successful
    
var ll;
var map;
var marker1;
var popup;
var nav;
var fullScreenControl;


var options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0
};


function success(pos) {

    // Set all Map Variables based on the position 
    var crd = pos.coords;    
    ll = new tt.LngLat(crd.longitude, crd.latitude);

    //-- map variable
    map = new tt.map({
        key: 'Qd7SqQ0tnq93ZJDOgT5dGKWWOCYhjwA4',
        container: 'map',
        // center should be a lnglat coordinate
        center: ll,
        zoom: 15,
        style: 'tomtom://vector/1/basic-main',
        // initialisation function 
        //initialised: printHello(), a function which will execute once the map is initialised
        //interactive: false,
        //dragPan: false,
        fadeDuration: 200,    
    });
    
    
    //--marker variable
    marker1 = new tt.Marker({
        anchor: 'bottom', // default
        color: '#ff0000',
        width: 25,
        height: 30,
        draggable: true,
    })
    .setLngLat(ll)
    .addTo(map);
    
    // useful marker functions
    // setPopup(popup)
    // remove()
    //console.log(marker1.getElement());


    //-- navigation control 
    nav = new tt.NavigationControl();
    map.addControl(nav, 'top-left');
    
    
    tt.setProductInfo('Cool NearBy Places', '0.0.1');

}
  
function error(err) {
console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error, options);
