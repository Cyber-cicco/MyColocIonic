import { Injectable } from '@angular/core';
import { Profil } from '../models/profil';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private _mockProfileInfos :Profil = {
    id: "1"
  }

  constructor() { }

  //Here, we have to get the profile from the sqlite database.
  get() {
    //TODO : change this with a call to the sqlite database
    return this._mocketGet()
  }

  private _mocketGet() {
    return this._mockProfileInfos
  }

  persist(profil: Profil) {
    Preferences.set({
      key:`profil`,
      value:JSON.stringify(profil)
    })
  }
}
