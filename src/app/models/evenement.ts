import { Apport } from "./apport"
import { Profil } from "./profil"

export interface Evenement {
  id: string
  libelle:string
  date:Date
  localisation: {x:string, y:string}
  apports : Apport[]
  organisateur: Profil
}
