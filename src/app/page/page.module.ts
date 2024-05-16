import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ProfilComponent } from './profil/profil.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { EvenementComponent } from './evenement/evenement.component';
import { BudgetComponent } from './budget/budget.component';
import { NotificationComponent } from './notification/notification.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfilComponent,
    LocalisationComponent,
    EvenementComponent,
    BudgetComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }
