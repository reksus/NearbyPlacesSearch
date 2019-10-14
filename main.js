var search_query = 'pizza';
var search_radius = 2000;
var search_count = 10;

// to include temp.js in the html

var markers = new Array(search_count);
var popups = new Array(search_count);

//-- Nearby Search
function callbackFn(result) {
    console.log(result);

    //-- create and place markers for each result
    for (var i = 0; i < search_count; i++) {
        var poi_crd = result.results[i].position;
        var poi_name = result.results[i].poi.name;
        //console.log(poi_crd);
        markers[i] = new tt.Marker({
            anchor: 'bottom', // default
            color: '#333',
            width: 25,
            height: 30,
            draggable: true,
        })
        .setLngLat(poi_crd)
        .addTo(map);

        //-- create popup for each search result
        var markerHeight = 50, markerRadius = 10, linearOffset = 25;
        var popupOffsets = {
            'top': [0, 0],
            'top-left': [0,0],
            'top-right': [0,0],
            'bottom': [0, -markerHeight],
            'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
            'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
            'left': [markerRadius, (markerHeight - markerRadius) * -1],
            'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        };
        popups[i] = new tt.Popup({offset: popupOffsets, className: `popup${i}`})
        .setLngLat(poi_crd)
        .setHTML(`<h1>${poi_name}</h1>`);
        // .addTo(map);

    }

};


function getNearby() {
        
    console.log(ll, 'hello');

    //--> POI Search

    tt.services.poiSearch({
        key: 'Qd7SqQ0tnq93ZJDOgT5dGKWWOCYhjwA4',
        query: search_query,
        center: ll,
        radius: search_radius,
        limit: search_count,
    })
    .go()
    .then(callbackFn);
  
}

// to make sure the lat long attribute is set 
setTimeout(getNearby, 10);

// function to show a popup for a marker
function showPopup(e) {
    
    for (var i = 0; i < search_count; i++) {
        if (e.target == markers[i].getElement() || 
            e.target.parentElement == markers[i].getElement() ||
            e.target.parentElement.parentElement == markers[i].getElement()) 
        {
            popups[i].addTo(map);
            console.log('marker found !');
            break;
        }
    }
}

// add a click event listener to map
document.querySelector('#map').addEventListener('click', showPopup);