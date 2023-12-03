import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons() {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon')
  }
}
