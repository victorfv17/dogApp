import { Component, OnInit } from '@angular/core';
import { RazasService } from '../../services/razas.service';
import { Raza } from '../../models/raza.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buscador-razas',
  templateUrl: './buscador-razas.component.html',
  styleUrls: ['./buscador-razas.component.scss']
})
export class BuscadorRazasComponent implements OnInit {
  terminoBusqueda: string = '';
  razas: string[] = [];
  raza: Raza = {};
  razaEncontrada: string = '';

  constructor(private razasService: RazasService) {
  }

  ngOnInit(): void {
    this.buscarRazas();
  }

  private buscarRazas() {
    this.razasService.getRazas().subscribe({
      next: (razas) => {
        if (razas.message)
          this.razas = Object.keys(razas.message);
      },
      error: (error) => alert(error)

    });
  }
  public buscarRaza(): void {
    this.razaEncontrada = this.buscarRazaPorTermino();
    if (this.razaEncontrada) {
      this.consultarRaza();
    }
  }

  private buscarRazaPorTermino(): string {
    return this.razas.find((raza) => {
      return raza.includes(this.terminoBusqueda);
    }) ?? '';
  }

  private consultarRaza() {
    this.razasService.getRaza(this.razaEncontrada).subscribe({
      next: (raza) => this.raza = raza,
      error: (error) => alert(error)
    });
  }
}


