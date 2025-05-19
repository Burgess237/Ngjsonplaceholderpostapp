import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../shared/store/post.actions';
import {
  selectAllPosts,
  selectActivePostId,
} from '../../shared/store/post.selectors';
import { PostItemComponent } from '../post-item/post-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-container',
  template: `
    @let posts = posts$ | async;
    <!-- Move active ID here to prevent memory leaks from obserbables -->
    @let isActiveId = activePostId$ | async;

    <div class="post-container">
      @for (post of posts; track post.id) {
        <app-post-item [post]="post" [isActive]="isActiveId === post.id" />
      }
    </div>
  `,
  styles: `
    .post-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    app-post-item {
      flex: 0 0 calc(10% - 0.5rem);
      aspect-ratio: 1 / 1;
      box-sizing: border-box;
      min-width: 80px;
    }

    @media (max-width: 768px) {
      app-post-item {
        flex: 0 0 calc(20% - 0.5rem);
      }
    }

    @media (max-width: 480px) {
      app-post-item {
        flex: 0 0 calc(33.33% - 0.5rem);
      }
    }
  `,
  imports: [PostItemComponent, AsyncPipe],
})
export class PostContainerComponent implements OnInit {
  private store = inject(Store);
  posts$ = this.store.select(selectAllPosts);
  activePostId$ = this.store.select(selectActivePostId);

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }
}
