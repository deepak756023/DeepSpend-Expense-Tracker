import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, RouterModule, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


}
