import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-sound',
  standalone: true,
  templateUrl: './pokemon-sound.component.html',
  styleUrl: './pokemon-sound.component.css'
})
export class PokemonSoundComponent {

  @Input({ required: true }) cries!: any;

  play() {
    const cryUrl = this.cries?.latest ?? this.cries?.legacy ?? null;
    if (!cryUrl) return;

    const audio = new Audio(cryUrl);
    audio.play();
  }
}
