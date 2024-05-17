import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/service/evenement.service';
import { environment } from 'src/environments/environment';

/*
* Modal giving the details of an event.
*
* STATE REQUIREMENTS :
* Needs a event to be passed to the behaviour subject of the EvenementService
*/
@Component({
  selector: 'app-evenement-modal',
  templateUrl: './evenement-modal.component.html',
  styleUrls: ['./evenement-modal.component.scss', '../../evenement.component.scss'],
})
export class EvenementModalComponent implements AfterViewInit {

  //Container of the google map
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  //Event irrigated through the behaviourSubject of the service.
  evenement?: Evenement;

  constructor(
    private modalCtrl: ModalController,
    private evenementService: EvenementService
  ) { }

  /*
  * Creates the map on view init
  */
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
