import { createAction, props } from '@ngrx/store';

export const getUser = createAction('[Home Page] User Details Loaded', props<{ user: any }>())
