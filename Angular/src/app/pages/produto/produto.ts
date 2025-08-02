import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {
  produto: any = null;
  loading = true;
  error = false;
  produtoAdicionado = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');

    if (produtoId) {
      this.productService.getProdutoPorId(+produtoId).subscribe({
        next: (data) => {
          this.produto = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }

  adicionarAoCarrinho(): void {
    if (this.produto) {
      this.cartService.addToCart(this.produto);
      this.produtoAdicionado = true;

      // Opcional: reseta o feedback após alguns segundos
      setTimeout(() => {
        this.produtoAdicionado = false;
      }, 2000);
    }
  }
}
