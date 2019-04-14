import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {

  private url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getClientList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/socketList`);
  }

}
