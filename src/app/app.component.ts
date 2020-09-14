import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mediaQueryList: MediaQueryList;
  private mediaQueryListenner: () => void;

  title = 'estrella-cliente';
  showHeader = false;
  showSidebar = false;
  showFooter = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mediaMatcher: MediaMatcher,
    private changeDetector: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {}

  ngAfterViewInit(): void {
    this.sidebarService.sidenav = this.sidenav;
    this.sidenav.openedStart.subscribe(() => this.sidebarService.opened.next(true));
    this.sidenav.closedStart.subscribe(() => this.sidebarService.opened.next(false));
  }


  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(min-width: 1000px)');
    this.mediaQueryListenner = () => this.changeDetector.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListenner);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const data = this.activatedRoute.firstChild.snapshot.data;
        this.showHeader = data.showHeader !== false;
        this.showSidebar = data.showSidebar !== false;
        this.showFooter = data.showFooter !== false;
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListenner);
  }
}
