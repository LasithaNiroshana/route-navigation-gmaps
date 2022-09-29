import { Component, OnInit, Input } from '@angular/core';
import {MapDirectionsService} from '@angular/google-maps';
import { element } from 'protractor';
import { Observable } from 'rxjs/internal/Observable';
import { catchError,map} from 'rxjs/operators';
import {NavigationService} from '../services/navigation.service';


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
  dist:any=[];

  // dirRequest: any;
  
  center: google.maps.LatLngLiteral = {lat: 7.8731, lng: 80.7718};
  zoom = 14;

  // readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  readonly directionsMatrix$: Observable< google.maps.DistanceMatrixService|undefined>;

  constructor(private navigationService:NavigationService,private mapDirectionsService: MapDirectionsService) { 
    this.trackMe();
  }
   

  ngOnInit() { 
    // this.getDistance({lat: 6.9271, lng: 79.8612},{lat: 7.0840, lng: 80.0098});

  }

//Track position and get directions to the destination
  showTrackingPosition(position:any) {
    // console.log("Display Lang and Long");
    // console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    //getting directions
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 7.2906, lng: 80.6337},
      origin: {lat:this.currentLat, lng: this.currentLong},
      travelMode: google.maps.TravelMode.DRIVING
    };
   
    this.directionsResults$=this.mapDirectionsService.route(request).pipe(map(response => response.result));
    // console.log(typeof(this.currentLat));
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
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
