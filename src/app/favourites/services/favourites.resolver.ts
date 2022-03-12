import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesResolver implements Resolve<any> {
  likedItems: Array<string> = [];
  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // this.categoryService.getResults().subscribe((items) => {
    //   if (items.length) {
    //     items.forEach(item => {
    //       if (item.like) {
    //         this.likedItems.push(item)
    //         console.log(this.likedItems, 'lily')
    //       }
    //       this.likedItems;
    //     })
    //   }
    // })
  }
}

