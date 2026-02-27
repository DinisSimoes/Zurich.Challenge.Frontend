import { Routes } from '@angular/router';
import { ReportComponent } from './features/report.component/report.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'report',
    pathMatch: 'full'
  },
  {
    path: 'report',
    component: ReportComponent
  }
];
