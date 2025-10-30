import { NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnDestroy {

  isShowFooter: boolean = false;

  private routerSub!: Subscription;//(Subscription)Object returned after you subscribe to an Observable vs Observable: A stream of data that can be observed

  constructor(private route: ActivatedRoute, private router: Router) {

    this.checkCurrentPath(this.router.url);

    this.routerSub = this.router.events//Observable<Event>
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkCurrentPath(event.urlAfterRedirects);
      });
  }

  checkCurrentPath(currentRoutePath: string) {
    this.isShowFooter = currentRoutePath.includes('/home');
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
