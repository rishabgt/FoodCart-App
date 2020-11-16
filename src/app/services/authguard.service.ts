import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../menu/menu.module';

@Injectable({
  providedIn: 'root',
})
export class Authguard implements CanActivate {
  constructor(private _dataService: DataService, private router: Router) {}

  canActivate() {
    if (this._dataService.getLogin()) { return true; }
    else { this.router.navigate(['']); }
    return false;
  }
}
