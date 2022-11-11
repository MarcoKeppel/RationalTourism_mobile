import { AfterViewInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {

  public map : google.maps.Map;
  public clickListener: google.maps.MapsEventListener;
  public locationMarker: google.maps.Marker;
  public selectedCoords: google.maps.LatLngLiteral;

  constructor(
    private backendService: BackendService,
  ) { }

  ngAfterViewInit() {

    this.initMap();
  }

  initMap() {

    this.getGoogleMaps().then(googleMap => {
      
      const center: google.maps.LatLngLiteral = {lat: 46, lng: 11}; // TODO coordinates of totem/screen

      this.map = new googleMap.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 8,
        disableDefaultUI: true,
      });

      this.clickListener = this.map.addListener('click', event => {

        this.selectedCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        
        console.log("Coordinates:");
        console.log(this.selectedCoords);

        if (this.locationMarker) {
          this.locationMarker.setMap(null);
        }
        this.locationMarker = new googleMap.Marker({
          position: this.selectedCoords,
          map: this.map,
          animation: "drop"
        });
      });
    });
  }

  private getGoogleMaps(): Promise<any> {

    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ environment.MAPS_API_KEY }&v=weekly`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {

          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Maps SDK not available :(');
        }
      };
    });
  }

  fabSelectLocation() {

    console.log(this.selectedCoords);
  }

  btnCloseSession() {

    this.backendService.endSession().subscribe();
  }
}
