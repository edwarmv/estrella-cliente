import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { TabsLinks } from './tabs-links.type';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @Input()
  links: TabsLinks[];

  activeLink: string;

  unsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setActiveLink();
  }

  setActiveLink(): void {
    this.activeLink = this.route.snapshot.firstChild.url[0].path;

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe)
    )
    .subscribe(() => {
      this.activeLink = this.route.snapshot.firstChild.url[0].path;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
