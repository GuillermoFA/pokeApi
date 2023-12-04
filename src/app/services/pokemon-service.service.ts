import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(page: number, limit: number): Observable<any[]> {
    const offset = (page - 1) * limit;
    const apiUrl = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<any[]>(apiUrl);
  }

  getPokemonById(id: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(apiUrl);
  }

  getPokemon(pokemonName: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

}
