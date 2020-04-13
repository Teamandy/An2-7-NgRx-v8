import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer, RouterEffects } from './router';
import { UsersStoreModule } from './users/users-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,

        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: true,
        // router action is not serializable
        // set false
        strictActionSerializability: false
      }
    }),
    TasksStoreModule,
    UsersStoreModule,
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer // has a priority over routerState
    }),
  ]
})
export class RootStoreModule  { }
