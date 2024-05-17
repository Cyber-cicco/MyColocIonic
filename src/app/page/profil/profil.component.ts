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

  ngOnInit() {
    this.profilService.get().then((profil) => {
      this.profil = profil
      this.form.patchValue(this.profil!)
    })
  }

  async takePicture() {
    if (!this.profil) return
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    if (image.base64String) {
      const imageUrl = image.base64String;
      this.profil.photo = imageUrl;
      this.profilService.persist(this.profil)
    }
  }

  submit() {
    if (!this.profil) return
    Object.assign(this.profil, this.form.value)
    console.log(this.profil)
    this.profilService.persist(this.profil)
  }

  annuler() {
    if (this.profil) this.form.patchValue(this.profil)
  }

}
