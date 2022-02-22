import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectMainState = createFeatureSelector<any>('Main')

export const userDetails = createSelector(
  selectMainState,
  state => state.user
)
