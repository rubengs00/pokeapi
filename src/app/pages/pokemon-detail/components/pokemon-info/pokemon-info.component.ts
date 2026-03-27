import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.css'
})
export class PokemonInfoComponent {

  @Input({ required: true }) pokemon!: any;

  get height() {
    return (this.pokemon?.height / 10).toFixed(1);
  }

  get weight() {
    return (this.pokemon?.weight / 10).toFixed(1);
  }
}
