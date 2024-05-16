import { Apport } from "./apport"
import { Profil } from "./profil"

export interface Evenement {
  id: string
  libelle:string
  date:Date
  localisation: {lat:number, lng:number}
  apports : Apport[]
  organisateur: Profil
}
