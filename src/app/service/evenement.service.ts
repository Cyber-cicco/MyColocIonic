import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor() { }

  async get() {
    return await Preferences.get({key:'evenements'})
  }

  persist(evts: Evenement[]) {
    Preferences.set({
      key:`evenements`,
      value:JSON.stringify(evts)
    })
  }
}
