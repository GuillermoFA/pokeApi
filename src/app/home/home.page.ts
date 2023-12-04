import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public pokemons: any[] = []
  pokemonToSearch: string = '';
  pokemon: any;

  currentPage = 1;
  limitPerPage = 15;


  constructor(
    private pokemonService: PokemonServiceService,
    private router: Router,
    private utilsController: UtilsService
  ) {}

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.currentPage, this.limitPerPage).subscribe((res: any) => {
      // Limpiar la lista de Pokémon antes de agregar los nuevos
      this.pokemons = [];

      // Actualizar las imágenes de los Pokémon
      res.results.forEach((pokemon: any, index: number) => {
        const numeroPokemon = (this.currentPage - 1) * this.limitPerPage + index + 1;
        const capitalizedPokemonName = this.capitalizeFirstLetter(pokemon.name);

        const pokemonData = {
          id: numeroPokemon,
          name: capitalizedPokemonName,
          imagenUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`,
        };

        this.pokemons.push(pokemonData);
      });
    });
  }

  showPokemon(id: number){
    console.log('id del Pokemon: ', id)
    this.router.navigate(['/profile', id])
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  pokemonSearch() {
    const lowercasePokemonName = this.pokemonToSearch.toLowerCase();

    this.pokemonService.getPokemon(lowercasePokemonName).subscribe(
      (data) => {
        console.log('Respuesta de getPokemon:', data);
        this.pokemon = data;
        console.log(this.pokemon);
        this.router.navigate(['/profile', data.id]);
      },
      (error) => {
        this.utilsController.presentToast({
          message: 'No se ha encontrado al Pokemon en esta PokeAPI',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        console.log(error);
      }
    );
  }

  nextPage() {
    this.currentPage++;
    this.getPokemons();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPokemons();
    }
  }



}
