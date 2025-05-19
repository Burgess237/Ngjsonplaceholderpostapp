import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostContainerComponent } from './post-container.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadPosts } from '../../shared/store/post.actions';
import { MemoizedSelector } from '@ngrx/store';
import { Post } from '../../shared/models/posts';
import {
  selectAllPosts,
  selectActivePostId,
} from '../../shared/store/post.selectors';
import { PostItemComponent } from '../post-item/post-item.component';
import { AsyncPipe, CommonModule } from '@angular/common';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let fixture: ComponentFixture<PostContainerComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let mockSelectAllPosts: MemoizedSelector<unknown, Post[]>;
  let mockSelectActivePostId: MemoizedSelector<unknown, number | null>;

  const mockPosts: Post[] = [
    { id: 1, title: 'Test 1', body: 'Body 1', userId: 1 },
    { id: 2, title: 'Test 2', body: 'Body 2', userId: 2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostItemComponent,
        AsyncPipe,
        CommonModule,
        PostContainerComponent,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    mockSelectAllPosts = store.overrideSelector(selectAllPosts, mockPosts);
    mockSelectActivePostId = store.overrideSelector(selectActivePostId, 2);

    fixture = TestBed.createComponent(PostContainerComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPosts on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadPosts());
  });

  it('should select all posts from the store', (done) => {
    component.posts$.subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
      done();
    });
  });

  it('should select the active post ID from the store', (done) => {
    component.activePostId$.subscribe((id) => {
      expect(id).toBe(2);
      done();
    });
  });
});
