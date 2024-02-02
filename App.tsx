import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import WebView from 'react-native-webview';

const App = () => {
  const videoDuration = 1500; // Mock video duration in seconds
  const [startValue, setStartValue] = useState(60); // State for start trim value (in seconds)
  const [endValue, setEndValue] = useState(videoDuration); // State for end trim value (in seconds)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  const handleValuesChange = (values: any) => {
    setStartValue(values[0]);
    setEndValue(values[1]);
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <WebView
          style={{width: 300, height: 200}}
          javaScriptEnabled={true}
          source={{uri: 'https://www.youtube.com/embed/ZbIzZD_YNsA'}}
        />
        <Text style={styles.timeStamp}>
          Start time: {formatTime(startValue)}
        </Text>
        <MultiSlider
          values={[startValue, endValue]}
          sliderLength={300}
          min={0}
          max={videoDuration}
          step={0.01}
          onValuesChange={handleValuesChange}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() => console.log('Next button pressed')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStamp: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 6,
    margin: 10,
    width: '90%',
    color: 'white',
  },
});

export default App;
