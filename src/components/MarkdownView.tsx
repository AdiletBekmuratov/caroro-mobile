import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionManager, Linking, View } from 'react-native';
import WebView from 'react-native-webview';
import tw from 'twrnc';
import Spinner from './Spinner';

import markdown from 'markdown-it';

let md = new markdown();

const customHTML = (text: string) => {
  const htmlElement = `
<html>
  <head>
    <title>Caroro MarkdownView</title>
    <meta charset="UTF-8"></meta>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" integrity="sha512-bm684OXnsiNuQSyrxuuwo4PHqr3OzxPpXyhT66DA/fhl73e1JmBxRKGnO/nRwWvOZxJLRCmNH7FII+Yn1JNPmg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </head>

  <body>
    <main id="content" class="markdown-body" style="background: transparent;">
    ${md.render(text)}
    </main>
  </body>
<html>`;

  return htmlElement;
};

interface MarkdownViewProps {
  style?: string;
  text: string;
}

const MarkdownView: FC<MarkdownViewProps> = ({ style, text }) => {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef<WebView>(null);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  let navigation = useNavigation();

  const handleLoadEnd = () => {
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => setIsWebViewLoaded(true));
    }, []),
  );

  useEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        setIsWebViewLoaded(false);
      });
      return unsubscribe;
    }, []),
  );

  return (
    <View style={[tw`${style}`]}>
      {isWebViewLoaded && (
        <WebView
          ref={webviewRef}
          onLoad={handleLoadEnd}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          androidHardwareAccelerationDisabled
          style={{
            backgroundColor: 'transparent',
            opacity: 0.99,
          }}
          source={{
            html: customHTML(text),
          }}
          onShouldStartLoadWithRequest={event => {
            Linking.openURL(event.url);
            return false;
          }}
        />
      )}

      {(loading || !isWebViewLoaded) && <Spinner />}
    </View>
  );
};

export default MarkdownView;
