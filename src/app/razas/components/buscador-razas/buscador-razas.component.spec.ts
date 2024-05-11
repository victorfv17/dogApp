import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRazasComponent } from './buscador-razas.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RazasRoutingModule } from '../../razas-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RazasService } from '../../services/razas.service';
import { of } from 'rxjs';
import { Raza } from '../../models/raza.model';

describe('BuscadorRazasComponent', () => {
  let component: BuscadorRazasComponent;
  let fixture: ComponentFixture<BuscadorRazasComponent>;
  let razasService: RazasService;
  let response: Raza;
  let mockRazas: string[];
  let mockRaza: Raza;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorRazasComponent],
      imports: [
        BrowserAnimationsModule,
        RazasRoutingModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule

      ],
      providers: [HttpClient, HttpHandler, RazasService]
    });
    razasService = TestBed.inject(RazasService);
    fixture = TestBed.createComponent(BuscadorRazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    mockRazas = ['beagle', 'boxer'];
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get breeds', () => {
    response = {
      message: {
        beagle: [],
        boxer: []
      }
    }

    spyOn(razasService, 'getRazas').and.returnValue(of(response));
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.razas).toEqual(mockRazas);
  });

  it('should not get breeds', () => {
    mockRazas = [];
    spyOn(razasService, 'getRazas').and.returnValue(of({}));
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.razas).toEqual(mockRazas);
  });

  it('should get breed', () => {
    component.terminoBusqueda = 'beagle';
    component.razas = mockRazas;
    mockRaza = { message: 'url foto encontrada' };

    response = {
      message: 'url foto encontrada'
    }

    spyOn(razasService, 'getRaza').and.returnValue(of(response));
    component.buscarRaza();

    fixture.detectChanges();
    expect(razasService.getRaza).toHaveBeenCalled();
    expect(component.razaEncontrada).toEqual('beagle');
    expect(component.raza.message).toEqual(mockRaza.message);
  });

  it('should not get breed', () => {
    component.terminoBusqueda = 'mastin';
    component.razas = mockRazas;

    response = {
      message: 'url foto encontrada'
    }

    spyOn(razasService, 'getRaza').and.returnValue(of(response));
    component.buscarRaza();

    fixture.detectChanges();
    expect(component.razaEncontrada).toEqual('');
    expect(component.raza).toEqual({});
  });


});
