import { Apport } from "./apport"
import { Profil } from "./profil"

export interface Evenement {
  id?: string
  libelle:string
  date:Date
  localisation: {nom:string, place?:Coords}
  apports : Apport[]
  organisateur: Profil
}

export type Coords = {lat:number, lng:number}
