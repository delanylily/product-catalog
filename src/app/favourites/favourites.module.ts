import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { RouterModule } from '@angular/router';
import { FavouritesResolver } from './services/favourites.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavouritesComponent,
        resolve: {
          likedItems: FavouritesResolver
        }
      }
    ])
  ],
  declarations: [FavouritesComponent],
  providers: [FavouritesResolver]
})
export class FavouritesModule { }
