import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-session-expired',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})
export class SessionExpiredComponent {

}
