import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { Role } from '../../shared/enums/role.enum';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatMenuModule,
    MatIconModule,
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
