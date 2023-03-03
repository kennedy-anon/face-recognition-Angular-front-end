import { TestBed } from '@angular/core/testing';

import { SearchFaceLogsService } from './search-face-logs.service';

describe('SearchFaceLogsService', () => {
  let service: SearchFaceLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFaceLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
