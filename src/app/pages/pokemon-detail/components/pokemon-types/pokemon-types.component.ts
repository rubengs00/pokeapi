import { Component, Input, inject, signal } from '@angular/core';
import { PokeApiService } from '../../../../shared/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-types',
  standalone: true,
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.css'
})
export class PokemonTypesComponent {

  ngOnChanges() {
    this.typeDetails.set({});
  }

  @Input({ required: true }) types!: any[];

  private api = inject(PokeApiService);

  typeDetails = signal<Record<string, any>>({});

  loadType(typeName: string, url: string) {
    if (this.typeDetails()[typeName]) return;

    this.api.getType(url).subscribe((data: any) => {

      const sprites = data.sprites ?? {};
      let icon: string | null = null;

      for (const generationKey of Object.keys(sprites)) {
        const generation = sprites[generationKey];
        if (!generation || typeof generation !== 'object') continue;

        for (const gameKey of Object.keys(generation)) {
          const game = generation[gameKey];
          if (!game || typeof game !== 'object') continue;

          if (game.name_icon) {
            icon = game.name_icon;
            break;
          }
        }

        if (icon) break;
      }

      this.typeDetails.update(prev => ({
        ...prev,
        [typeName]: { icon }
      }));
    });
  }
}
