import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemones: number | undefined;
  showPokemonDetail = false;

  constructor(
    private pokemonService: PokemonesService,
    private router: Router
  ) { }

  filterPost = '';

  ngOnInit(): void {
  this.getPokmons();
  }

  getPokmons(){
    this.pokemonService.getPokemons(20, this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemones = response.count;
      response.results.forEach((result: { name: string; }) =>{
        this.pokemonService.getMoreData(result.name)
        .subscribe((uniqResponse:any) =>{
          this.pokemons.push(uniqResponse);
        }
        )
      })
    })
  }

  togglePokemonDetail(){
    this.showPokemonDetail = !this.showPokemonDetail;
  }

  getPokemon(pokemon: any){
    this.router.navigateByUrl(`pokemon/${pokemon.id}`);
  }
}
