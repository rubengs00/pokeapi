import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  private pokemonRequest$ = this.route.paramMap.pipe(
    switchMap(params => {
      const name = params.get('name');
      return this.http.get<any>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
    })
  );

  pokemon = toSignal(this.pokemonRequest$, { initialValue: null });

  frontImage = computed(() => {
    const p = this.pokemon();
    return p.sprites.front_default ?? null;
  });

  heightMeters = computed(() => {
    const p = this.pokemon();
    return p ? (p.height / 10).toFixed(1) : null;
  });

  weightKg = computed(() => {
    const p = this.pokemon();
    return p ? (p.weight / 10).toFixed(1) : null;
  });

  playCry() {
    const p = this.pokemon();
    const cryUrl = p.cries.latest ?? null;

    if (!cryUrl) return;

    const audio = new Audio(cryUrl);
    audio.play();
  }

  visibleMovesCount = signal(5);
  openedMove = signal<string | null>(null);
  moveDetails = signal<Record<string, any>>({});
  typeDetails = signal<Record<string, string>>({});

  visibleMoves = computed(() => {
    const p = this.pokemon();
    if (!p) return [];
    return p.moves.slice(0, this.visibleMovesCount());
  });

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
      this.http.get<any>(url).subscribe(data => {
        const description = data.effect_entries.find(
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

  loadType(typeName: string, url: string) {
    if (this.typeDetails()[typeName]) return;

    this.http.get<any>(url).subscribe(data => {
      const icon =
        data.sprites?.['generation-viii']?.['sword-shield']?.name_icon ??
        data.sprites?.['generation-ix']?.['scarlet-violet']?.name_icon ??
        null;

      if (!icon) return;

      this.typeDetails.update(prev => ({
        ...prev,
        [typeName]: icon
      }));
    });
  }
}
