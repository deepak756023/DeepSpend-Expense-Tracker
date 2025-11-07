import { Component } from '@angular/core';
import { NewsComponent } from "../news/news.component";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { OurTeamsComponent } from "../our-teams/our-teams.component";
import { FooterComponent } from "../footer/footer.component";
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-home',
  imports: [NewsComponent, AboutComponent, ContactComponent, OurTeamsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
