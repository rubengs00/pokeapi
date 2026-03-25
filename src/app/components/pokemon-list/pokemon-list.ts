import { Component, computed, inject, signal } from '@angular/core';
import { PokemonPaginated } from '../../shared/interfaces/pokemon-paginated.interface';
import { PokemonListItem } from '../pokemon-list-item/pokemon-list-item';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonListItem],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  readonly #httpService = inject(HttpClient);

  private allPokemonsResponse = toSignal(
    this.#httpService.get<PokemonPaginated>(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    ),
    { initialValue: null }
  );

  readonly pageSize = 20;
  currentPage = signal(1);

  totalPages = computed(() => {
    const response = this.allPokemonsResponse();
    if (!response) return 0;
    return Math.ceil(response.results.length / this.pageSize);
  });

  paginatedPokemons = computed(() => {
    const response = this.allPokemonsResponse();
    if (!response) return [];

    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;

    return response.results.slice(start, end);
  });

  visiblePages = computed<(number | string)[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const space = 2;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    const start = Math.max(2, current - space);
    const end = Math.min(total - 1, current + space);

    range.push(1);

    if (start > 2) {
      range.push('...');
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < total - 1) {
      range.push('...');
    }

    range.push(total);

    return range;
  });

  setPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  nextPage() {
    this.setPage(this.currentPage() + 1);
  }

  prevPage() {
    this.setPage(this.currentPage() - 1);
  }
}
