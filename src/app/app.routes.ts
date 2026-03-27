import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/pokemon-list/pokemon-list').then(m=>m.PokemonList)
    },
    {
        path: 'pokemon/:id',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail').then(m=>m.PokemonDetail)
    }
];
