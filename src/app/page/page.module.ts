import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ProfilComponent } from './profil/profil.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { EvenementComponent } from './evenement/evenement.component';
import { BudgetComponent } from './budget/budget.component';
import { NotificationComponent } from './notification/notification.component';
import { IonicModule } from '@ionic/angular';



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
    IonicModule
  ]
})
export class PageModule { }
