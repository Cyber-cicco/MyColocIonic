import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetResult } from '@capacitor/preferences';
import { Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/service/evenement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {


  form: FormGroup
  evenements : Evenement[] = []
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  mapLaunched = false
  mapSuccess = true;
  mapFinishedLoading = false;
  searchResults : string[] = []
  searchValues = [
    "java",
    "javascript",
    "golang",
    "erlang",
    "elixir",
  ]

  constructor(
    private evenementService:EvenementService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      libelle:['',[]],
      date:['',[]],
      localisation:['',[]],
    })
  }

  ngOnInit() {
    this.evenementService.get().then((evts:GetResult) => {
      if (!evts.value) return
      const evenements = JSON.parse(evts.value) as Evenement[]
      this.evenements = evenements.filter(evt => evt.date > new Date())
    })
  }

  markerIds : string[] = []

  createMap() {
    if (this.mapLaunched) return
    this.mapLaunched = true
    const options = {
      enableHighAccuracy: false,
      maximumAge: 0,
    };
    const geoSucess : PositionCallback = (pos) => {
      this.mapFinishedLoading = true
      GoogleMap.create({
        id: 'eventMap',
        element: this.mapRef!.nativeElement,
        apiKey: environment.apiKey,
        config: {
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          zoom: 15,
        },
      }).then(map => {
        this.newMap = map
        this.newMap.enableTouch()
        this.newMap.setOnMapClickListener((e)=> {
          this.newMap.removeMarkers(this.markerIds)
          this.markerIds = []
          this.newMap.addMarker({
            coordinate: {lat: e.latitude, lng:e.longitude}
          }).then((id)=> {
            this.markerIds.push(id)
          })
        })
      });
    }
    const geoError = (err:any) => {
      this.mapFinishedLoading = true
      this.mapSuccess = false
      console.error(err)
    }
    navigator.geolocation.getCurrentPosition(geoSucess, geoError, options)
  }

  search(val: string) {
    if (val === "") {
      this.searchResults = [];
      return
    }
    this.searchResults = this.searchValues.filter(v => v.includes(val))
  }
}
