import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {
    // super();

  }


  logout() {
    this.authService.logoutUsuario().then( () => {
      this.router.navigate(['/login']);
    });
  }
}
