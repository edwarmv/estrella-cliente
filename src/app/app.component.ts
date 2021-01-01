import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarService } from '@services/sidebar.service';
import { GoogleMapsService } from '@services/google-maps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;

  title = 'estrella-cliente';
  showHeader = false;
  showSidebar = false;
  showFooter = false;
  showBreadcrumbs = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mediaMatcher: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarService: SidebarService,
    // private googleMapsService: GoogleMapsService,
  ) {}

  ngAfterViewInit(): void {
    this.sidebarService.sidenav = this.sidenav;
    this.sidenav.openedStart
      .subscribe(() => this.sidebarService.opened.next(true));
    this.sidenav.closedStart
      .subscribe(() => this.sidebarService.opened.next(false));
  }


  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(min-width: 1000px)');
    this.mediaQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const data = this.activatedRoute.firstChild.snapshot.data;
        this.showHeader = data.showHeader !== false;
        this.showSidebar = data.showSidebar !== false;
        this.showFooter = data.showFooter !== false;
        this.showBreadcrumbs = data.showBreadcrumbs !== false;
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
  }
}
