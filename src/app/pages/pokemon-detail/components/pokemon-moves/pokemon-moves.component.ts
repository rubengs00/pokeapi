import { Component, Input, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PokeApiService } from '../../../../shared/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-moves',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './pokemon-moves.component.html',
  styleUrl: './pokemon-moves.component.css'
})
export class PokemonMovesComponent {

  ngOnChanges() {
    this.openedMove.set(null);
    this.moveDetails.set({});
    this.visibleMovesCount.set(5);
  }

  @Input({ required: true }) moves!: any[];

  private api = inject(PokeApiService);

  visibleMovesCount = signal(5);
  openedMove = signal<string | null>(null);
  moveDetails = signal<Record<string, any>>({});

  get visibleMoves() {
    return this.moves?.slice(0, this.visibleMovesCount()) ?? [];
  }

  loadMoreMoves() {
    this.visibleMovesCount.update(v => v + 5);
  }

  toggleMove(moveName: string, url: string) {
    if (this.openedMove() === moveName) {
      this.openedMove.set(null);
      return;
    }

    this.openedMove.set(moveName);

    if (!this.moveDetails()[moveName]) {
      this.api.getMove(url).subscribe((data: any) => {
        const description = data.effect_entries?.find(
          (e: any) => e.language.name === 'en'
        )?.effect;

        this.moveDetails.update(prev => ({
          ...prev,
          [moveName]: {
            ...data,
            description
          }
        }));
      });
    }
  }
}
