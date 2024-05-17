import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './page/profil/profil.component';
import { EvenementComponent } from './page/evenement/evenement.component';
import { NotificationComponent } from './page/notification/notification.component';
import { BudgetComponent } from './page/budget/budget.component';
import { LocalisationComponent } from './page/localisation/localisation.component';
import { MessagerieComponent } from './page/messagerie/messagerie.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProfilComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'evenements',
    component: EvenementComponent
  },
  {
    path: 'notifications',
    component: NotificationComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'localisation',
    component: LocalisationComponent
  },
  {
    path: 'messages',
    component: MessagerieComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
