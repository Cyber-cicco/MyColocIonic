import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/service/evenement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evenement-modal',
  templateUrl: './evenement-modal.component.html',
  styleUrls: ['./evenement-modal.component.scss', '../../evenement.component.scss'],
})
export class EvenementModalComponent implements AfterViewInit {

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  evenement?: Evenement;

  constructor(
    private modalCtrl: ModalController,
    private evenementService: EvenementService
  ) { }

  ngAfterViewInit(): void {
    this.evenement = this.evenementService.getCurrent()
    setTimeout(() => {
      if (this.evenement?.localisation.place) {
        const lat = this.evenement.localisation.place.lat
        const lng = this.evenement.localisation.place.lng
        GoogleMap.create({
          id: 'singleEventMap',
          element: this.mapRef!.nativeElement,
          apiKey: environment.apiKey,
          config: {
            width: 500,
            height: 500,
            center: {
              lat: lat,
              lng: lng,
            },
            zoom: 15,
          },
        }).then(map => {
          this.newMap = map
          this.newMap.addMarker({
            coordinate: { lat: lat, lng: lng }
          })
        })
      }
    }, 1000)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
