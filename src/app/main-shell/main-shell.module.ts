import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainShellRoutingModule } from './main-shell-routing.module';
import { MainShellComponent } from './main-shell/main-shell.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainShellComponent],
  imports: [CommonModule, MainShellRoutingModule, SharedModule],
})
export class MainShellModule {}
