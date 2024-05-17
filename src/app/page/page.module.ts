import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ProfilComponent } from './profil/profil.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { EvenementComponent } from './evenement/evenement.component';
import { BudgetComponent } from './budget/budget.component';
import { NotificationComponent } from './notification/notification.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EvenementModalComponent } from './evenement/fragments/evenement-modal/evenement-modal.component';



@NgModule({
  providers: [ { provide: LOCALE_ID, useValue: "fr-FR" }],
  declarations: [
    ProfilComponent,
    LocalisationComponent,
    EvenementComponent,
    EvenementModalComponent,
    BudgetComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }
