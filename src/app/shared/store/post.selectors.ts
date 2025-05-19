import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from '../models/posts';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state.posts,
);
export const selectActivePostId = createSelector(
  selectPostState,
  (state) => state.activePostId,
);
export const selectActivePost = createSelector(
  selectAllPosts,
  selectActivePostId,
  (posts, activeId) => {
    return posts.find((p) => p.id === activeId);
  },
);
