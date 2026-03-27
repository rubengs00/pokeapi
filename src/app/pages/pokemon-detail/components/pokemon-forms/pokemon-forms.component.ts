import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-forms',
  standalone: true,
  templateUrl: './pokemon-forms.component.html',
  styleUrl: './pokemon-forms.component.css'
})
export class PokemonFormsComponent {

  @Input({ required: true }) sprites!: any;

  get forms() {
    return {
      front: this.sprites?.front_default,
      back: this.sprites?.back_default,
      frontShiny: this.sprites?.front_shiny,
      backShiny: this.sprites?.back_shiny
    };
  }
}
