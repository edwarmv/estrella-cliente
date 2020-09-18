import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

export type BreadCrumb = {
  label: string;
  url: string;
};

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadCrumb[];
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // cuando se recarga la pagina
    this.breadcrumbs = this.buildBreadCrumb(
      this.activatedRoute.root
    );

    // solo se activa si hay un cambio en el path
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(
        this.activatedRoute.root
      );
    });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb : '';
    let path =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.path : '';

    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const nextURL = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label,
      url: nextURL
    };

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(
        route.firstChild,
        nextURL,
        newBreadcrumbs
      );
    }

    return newBreadcrumbs;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
