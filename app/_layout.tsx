import { Stack } from 'expo-router';
import { useState } from 'react';
import { AuthContext } from '../auth';

export default function RootLayout() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={signedIn}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!signedIn}>
          {/* The sign-in route is the root `index`, so its URL is `/`. */}
          <Stack.Screen name="index" />
        </Stack.Protected>
      </Stack>
    </AuthContext.Provider>
  );
}
