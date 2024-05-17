import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/service/profil.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {

  form: FormGroup
  profil?: Profil


  constructor(
    private profilService: ProfilService,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      firstname: ['', []],
      lastname: ['', []],
      surname: ['', []],
    })
  }

  /* Loads a profil if already set.*/
  ngOnInit() {
    this.profilService.get().then((profil) => {
      this.profil = profil
      this.form.patchValue(this.profil!)
    })
  }

  /* Gives an option between taking a picture through camera
  * or browsing your filesystme to get one
  * Is saved a a base64 encoded image of low quality, because
  * it will always be presented as a small avatar.
  */
  async takePicture() {
    if (!this.profil) return
    const image = await Camera.getPhoto({
      quality: 30,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    if (image.base64String) {
      const imageUrl = image.base64String;
      this.profil.photo = imageUrl;
      this.profilService.persist(this.profil)
    }
  }

  /* Persists the profile into the storage*/
  submit() {
    if (!this.profil) return
    Object.assign(this.profil, this.form.value)
    this.profilService.persist(this.profil)
  }

  /* Puts back the form to it's original state*/
  annuler() {
    if (this.profil) this.form.patchValue(this.profil)
  }

}
