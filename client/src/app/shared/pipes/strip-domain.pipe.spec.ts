import { StripDomainPipe } from './strip-domain.pipe';

describe('StripDomainPipe', () => {
  it('create an instance', () => {
    const pipe = new StripDomainPipe();
    expect(pipe).toBeTruthy();
  });
});
