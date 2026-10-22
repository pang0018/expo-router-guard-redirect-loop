# expo-router: `Stack.Protected` redirect loop on sign-out (SDK 58)

Minimal reproduction for an expo-router 58 regression. When a `Stack.Protected` guard turns
false and the guard has no `redirectTo`, the guarded route redirects to its navigator's
fallback route. Here the fallback is the root `app/index.tsx`, and its URL is `/`. But `/` also
matches `app/(app)/(home)/index.tsx`, which is guarded too. The redirect lands on that guarded
route, which redirects again, so React stops with "Maximum update depth exceeded".

A larger app with the same route shape signed out without a loop on SDK 57.

## Routes

```
app/_layout.tsx               Stack: (app) guarded by signedIn, index guarded by !signedIn
app/index.tsx                 sign-in screen, URL /
app/(app)/_layout.tsx         Tabs
app/(app)/(home)/_layout.tsx  Stack
app/(app)/(home)/index.tsx    home screen, URL / as well
app/(app)/settings.tsx
```

## Steps

1. `npm install`
2. `npx expo start`, then open the app on iOS, Android or web.
3. Press **Sign in**. The home screen opens.
4. Press **Sign out**.

**Expected:** the sign-in screen opens.

**Actual:** "Maximum update depth exceeded" is logged repeatedly, and the sign-in screen does
not open.

## Test

`npm test` runs `__tests__/signOut.test.tsx`, which does the same steps with
`expo-router/testing-library`. It fails on expo-router 58.0.25.
