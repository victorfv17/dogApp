import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazasRoutingModule } from './razas-routing.module';
import { BuscadorRazasComponent } from './components/buscador-razas/buscador-razas.component';
import { RazasService } from './services/razas.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

const material = [MatFormFieldModule, MatInputModule, MatCardModule];
@NgModule({
  declarations: [BuscadorRazasComponent],
  imports: [
    CommonModule,
    RazasRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    material
  ],
  providers: [RazasService]
})
export class RazasModule { }
