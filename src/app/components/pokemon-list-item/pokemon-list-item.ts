import { Component, input } from '@angular/core';
import { PokemonResults } from '../../shared/interfaces/pokemon-paginated.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokemon-list-item',
  imports: [RouterLink],
  templateUrl: './pokemon-list-item.html',
  styleUrl: './pokemon-list-item.css',
})
export class PokemonListItem {
  pokemon = input.required<PokemonResults>();

}
