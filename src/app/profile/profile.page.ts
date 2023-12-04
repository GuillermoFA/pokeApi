import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId: any;
  pokemon: any;
  selectedAbilities: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonServiceService,
    private utilsController: UtilsService
  ) { }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonById(this.profileId).subscribe(
      (response: any) => {
        console.log(response);
        response.name = this.capitalizeFirstLetter(response.name);
        // Asignar la información del Pokémon a la variable pokemon
        this.pokemon = response;
      },
      (error) => {
        this.utilsController.presentToast({
          message: 'No se ha encontrado información del Pokémon en esta PokeAPI',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        console.log('Error al obtener información del Pokémon:', error);
      }
    );
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }



}
