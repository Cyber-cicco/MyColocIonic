import { Apport } from "./apport"
import { Profil } from "./profil"

export interface Evenement {
  id: string
  libelle:string
  localisation: {x:string, y:string}
  apports : Apport[]
  organisateur: Profil
}
