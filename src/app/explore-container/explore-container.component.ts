import { Component, OnInit, Input } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { element } from 'protractor';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  currentLat: any;
  currentLong: any;
  destinationLat: any;
  destinationLong: any;
  map: any;
  marker: any;
  isTracking = false;
  dist: any = [];
  center: google.maps.LatLngLiteral;

  // dirRequest: any;
  // center: google.maps.LatLngLiteral = { lat: 6.0100, lng: 80.2422 };
  zoom = 20;
  mapTypeId: google.maps.MapTypeId.ROADMAP;

  // readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  readonly directionsMatrix$: Observable<google.maps.DistanceMatrixService | undefined>;

  constructor(private navigationService: NavigationService, private mapDirectionsService: MapDirectionsService) {
    this.trackMe();
  }

  ngOnInit() {
  }

  //Track position and get directions to the destination
  showTrackingPosition(position: any, destinationLat: any, destinationLong: any) {
    // console.log("Display Lang and Long");
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    this.destinationLat = destinationLat;
    this.destinationLong = destinationLong;

    this.center = {lat: this.currentLat, lng: this.currentLong};
    console.log(`center:  ${this.center.lat} - ${this.center.lng}`);

    // let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(this.currentLat);
    console.log(this.currentLong);

    //getting directions
    const request: google.maps.DirectionsRequest = {
      destination: { lat: this.destinationLat, lng: this.destinationLong },
      origin: { lat: this.currentLat, lng: this.currentLong },
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
    // console.log(typeof(this.currentLat));
  }

  trackMe() {
    if (navigator.geolocation) {
      // this.findMe();
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position, 7.1704, 80.5712);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  //getDirections

  // getDirections(origin:any, destination:any){
  //   const route = new google.maps.DirectionsService();
  //   return new Promise((resolve, reject)=>{
  //     // route.route({origin:[new google.maps.LatLng(origin.lat, origin.lng)],})
  //   })
  // }


  // getRouteDirections(){
  //   this.navigationService.getDirection();
  // }

  findMe() {
    if (navigator.geolocation) {
      this.trackMe();
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  //Get distance matrix
  // getDistance(origin:any, destination:any) {

  //   const matrix = new google.maps.DistanceMatrixService();
  //   return new Promise((resolve, reject)=>{
  //     matrix.getDistanceMatrix({
  //     origins: [new google.maps.LatLng(origin.lat, origin.lng)],
  //     destinations: [new google.maps.LatLng(destination.lat,destination.lng)],
  //     travelMode: google.maps.TravelMode.DRIVING,
  //     }, function(response, status) {
  //       console.log(response.rows);
  //       console.log(typeof(response.rows));
  //        response.rows.forEach(element=>{

  //        })
  //       if(status === 'OK'){
  //         resolve(response)
  //       }else{
  //         reject(response);
  //       }
  //     });
  //   })
  // }
}
