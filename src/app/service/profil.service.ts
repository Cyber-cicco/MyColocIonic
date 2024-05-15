import { Injectable } from '@angular/core';
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private _mockProfileInfos :Profil = {
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
}
