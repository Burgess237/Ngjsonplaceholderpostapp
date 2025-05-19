import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { selectActivePostId } from './shared/store/post.selectors';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <main class="app-container">
      <mat-toolbar color="primary">
        <span>Active Post ID: {{ activePostId$ | async }}</span>
      </mat-toolbar>

      <section class="wrapper">
        <router-outlet />
      </section>
    </main>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .wrapper {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
    }
  `,
  imports: [MatToolbarModule, RouterOutlet, AsyncPipe],
})
export class AppComponent {
  private store = inject(Store);
  activePostId$ = this.store.select(selectActivePostId).pipe(
    map((activePost) => {
      return activePost || 'No Active Post selected';
    }),
  );
}
