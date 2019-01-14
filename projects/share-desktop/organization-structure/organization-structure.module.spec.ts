import { OrganizationStructureModule } from './organization-structure.module';

describe('OrganizationStructureModule', () => {
  let organizationStructureModule: OrganizationStructureModule;

  beforeEach(() => {
    organizationStructureModule = new OrganizationStructureModule();
  });

  it('should create an instance', () => {
    expect(organizationStructureModule).toBeTruthy();
  });
});
