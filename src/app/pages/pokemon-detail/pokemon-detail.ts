import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokeApiService } from '../../shared/services/pokeapi.service';

import { PokemonImagesComponent } from './components/pokemon-images/pokemon-images.component';
import { PokemonSoundComponent } from './components/pokemon-sound/pokemon-sound.component';
import { PokemonTypesComponent } from './components/pokemon-types/pokemon-types.component';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';
import { PokemonMovesComponent } from './components/pokemon-moves/pokemon-moves.component';
import { PokemonNavigationComponent } from './components/pokemon-navigation/pokemon-navigation.component';
import { PokemonStatsComponent } from './components/pokemon-stats/pokemon-stats.component';
import { PokemonFormsComponent } from './components/pokemon-forms/pokemon-forms.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    PokemonImagesComponent,
    PokemonSoundComponent,
    PokemonTypesComponent,
    PokemonInfoComponent,
    PokemonMovesComponent,
    PokemonNavigationComponent,
    PokemonStatsComponent,
    PokemonFormsComponent
  ],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail {

  private route = inject(ActivatedRoute);
  private api = inject(PokeApiService);

  pokemon = signal<any | null>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.api.getPokemon(id).subscribe(data => {
        this.pokemon.set(data);
      });
    });
  }

}
