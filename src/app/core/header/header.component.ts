import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


import { RouterLink } from '@angular/router';
import { Role } from '../../shared/interfaces/role.enum';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public Role = Role;
  
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
