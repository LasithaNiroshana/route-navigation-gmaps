import { Component, OnInit, Input } from '@angular/core';
import {MapDirectionsService} from '@angular/google-maps';
import { Observable } from 'rxjs/internal/Observable';
import { catchError,map} from 'rxjs/operators';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  currentLat:any;
  currentLong:any;
  map:any;
  marker:any;
  isTracking = false;
  
  center: google.maps.LatLngLiteral = {lat: 7.8731, lng: 80.7718};
  zoom = 12;

  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  readonly directionsMatrix$: Observable< google.maps.DistanceMatrixService|undefined>;

  constructor(mapDirectionsService: MapDirectionsService) { 
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 7.0840, lng: 80.0098},
      origin: {lat: 6.9271, lng: 79.8612},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
    
  }

  ngOnInit() { 
    this.getDistance({lat: 6.9271, lng: 79.8612},{lat: 7.0840, lng: 80.0098});
  }

  // showTrackingPosition(position) {
  //   console.log("DIsplay Lang and Long");
  //   console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }


  //Show our position on map
  // showPosition(position) {
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }

  // Find me on map
  // findMe() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  // trackMe() {
  //   if (navigator.geolocation) {
  //     this.isTracking = true;
  //     navigator.geolocation.watchPosition((position) => {
  //       this.showTrackingPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  //Get distance matrix
  getDistance(origin:any, destination:any) {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject)=>{
      matrix.getDistanceMatrix({
      origins: [new google.maps.LatLng(origin.lat, origin.lng)],
      destinations: [new google.maps.LatLng(destination.lat,destination.lng)],
      travelMode: google.maps.TravelMode.DRIVING,
      }, function(response, status) {
        
        for(let rows of response.rows){
          console.log(rows.elements);
          // console.log(typeof(rows.elements));
        }
        if(status === 'OK'){
          resolve(response)
        }else{
          reject(response);
        }
      });
    })
  }


  //getDirections

  getDirections(origin:any, destination:any){
    const route = new google.maps.DirectionsService();
    return new Promise((resolve, reject)=>{
      // route.route({origin:[new google.maps.LatLng(origin.lat, origin.lng)],})
    })
  }
}
