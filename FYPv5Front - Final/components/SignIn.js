import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const SignIn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSignIn = () => {
    hideModal();
    // // check if username and password are correct
    // if (usernameValue === 'A' && passwordValue === 'A') {
    //   console.log('Sign in successful!');
    //   hideModal();
    // } else {
    //   console.log('Sign in failed!');
    //   showMessage({
    //     message: '',
    //    // description: 'Invalid username or password',
    //     type: 'danger',
    //     backgroundColor: 'red',
    //     color: 'white',
    //     duration: 3000,
    //   });
    // }
  };

  useEffect(() => {
    showModal();
  }, []);

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please sign in</Text>
        <TextInput
          placeholder="Username"
          value={usernameValue}
          onChangeText={setUsernameValue}
        />
        <TextInput
          placeholder="Password"
          value={passwordValue}
          onChangeText={setPasswordValue}
          secureTextEntry
        />
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </Modal>
  );
};

export default SignIn;
