import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  constructor(
    private pokemonService: PokemonesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe(
      params => {
      this.getPokemon(params['id']);
    }
    );
  }

  ngOnInit(): void {}

  getPokemon(id: string) {
    this.pokemonService.getMoreData(id).subscribe(
      res => {
      this.pokemon = res;
      this.pokemonImg = this.pokemon.sprites.front_default;
      this.pokemonType = this.pokemon.types[0].type.name;

    });
  }

  home(){
    this.router.navigateByUrl('');
   }
}
