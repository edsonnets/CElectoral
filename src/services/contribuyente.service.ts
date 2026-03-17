import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { Contribuyente } from '../models/contribuyente.model';


const baseUrl= `${environment.BaseUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  constructor(private http: HttpClient) { }
  login(email:string, password:string): Observable<any> {
    return this.http.post<any>(`${environment.BaseUrl}auth/login`, { email, password });
  }

  getAllCandidatos(): Observable<any> {
    return this.http.get<any>(`${baseUrl}candidates`); //{'headers': this.headers.getHeaders()}
    }


  Guardavotos  (cont:any):  Observable<any> {
    return this.http.post<any>(`${baseUrl}votes/register`,cont);//,{'headers': this.headers.getHeaders()}
    }
  /*upDateContribuyente(cont:Contribuyente):  Observable<Contribuyente> {
      return this.http.put<Contribuyente>(`${baseUrl}`,cont,{'headers': this.headers.getHeaders()});
    }
*/


}
