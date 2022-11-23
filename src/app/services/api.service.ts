import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  listado = [];
  item : any;
  private urlBaseApi = 'https://jsonplaceholder.typicode.com/';
  constructor(
    private httpClient: HttpClient) { 
    }

  getUsers()
  {
    let url = this.urlBaseApi + 'users/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getPosts(id: String){
    let url = this.urlBaseApi + 'posts/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['userId'] == id)
          {
            this.listado.push(item); 
          }
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getComments(id: String){
    let url = this.urlBaseApi + 'posts/' + id + '/comments/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['postId'] == id)
          {
            this.listado.push(item); 
          }
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

}


