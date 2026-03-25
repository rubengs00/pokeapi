export interface PokemonPaginated {
    count: number;
    next: string | null;
    previous: string | null;
    results:PokemonResults[];
}

export interface PokemonResults{
    name: string;
    url: string;
}