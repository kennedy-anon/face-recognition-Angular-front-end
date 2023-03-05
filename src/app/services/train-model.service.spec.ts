import { TestBed } from '@angular/core/testing';

import { TrainModelService } from './train-model.service';

describe('TrainModelService', () => {
  let service: TrainModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
