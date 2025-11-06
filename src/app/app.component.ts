import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
// import { DrinkComponent } from "./drink/drink.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    // DrinkComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kocsmai raktárkészlet';
}
