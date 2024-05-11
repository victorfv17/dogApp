import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Raza } from '../models/raza.model';

@Injectable({
  providedIn: 'root'
})
export class RazasService {
  private apiUrl: string = 'https://dog.ceo/api';

  constructor(private http: HttpClient) { }

  private getEndpoint(resource: string): string {
    return `${this.apiUrl}/${resource}`;
  }

  getRazas(): Observable<Raza> {
    const specificEndPoint = `breeds/list/all`;

    return this.http.get<Raza>(this.getEndpoint(specificEndPoint))
      .pipe(map(response => response),
        catchError(this.handleError));
  }

  getRaza(terminoBusqueda: string): Observable<Raza> {
    const specificEndPoint = `breed/${terminoBusqueda}/images/random`;

    return this.http.get<Raza>(this.getEndpoint(specificEndPoint))
      .pipe(
        map(response => response),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Error con código ${error.status}, el error es: `, error.error);

    return throwError(() => new Error('Hubo un error. Vuelva a intentarlo más tarde.'));
  }
}
