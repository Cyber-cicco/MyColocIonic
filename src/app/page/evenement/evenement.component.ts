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

  constructor(
    private evenementService:EvenementService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      libelle:['',[]],
      date:['',[]],
    })
  }

  ngOnInit() {
    this.evenementService.get().then((evts:GetResult) => {
      if (!evts.value) return
      const evenements = JSON.parse(evts.value) as Evenement[]
      this.evenements = evenements.filter(evt => evt.date > new Date())
    })
  }

  createMap() {
    GoogleMap.create({
      id: 'eventMap',
      element: this.mapRef!.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    }).then(map => this.newMap = map);
  }

}
