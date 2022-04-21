import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPictures, setLoading } from '../redux/slices/picsSlice';
import { LoadMore } from './LoadMore';
import { PictureView } from './PictureView';

export function InfiniteScrollView() {
  const [endIndex, setEndIndex] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);

  const dispatch = useDispatch();
  const pictures = useSelector(state => state.pics.pictures);
  const loading = useSelector(state => state.pics.loading);

  useEffect(() => {
    dispatch(fetchPictures());
  }, []);

  const handleLayout = e => {
    const { height, width } = e.nativeEvent.layout;
    setDimensions({ height, width });
  };

  const handleOnEndReached = () => {
    if (pictures.length + 1 === endIndex || loading || !hasScrolled) { return; }
    dispatch(setLoading(true));
    setEndIndex(prevIndex => prevIndex + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      {pictures.length > 0 &&
        <FlatList
          scrollEnabled={true}
          onScroll={() => {
            setHasScrolled(true);
          }}
          data={pictures.slice(0, endIndex)}
          onEndReached={handleOnEndReached}
          keyExtractor={item => item[0].id}
          ListFooterComponentStyle={{
            display: endIndex <= pictures.length ? 'flex' : 'none',
          }}
          ListFooterComponent={LoadMore}
          onLayout={handleLayout}
          renderItem={({ item }) => {
            const { width, height } = dimensions;
            return <PictureView
              items={item}
              height={height}
              width={width}
              loadedCallback={() => dispatch(setLoading(false))}
            />;
          }}
        />
      }
    </View>
  );
}
