import { Button, Text, View } from 'react-native';
import { useAuth } from '../../auth';

export default function Settings() {
  const { setSignedIn } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Settings screen</Text>
      <Button title="Sign out" onPress={() => setSignedIn(false)} />
    </View>
  );
}
