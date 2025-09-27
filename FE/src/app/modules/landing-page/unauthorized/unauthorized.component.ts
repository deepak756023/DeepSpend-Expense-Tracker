import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-unauthorized',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

}
