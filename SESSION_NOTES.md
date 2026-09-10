# Session Notes — TypeScript unit testing setup

## Starting point

The repo contained a single file, `eg3p1.ts`, demonstrating TypeScript template
literal types:

```ts
type Route = `/users/${string}` | `/posts/${string}` | '/home';
function navigate(route: Route) {
  window.location.href = route;
}
navigate('/users/123'); // ✅
navigate('/posts/abc'); // ✅
navigate('/user/123');
```

The last line failed to type-check because `'/user/123'` doesn't match the
`Route` type (it should be `'/users/123'`, plural).

## Task

1. Fix the type error on the last line.
2. Turn the folder into a proper TypeScript project.
3. Add a unit testing library so `npm run test` shows passing tests.

## Fix

Changed the typo from `/user/123` to `/users/123`, exported `Route` and
`navigate` so they're testable, and removed the module-level demo calls
(`navigate('/users/123'); navigate('/posts/abc'); ...`) since they were
side effects that ran on import — replaced by proper unit tests instead.

Final `eg3p1.ts`:

```ts
export type Route = `/users/${string}` | `/posts/${string}` | '/home';

export function navigate(route: Route) {
  window.location.href = route;
}
```

## Project scaffolding added

- **`package.json`** — created via `npm init -y`, then edited:
  - `"type": "module"`
  - `"scripts"`: `"test": "vitest run"`, `"typecheck": "tsc --noEmit"`
- **`tsconfig.json`** — strict mode, `lib: ["ES2020", "DOM"]` (needed for
  `window`), `noEmit: true`.
- **`vitest.config.ts`** — sets `test.environment: "jsdom"` so `window`
  exists in tests.
- **`.gitignore`** — ignores `node_modules/`.
- **Dependencies installed** (dev): `typescript`, `vitest`, `jsdom`.

## Test file: `eg3p1.test.ts`

jsdom doesn't actually implement navigation (setting
`window.location.href` logs `Not implemented: navigation to another
Document` and doesn't update the value), so the real `window` global is
stubbed out per test with `vi.stubGlobal` and a plain object instead:

```ts
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
});
```

## Result

```
$ npm run test
 Test Files  1 passed (1)
      Tests  3 passed (3)

$ npm run typecheck
(no output — clean)
```

## Files touched/created this session

- `eg3p1.ts` (modified — bug fix, exports, removed side-effect calls)
- `eg3p1.test.ts` (new)
- `package.json`, `package-lock.json` (new)
- `tsconfig.json` (new)
- `vitest.config.ts` (new)
- `.gitignore` (new)

None of these changes were committed to git during the session — they're
sitting as uncommitted changes/untracked files on the `main` branch.
