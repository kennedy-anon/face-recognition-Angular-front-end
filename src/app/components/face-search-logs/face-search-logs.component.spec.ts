import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceSearchLogsComponent } from './face-search-logs.component';

describe('FaceSearchLogsComponent', () => {
  let component: FaceSearchLogsComponent;
  let fixture: ComponentFixture<FaceSearchLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceSearchLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceSearchLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
