import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSource = new BehaviorSubject<CartItem[]>([]);
  currentCart = this.itemsSource.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      this.itemsSource.next(JSON.parse(savedCart));
    }
  }

  // Adiciona um produto ao carrinho ou incrementa sua quantidade.
  addToCart(product: any) {
    const currentItems = this.itemsSource.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        imagem: product.imagem,
        quantity: 1
      };
      currentItems.push(newItem);
    }
    this.updateCart(currentItems);
  }

  // Remove um item completamente do carrinho.
  removeItem(itemId: number) {
    const currentItems = this.itemsSource.value.filter(item => item.id !== itemId);
    this.updateCart(currentItems);
  }

  // Altera a quantidade de um item específico. Se a quantidade for 0 ou menos, remove o item.
  updateItemQuantity(itemId: number, quantity: number) {
    const currentItems = this.itemsSource.value;
    const itemToUpdate = currentItems.find(item => item.id === itemId);

    if (itemToUpdate) {
      if (quantity > 0) {
        itemToUpdate.quantity = quantity;
      } else {
        // Se a quantidade for 0, remove o item
        this.removeItem(itemId);
        return; // Sai da função para não chamar updateCart duas vezes
      }
    }
    this.updateCart(currentItems);
  }

  // Esvazia o carrinho completamente.
  clearCart() {
    this.updateCart([]);
  }


   // Calcula o valor total do carrinho.
  getCartTotal(): number {
    return this.itemsSource.value.reduce((total, item) => {
      return total + (item.preco * item.quantity);
    }, 0);
  }

// Centraliza a atualização e o salvamento no localStorage.
  private updateCart(items: CartItem[]) {
    this.itemsSource.next(items);
    localStorage.setItem('shopping_cart', JSON.stringify(items));
  }
}
