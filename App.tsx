import { useEffect } from 'react';
import { Alert, PermissionsAndroid, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import messaging from "@react-native-firebase/messaging"
function App() {

  const requestPermission = async ()=>{
    try {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      console.log("result**", result)
      console.log("result**2", PermissionsAndroid.RESULTS.GRANTED)
      if(result === PermissionsAndroid.RESULTS.GRANTED){
        // request for device token
        requestToken()
      }else{
        Alert.alert("Permission Denied")
      }
    } catch (error) {
        console.log(error)
    }
  }

  const requestToken = async ()=>{
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log("token**", token)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    requestPermission()
  }, [])


  /** foreground notification */

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Push Notification</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:'center'
  },
});

export default App;
