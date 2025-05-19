import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostActions from './post.actions';
import { switchMap, map } from 'rxjs/operators';
import { PostService } from '../services/posts.service';

@Injectable()
export class PostEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap(() => this.postService.fetchPosts()),
      map((posts) => PostActions.loadPostsSuccess({ posts })),
    ),
  );
}
