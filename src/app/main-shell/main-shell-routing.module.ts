import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainShellComponent } from './main-shell/main-shell.component';

const routes: Routes = [
  {
    path: '',
    component: MainShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainShellRoutingModule {}