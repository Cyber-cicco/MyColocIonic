import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Evenement } from '../models/evenement';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private currentEvenement$ : BehaviorSubject<Evenement | undefined> = new BehaviorSubject<Evenement | undefined>(undefined)

  constructor() { }

  async get() {
    const evts = await Preferences.get({key:'evenements'})
    if (evts.value) {
      const evenements = JSON.parse(evts.value) as Evenement[]
      evenements.map(e=> e.date = new Date(e.date))
      return evenements
    } else {
      return []
    }
  }

  persist(evts: Evenement[]) {
    console.log(evts)
    Preferences.set({
      key:`evenements`,
      value:JSON.stringify(evts)
    })
  }

  //Gives a back an event that is set in a behaviour subject
  getCurrent(): Evenement | undefined {
    return this.currentEvenement$.value
  }

  setCurrent(ev : Evenement) {
    this.currentEvenement$.next(ev)
  }
}
