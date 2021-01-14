import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CasaMatriz } from '@models/casa-matriz.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasaMatrizService {
  casaMatrizURL = `${environment.apiURL}/casa-matriz`;

  constructor(
    private http: HttpClient
  ) { }

  obtenerCasaMatriz(): Observable<CasaMatriz> {
    return this.http.get<CasaMatriz>(this.casaMatrizURL);
  }

  actualizar(casaMatriz: CasaMatriz): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.casaMatrizURL, casaMatriz);
  }
}
