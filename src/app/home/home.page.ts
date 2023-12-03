import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public pokemons: any[] = []

  constructor(
    private pokemonService: PokemonServiceService
  ) {}

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((res: any) => {
      this.pokemons = res.results
      console.log(res)

      this.pokemons.forEach((pokemon, index) => {
        const numeroPokemon = index + 1;
        pokemon.imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`;
      });
    })
  }

  showPokemon(id: number){
    console.log('id del Pokemon: ', id)
  }

}
