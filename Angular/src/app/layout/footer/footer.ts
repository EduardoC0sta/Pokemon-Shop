import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ TranslocoModule ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  // Rola a janela do navegador suavemente para o topo da página.
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}