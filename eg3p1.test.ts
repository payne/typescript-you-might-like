import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navigate } from './eg3p1';

describe('navigate', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { location: { href: '' } });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('navigates to a users route', () => {
    navigate('/users/123');
    expect(window.location.href).toBe('/users/123');
  });

  it('navigates to a posts route', () => {
    navigate('/posts/abc');
    expect(window.location.href).toBe('/posts/abc');
  });

  it('navigates to the home route', () => {
    navigate('/home');
    expect(window.location.href).toBe('/home');
  });

  it('rejects a route that says "user" instead of "users"', () => {
    // @ts-expect-error - '/user/123' is not assignable to Route, only '/users/...' is
    navigate('/user/123');
  });
});
