import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { number, string, arrayOf, shape, func } from 'prop-types';

export function PictureView({ items, height, width, loadedCallback }) {
  const [loaded, setLoaded] = useState(0);
  const allItemsLoaded = loaded >= items.length;

  useEffect(() => {
    if (loaded >= items.length) {
      loadedCallback();
    }
  }, [loaded]);

  return (
    <View style={{
      width: width,
      height: allItemsLoaded ? height : 1,
      opacity: allItemsLoaded ? 1 : 0,
    }}>
      {items.map(({download_url, id}) => {
        // Could use react-native-fast-image for optimization https://github.com/DylanVann/react-native-fast-image
        return <Image key={id} source={{ uri: download_url }} style={{ flex: 1 }} onLoadEnd={() => setLoaded(prev => prev + 1)} />;
      })}
    </View>
  );
}

PictureView.propTypes = {
  items: arrayOf(shape({
    download_url: string,
    id: string,
  })),
  height: number,
  width: number,
  loadedCallback: func
}