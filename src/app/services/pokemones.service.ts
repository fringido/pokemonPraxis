import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  API = environment.API;


  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number){
    return this.http.get(`${this.API}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getMoreData(id: any){
    return this.http.get(`${this.API}/pokemon/${id}`);
  }


}
