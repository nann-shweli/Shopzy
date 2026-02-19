import { View, Text, StyleSheet } from 'react-native';

const SignInBanner = () => {
  return (
    <View style={styles.signInBanner}>
      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>Sign in and enjoy more</Text>
      </View>
      <View style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  signInTextContainer: {
    flex: 1,
  },
  signInText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  signInButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignInBanner;
