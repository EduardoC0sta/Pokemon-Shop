import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho implements OnInit {
  cartItems$: Observable<CartItem[]>;
  total = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.currentCart;
  }

  ngOnInit(): void {
    // Escuta as mudanças no carrinho para recalcular o total
    this.cartItems$.subscribe(items => {
      this.total = this.cartService.getCartTotal();
    });
  }

  // Função para aumentar a quantidade
  increaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity + 1);
  }

  // Função para diminuir a quantidade
  decreaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity - 1);
  }

  // Função para remover um item específico
  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  // Função para limpar o carrinho todo
  clearCart(): void {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      this.cartService.clearCart();
    }
  }
}