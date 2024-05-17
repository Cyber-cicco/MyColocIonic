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
  async get() {
    //TODO : change this with a call to the sqlite database
    const value = (await Preferences.get({key:'profil'})).value
    if (value) {
      return JSON.parse(value) as Profil
    }
    return {id:"1"} as Profil
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
