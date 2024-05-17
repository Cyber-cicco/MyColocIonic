import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coords, Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/service/evenement.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfilService } from 'src/app/service/profil.service';
import { EvenementModalComponent } from './fragments/evenement-modal/evenement-modal.component';
import { ModalController } from '@ionic/angular';

/**
* Class letting you check your the events for your coloc
*
* STATE MUTATIONS:
*  - Ability to put an Evenement in the EvenementService BehaviourSubject
*/
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {


  form: FormGroup
  location? :{latitude:number, longitude:number}

  //List of all events
  private _evenements : Evenement[] = []

  //List of upcoming events
  displayedEvts : Evenement[] = []

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  locationOfEvent? : Coords

  //Lets you check if the map creation of the map has already been triggered
  mapLaunched = false

  //False the map errored
  mapSuccess = true;

  //True when the map is shown
  mapFinishedLoading = false;

  constructor(
    private evenementService:EvenementService,
    private profilService:ProfilService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      libelle:['',[Validators.required]],
      date:['',[Validators.required]],
      localisation:['',[Validators.required]],
    })
  }

  /**
  * Loads the evenements present in the database
  */
  ngOnInit() {
    this._getEvents()
  }

  /*Gets the upcoming events by filtering those which already happened*/
  private _getEvents() {
    this.evenementService.get().then((evenements) => {
      this._evenements = evenements
      //TODO: add a better filter
      this.displayedEvts = evenements.filter(e => e.date.getTime() >= Date.now())
    })
  }

  markerIds : string[] = []

  /*
  * Loads the map the first time you open the new event creator
  * First tries to find your position to show the map around you.
  *
  * Adds a click event to the map to let you determine where the event
  * is located
  * */
  createMap() {
    if (this.mapLaunched) return
    this.mapLaunched = true
    const options = {
      enableHighAccuracy: false,
      maximumAge: 0,
    };

    //Creates map after successfully loading the position
    const geoSucess : PositionCallback = (pos) => {
      this.location = {latitude:pos.coords.latitude, longitude:pos.coords.longitude}
      this.mapFinishedLoading = true

      //Map creation around where the user is located
      GoogleMap.create({
        id: 'eventMap',
        element: this.mapRef!.nativeElement,
        apiKey: environment.apiKey,
        config: {
          width: 500,
          height: 500,
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          zoom: 15,
        },
      }).then(map => {
        this.newMap = map
        this.newMap.enableTouch()

        //Create a marker when clicking the map and adds saves it's coords in locationOfEvent
        this.newMap.setOnMapClickListener((e)=> {
          this.newMap.removeMarkers(this.markerIds)
          this.markerIds = []
          this.locationOfEvent = {lat:e.latitude, lng:e.longitude}
          this.newMap.addMarker({
            coordinate: this.locationOfEvent
          }).then((id)=> {
            this.markerIds.push(id)
          })
        })
      });
    }

    //Errors when position is not given
    const geoError = (err:any) => {
      this.mapFinishedLoading = true
      this.mapSuccess = false
      console.error(err)
    }
    navigator.geolocation.getCurrentPosition(geoSucess, geoError, options)
  }

  /*
  * Method triggered when searching a place in the form.
  * Is still not fully operational.
  * Request is blocked by CORS policy from the maps API,
  * you need to use a 3rd party library
  */
  search(val: string) {
  }

  /**
  * Persists a new Event
  *
  * STATE REQUIREMENTS:
  * - Should only be called if a form is valid
  */
  async onSubmit() {
    if (!this.form.valid) return
    const event : Evenement = {
      libelle: this.form.get("libelle")!.value,
      date:this.form.get("date")!.value,
      localisation: {nom: this.form.get("localisation")!.value, place:this.locationOfEvent},
      apports : [],
      organisateur: await this.profilService.get(),
    }
    if (this._evenements.length > 0) {
      const lastNumber = Number.parseInt(this._evenements[this._evenements.length - 1].id!)
      event.id = `${lastNumber + 1}`
    } else {
      event.id = "1"
    }
    this._evenements.push(event);
    this.evenementService.persist(this._evenements);
    this._getEvents()
    this.form.reset()
  }

  /**
  * Opens a modal window with details about an Evenement
  *
  * STATE MUTATIONS:
  *  - Puts an Evenement in the EvenementService BehaviourSubject
  */
  async openModal(e : Evenement) {
    this.evenementService.setCurrent(e)
    const modal = await this.modalCtrl.create({
    component: EvenementModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const message = `Hello, ${data}!`;
    }
  }

  /**
  * Persist the array without the item matching the id
  * Really inefficient way of doing it but for a with few datas it works
  * */
  delete(id?:string) {
    this.evenementService.persist(this._evenements.filter(e => e.id !== id))
    this._getEvents()
  }
}
