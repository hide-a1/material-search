import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, MatMenuModule, MatIconModule],
})
export class SharedModule {}
