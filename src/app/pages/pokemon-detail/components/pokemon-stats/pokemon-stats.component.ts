import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './pokemon-stats.component.html',
  styleUrl: './pokemon-stats.component.css'
})
export class PokemonStatsComponent {

  @Input({ required: true }) stats!: any[];

  readonly MAX_STAT = 255;

  getPercentage(value: number): number {
    return Math.min((value / this.MAX_STAT) * 100, 100);
  }
}
