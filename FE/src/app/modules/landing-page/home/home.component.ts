import { Component } from '@angular/core';
import { Header } from 'primeng/api';
import { TopbarComponent } from '../topbar/topbar.component';
import { FooterComponent } from "../footer/footer.component";
import { NewsComponent } from "../news/news.component";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { OurTeamsComponent } from "../our-teams/our-teams.component";

@Component({
  selector: 'app-home',
  imports: [TopbarComponent, FooterComponent, NewsComponent, AboutComponent, ContactComponent, OurTeamsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
