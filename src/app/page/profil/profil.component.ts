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
    private service: ProfilService,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      firstname: ['', []],
      lastname: ['', []],
      surname: ['', []],
    })
  }

  ngOnInit() {
    this.profil = this.service.get()
    this.form.patchValue(this.profil)
  }

  async takePicture() {
    if (!this.profil) return
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      const imageUrl = image.webPath;
      this.profil.photo = imageUrl;
    }
  }

  submit() {
    if (!this.profil) return
    Object.assign(this.profil, this.form.value)
    console.log(this.profil)
    this.service.persist(this.profil)
  }

  annuler() {
    if (this.profil)
      this.form.patchValue(this.profil)
  }

}
