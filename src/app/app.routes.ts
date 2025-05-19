import { Routes } from '@angular/router';
import { PostContainerComponent } from './posts/post-container/post-container.component';

export const routes: Routes = [
  {
    loadComponent() {
      return PostContainerComponent;
    },
    path: '',
  },
  {
    path: '*',
    redirectTo: '',
  },
];
