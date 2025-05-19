import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostItemComponent } from './post-item.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { setActivePost } from '../../shared/store/post.actions';
import { Post } from '../../shared/models/posts';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockPost: Post = {
    title: 'Mock Title',
    userId: 1,
    id: 101,
    body: 'Mock Body',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, PostItemComponent],
      declarations: [],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch');

    component.post = { ...mockPost };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set currentDisplayValue to post title', () => {
      component.ngOnInit();
      expect(component.currentDisplayValue).toBe('Mock Title');
    });
  });

  describe('ngOnChanges', () => {
    it('should reset displayIndex and currentDisplayValue if not active', () => {
      component.isActive = false;
      component.displayIndex = 2;
      component.currentDisplayValue = 'Something else';
      component.ngOnChanges();
      expect(component.displayIndex).toBe(0);
      expect(component.currentDisplayValue).toBe('Mock Title');
    });

    it('should not reset if active', () => {
      component.isActive = true;
      component.displayIndex = 1;
      component.currentDisplayValue = 'Changed';
      component.ngOnChanges();
      expect(component.displayIndex).toBe(1);
      expect(component.currentDisplayValue).toBe('Changed');
    });
  });

  describe('onClick', () => {
    it('should dispatch setActivePost action', () => {
      component.isActive = false;
      component.onClick();
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(setActivePost({ postId: 101 }));
    });

    it('should rotate keys and update display value if active', () => {
      component.isActive = true;
      component.ngOnInit();

      const originalValue = component.currentDisplayValue;
      component.onClick();

      expect(component.displayIndex).toBe(1);
      const key = component.keys[1];
      expect(component.currentDisplayValue).toBe(mockPost[key].toString());
      expect(component.currentDisplayValue).not.toBe(originalValue);
    });

    it('should cycle back to the first key after reaching the end', () => {
      component.isActive = true;
      component.displayIndex = component.keys.length - 1;
      component.onClick();
      expect(component.displayIndex).toBe(0);
      expect(component.currentDisplayValue).toBe(component.currentDisplayValue);
    });
  });
});
