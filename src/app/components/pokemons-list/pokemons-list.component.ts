import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {

  pokemons: any = [];
  page = 1; // Página actual
  limit = 20; // Límite de Pokémon por página
  totalPokemons: number = 0;
  totalPages: number = 0;
  showPokemonDetail = false;

  constructor(
    private pokemonService: PokemonesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemons = []; // Limpiar la lista antes de cargar la nueva página
    this.pokemonService.getPokemons(this.limit, (this.page - 1) * this.limit)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        this.totalPages = Math.ceil(this.totalPokemons / this.limit); // Calcular el total de páginas

        // Peticiones paralelas para obtener más datos de cada Pokémon
        const requests = response.results.map((pokemon: any) =>
          this.pokemonService.getMoreData(pokemon.name)
        );

        // Realizar todas las peticiones en paralelo
        forkJoin(requests).subscribe((pokemonDetails) => {
          this.pokemons = pokemonDetails;
        });
      });
  }

  // Navegar al detalle del Pokémon
  getPokemon(pokemon: any) {
    this.router.navigateByUrl(`pokemon/${pokemon.id}`);
  }

  // Ir a la página anterior
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getPokemons();
    }
  }

  // Ir a la página siguiente
  nextPage() {
    if (this.page < this.totalPages!) {
      this.page++;
      this.getPokemons();
    }
  }
}
