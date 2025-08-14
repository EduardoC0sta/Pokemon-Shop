import { Component, OnInit, Input, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, TranslocoModule ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class Header implements OnInit, AfterViewInit {
  @Input() isSticky: boolean = true;

  loginForm!: FormGroup;
  loginSubmitted = false;
  isLoggedIn$ = this.authService.usuarioLogado$;
  usuario: any = null;
  idiomaAtivo: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translocoService: TranslocoService
  ) { this.idiomaAtivo = this.translocoService.getActiveLang(); }

  //Validadores para login
  ngOnInit(): void {
    this.isLoggedIn$.subscribe(user => this.usuario = user);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  // Logica para o X do menu hamburguer
   closeMobileMenu(event: Event): void {
    event.stopPropagation(); 

    if (isPlatformBrowser(this.platformId)) {
      const mobileMenu = document.getElementById('mobileNavContent');
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        import('bootstrap').then(({ Collapse }) => {
          const bsCollapse = Collapse.getInstance(mobileMenu);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        });
      }
    }
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.clickout.bind(this));
    }
  }

  //Clickout menu hamburguer
clickout(event: Event): void {
  if (isPlatformBrowser(this.platformId)) {
    const target = event.target as HTMLElement;
    const mobileMenu = document.getElementById('mobileNavContent');
    const togglerButton = this.el.nativeElement.querySelector('.navbar-toggler');

    if (mobileMenu && mobileMenu.classList.contains('show')) {
      if (
        !mobileMenu.contains(target) && 
        togglerButton && !togglerButton.contains(target)
      ) {
        import('bootstrap').then(({ Collapse }) => {
          const bsCollapse = Collapse.getInstance(mobileMenu) || new Collapse(mobileMenu);
          bsCollapse.hide();
        });
      }
    }
  }
}

  // Login
  get lf() { return this.loginForm.controls; }
  onLoginSubmit(): void {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {},
      error: (err) => {}
    });
  }
  logout(): void {
    this.authService.logout();
  }

  // Metódo alterar idioma
  mudarIdioma(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.idiomaAtivo = lang;
  }
}