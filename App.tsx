import React, {useState, useRef, useEffect} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  video: ViewStyle;
  playButton: ViewStyle;
  playButtonText: TextStyle;
  sliderContainer: ViewStyle;
  trimButton: ViewStyle;
  trimButtonText: TextStyle;
}

const App: React.FC = () => {
  const videoRef = useRef<Video>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);
  const [isTrimming, setIsTrimming] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    setTrimEnd(videoDuration);
  }, [videoDuration]);

  const onVideoLoad = (data: OnLoadData) => setVideoDuration(data.duration);

  const onStartTrimming = () => setIsTrimming(true);

  const onTrimValuesChange = (values: number[]) => {
    const [start, end] = values;
    if (isTrimming) {
      setTrimStart(start);
      setTrimEnd(end);
    }
  };

  const onEndTrimming = () => setIsTrimming(false);

  const playTrimmedVideo = () => {
    if (videoRef.current) {
      videoRef.current.seek(trimStart);
      setIsPaused(false);
    }
  };

  const onVideoProgress = (data: OnProgressData) => {
    if (data.currentTime >= trimEnd) {
      setIsPaused(true);
      videoRef.current?.seek(trimStart);
    }
  };

  const trimVideo = () =>
    console.log('Trimming video from:', trimStart, 'to', trimEnd);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('./assets/test-video.mp4')}
        style={styles.video}
        paused={isPaused}
        onLoad={onVideoLoad}
        onProgress={onVideoProgress}
        repeat={false}
      />
      <TouchableOpacity onPress={playTrimmedVideo} style={styles.playButton}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Text>Start: {trimStart.toFixed(2)} sec</Text>
        <Text>End: {trimEnd.toFixed(2)} sec</Text>
        <MultiSlider
          values={[trimStart, trimEnd]}
          sliderLength={300}
          onValuesChangeStart={onStartTrimming}
          onValuesChange={onTrimValuesChange}
          onValuesChangeFinish={onEndTrimming}
          min={0}
          max={videoDuration > 0 ? videoDuration : 100}
          step={0.01}
        />
      </View>
      <TouchableOpacity onPress={trimVideo} style={styles.trimButton}>
        <Text style={styles.trimButtonText}>Trim Video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles: Style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  video: {width: 300, height: 400},
  playButton: {
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
  playButtonText: {fontSize: 16, color: 'blue'},
  sliderContainer: {width: '100%', alignItems: 'center', marginVertical: 20},
  trimButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 6,
    margin: 10,
    width: '90%',
  },
  trimButtonText: {color: '#fff', textAlign: 'center', fontSize: 16},
};

export default App;
