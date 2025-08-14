import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // 2. ALTERAÇÃO AQUI: Usar a variável do ambiente
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodosOsProdutos(): Observable<any[]> {
    // As URLs já estão corretas por causa da alteração acima
    const pelucias$ = this.http.get<any[]>(`${this.apiUrl}/produtos/pelucias`);
    const tcg$ = this.http.get<any[]>(`${this.apiUrl}/produtos/tcg`);

    return forkJoin([pelucias$, tcg$]).pipe(
      map(([pelucias, tcg]) => [...pelucias, ...tcg])
    );
  }

  getProdutoPorId(id: number): Observable<any> {
    // A URL já está correta por causa da alteração acima
    return this.http.get(`${this.apiUrl}/produtos/${id}`);
  }
}