import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule
  ],
  exports:[
    HeaderComponent,
  ],
})
export class ComponentsModule { }
