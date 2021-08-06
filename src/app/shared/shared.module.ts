import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, CardComponent],
  imports: [CommonModule, RouterModule, MatCardModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatMenuModule,
    MatIconModule,
    CardComponent,
    MatCardModule,
  ],
})
export class SharedModule {}
