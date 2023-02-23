import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFaceComponent } from './search-face.component';

describe('SearchFaceComponent', () => {
  let component: SearchFaceComponent;
  let fixture: ComponentFixture<SearchFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
