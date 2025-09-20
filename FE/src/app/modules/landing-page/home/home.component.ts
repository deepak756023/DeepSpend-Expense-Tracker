import { Component } from '@angular/core';
import { Header } from 'primeng/api';
import { TopbarComponent } from '../topbar/topbar.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
