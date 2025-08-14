import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, CommonModule, TranslocoModule ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  ofertas = [
    {
      titulo: 'Pelúcia Wooper 20% OFF!',
      link: '/pelucia',
      imagem: 'img/wopper-plush-background.png'
    },
    {
      titulo: 'Deck Marnie 20% OFF!',
      link: '/tcg',
      imagem: 'img/marnie-deck-tcg-background.png'
    },
    {
      titulo: 'Nova Pelúcia a Venda',
      link: '/pelucia',
      imagem: 'img/fluttermane-plush-background.jpg'
    }
  ];

  constructor() { }
}