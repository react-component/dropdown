import { StrictMode } from 'react';
import { render, act } from '@testing-library/react';

const globalTimeout = global.setTimeout;

export async function sleep(timeout = 0) {
  await act(async () => {
    await new Promise((resolve) => {
      globalTimeout(resolve, timeout);
    });
  });
}

function customRender(ui: any, options: any = {}) {
  return render(ui, { wrapper: StrictMode, ...options });
}

export { customRender as render };
