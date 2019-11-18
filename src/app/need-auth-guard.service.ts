import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CustomerService } from './customer.service'

@Injectable({
  providedIn: 'root'
})
export class NeedAuthGuardService implements CanActivate {

  constructor(private customerService: CustomerService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //return true;
    const redirectUrl = route['_routerState']['url'];

    if (this.customerService.isUserLoggedIn()) {
      console.log(" logged in")
      return true;

    }
    else
    {
console.log("not logged in")
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

      }

    return false;
  }
}
