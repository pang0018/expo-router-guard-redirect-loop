import { Button, Text, View } from 'react-native';
import { useAuth } from '../../../auth';

// Also matches `/`, like app/index.tsx.
export default function Home() {
  const { setSignedIn } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Home screen (app/(app)/(home)/index.tsx)</Text>
      <Button title="Sign out" onPress={() => setSignedIn(false)} />
    </View>
  );
}
