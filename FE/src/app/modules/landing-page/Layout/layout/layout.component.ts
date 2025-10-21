import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, FooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
