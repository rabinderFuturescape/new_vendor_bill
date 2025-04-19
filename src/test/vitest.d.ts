
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';
import type * as matchers from '@testing-library/jest-dom/matchers';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveClass(...classNames: string[]): R;
  toHaveTextContent(text: string | RegExp): R;
  // Add any other matchers you might need
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
