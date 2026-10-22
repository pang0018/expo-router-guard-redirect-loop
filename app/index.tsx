import { Button, Text, View } from 'react-native';
import { useAuth } from '../auth';

export default function SignIn() {
  const { setSignedIn } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Sign-in screen (app/index.tsx)</Text>
      <Button title="Sign in" onPress={() => setSignedIn(true)} />
    </View>
  );
}
