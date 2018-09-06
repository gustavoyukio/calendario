import { TestBed, inject } from '@angular/core/testing';

import { ClassesFirebaseService } from './classes-firebase.service';

describe('ClassesFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassesFirebaseService]
    });
  });

  it('should be created', inject([ClassesFirebaseService], (service: ClassesFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
