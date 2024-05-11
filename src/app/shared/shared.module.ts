import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MaterialModule = [MatButtonModule, MatIconModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,

  ],
  exports: [MaterialModule]
})
export class SharedModule { }
