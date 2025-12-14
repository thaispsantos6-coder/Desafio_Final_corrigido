import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Por favor, preencha e-mail e senha.';
    }
  }
}
