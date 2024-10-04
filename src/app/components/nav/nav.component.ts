import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigateByUrl('');
   }

   perfil(){
    this.router.navigateByUrl('perfil');
   }

   toggleEntrenador(){
     this.activeMenu = !this.activeMenu;
   }

}
