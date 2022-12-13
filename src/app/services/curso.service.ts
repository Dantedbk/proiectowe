import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CursoService {
  url = "http://localhost:3000/estudiante/"

  constructor(private http:HttpClient) { }

  cargarCursos(): Observable<any> {
    return this.http.get<any>(this.url)
  }
  cargarCurso(id:string): Observable<any> {
    return this.http.get(this.url+id)
  }

  // addNewCurso():Observable<cursoI>{
  //   return this.http.post()
  // }
}
