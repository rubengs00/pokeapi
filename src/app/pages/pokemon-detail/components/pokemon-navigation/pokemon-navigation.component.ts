import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-navigation',
  standalone: true,
  templateUrl: './pokemon-navigation.component.html',
  styleUrl: './pokemon-navigation.component.css'
})
export class PokemonNavigationComponent {

  @Input({ required: true }) pokemonId!: number;

  private router = inject(Router);

  goPrevious() {
    if (this.pokemonId > 1) {
      const previousId = String(this.pokemonId - 1);
      this.router.navigateByUrl(`/pokemon/${previousId}`);
    }
  }

  goNext() {
    const nextId = String(this.pokemonId + 1);
    this.router.navigateByUrl(`/pokemon/${nextId}`);
  }
}
