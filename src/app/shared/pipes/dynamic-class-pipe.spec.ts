import { DynamicClassPipe } from '../pipes/dynamic-class-pipe';

describe('DynamicClassPipe', () => {
  let pipe: DynamicClassPipe;

  beforeEach(() => {
    pipe = new DynamicClassPipe();
  });

  it('should create an instance of the DynamicClassPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return warning class for "In Progress"', () => {
    expect(pipe.transform('In Progress')).toBe('btn-warning');
  });

  it('should return secondary class for "Pending"', () => {
    expect(pipe.transform('Pending')).toBe('btn-secondary');
  });

  it('should return success class for "Done"', () => {
    expect(pipe.transform('Done')).toBe('btn-success');
  });

  it('should return primary class for "New"', () => {
    expect(pipe.transform('New')).toBe('btn-primary');
  });

  it('should return dark class for unknown values', () => {
    expect(pipe.transform('Unknown')).toBe('btn-dark');
  });

  it('should return dark class for empty value', () => {
    expect(pipe.transform('')).toBe('btn-dark');
  });
});