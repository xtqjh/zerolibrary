import { TestBed } from '@angular/core/testing';

import { OrganizationStructureService } from './organization-structure.service';

describe('OrganizationStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationStructureService = TestBed.get(OrganizationStructureService);
    expect(service).toBeTruthy();
  });
});
