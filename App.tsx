import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Video, {OnLoadData} from 'react-native-video';

const App = () => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(0);
  const videoRef = useRef<Video>(null); // Add Video type to useRef
  const [isDragging, setIsDragging] = useState(false); // State to track slider dragging

  useEffect(() => {
    setEndValue(videoDuration);
  }, [videoDuration]);

  const handleVideoLoad = (meta: OnLoadData) => {
    setVideoDuration(meta.duration);
  };

  const handleValuesChangeStart = () => {
    setIsDragging(true); // Set dragging state to true when user starts dragging
  };

  const handleValuesChange = (values: number[]) => {
    if (!isDragging) {
      return;
    } // Return early if not dragging
    setStartValue(values[0]);
    setEndValue(values[1]);
    console.log(values);
    if (videoRef.current) {
      videoRef.current.seek(values[0]); // Seek to the start value
    }
  };

  const handleValuesChangeFinish = () => {
    setIsDragging(false); // Set dragging state to false when user finishes dragging
  };

  const trimVideo = () => {
    console.log('Trimming video...');
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
      videoRef.current.seek(startValue);
      videoRef.current.dismissFullscreenPlayer(); // Dismiss to start playback
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/test-video.mp4')}
        style={styles.video}
        controls={false}
        paused={true}
        ref={videoRef}
        onLoad={meta => handleVideoLoad(meta)}
      />

      <TouchableOpacity onPress={playVideo}>
        <View style={styles.triangle} />
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Text>Start time: {parseFloat(startValue.toFixed(2))} sec</Text>
        <Text>End time: {parseFloat(endValue.toFixed(2))} sec</Text>
        <MultiSlider
          values={[startValue, endValue]}
          sliderLength={300}
          min={0}
          max={videoDuration}
          step={0.01}
          onValuesChangeStart={handleValuesChangeStart} // Start dragging event
          onValuesChange={handleValuesChange}
          onValuesChangeFinish={handleValuesChangeFinish} // Finish dragging event
        />
      </View>

      <TouchableOpacity onPress={trimVideo} style={styles.trimButton}>
        <Text style={styles.trimButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: 300,
    height: 400,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    transform: [{rotate: '90deg'}],
  },
  sliderContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  trimButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 6,
    margin: 10,
    width: '90%',
    color: 'white',
  },
  trimButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
