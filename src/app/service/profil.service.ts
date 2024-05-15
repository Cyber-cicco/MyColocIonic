import { Injectable } from '@angular/core';
import { Profil } from '../models/profil';

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
    //TODO : change this to persist to the sql database
  }
}
