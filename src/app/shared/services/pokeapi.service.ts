import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  getPokemon(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }

  getMove(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getType(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
