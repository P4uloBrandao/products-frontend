import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {User, UserRole} from "../../models/user.models";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  public auth?: User | null;
  private authService = inject(AuthService);

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.auth = this.authService.getAuth();

    this.authService.userName$.subscribe(auth => {
      this.auth = auth;
    });
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  getUserName() {
    return this.auth?.emailUser.split('@')[0];
  }

  logout() {
    this.auth = undefined;
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return this.auth?.roleUser === UserRole.ADMIN;
  }
}
