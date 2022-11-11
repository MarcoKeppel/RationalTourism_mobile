import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {

  public map : google.maps.Map;

  constructor() { }

  ngAfterViewInit() {

    this.initMap();
  }

  initMap() {

    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110}; // TODO coordinates of totem/screen

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 8
    });
  }

}
