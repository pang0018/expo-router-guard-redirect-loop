import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

// Signing out turns the `(app)` guard false. The guarded route then redirects to
// its navigator's fallback, the root `index` (`/`). `/` also matches
// `(app)/(home)/index`, which is guarded too, so the redirect loops.
it('shows the sign-in screen after signing out', async () => {
  jest.useFakeTimers();
  const consoleError = jest.spyOn(console, 'error').mockImplementation((message) => {
    if (String(message).includes('Maximum update depth exceeded')) {
      throw new Error('Redirect loop: Maximum update depth exceeded');
    }
  });

  await renderRouter('./app', { initialUrl: '/' });
  await act(async () => jest.runOnlyPendingTimers());
  expect(screen.getByText('Sign-in screen (app/index.tsx)')).toBeTruthy();

  fireEvent.press(screen.getByText('Sign in'));
  await act(async () => jest.runOnlyPendingTimers());
  expect(screen.getByText('Home screen (app/(app)/(home)/index.tsx)')).toBeTruthy();

  fireEvent.press(screen.getByText('Sign out'));

  expect(await screen.findByText('Sign-in screen (app/index.tsx)')).toBeTruthy();
  consoleError.mockRestore();
  jest.useRealTimers();
});
