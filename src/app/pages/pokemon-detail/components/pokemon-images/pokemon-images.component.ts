import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-images',
  standalone: true,
  templateUrl: './pokemon-images.component.html',
  styleUrl: './pokemon-images.component.css'
})
export class PokemonImagesComponent {

  @Input({ required: true }) sprites!: any;
  @Input({ required: true }) name!: string;

  get image() {
    return this.sprites?.other?.['official-artwork']?.front_default ?? null;
  }
}
