import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import Navigator from './src/navigator';
import { setLocalNotification } from './src/utility/helpers';
import { Font, AppLoading } from 'expo';

class App extends Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    setLocalNotification();
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      'AvenirNext-Regular': require('./fonts/AvenirNext-Regular.ttf'),
      'AvenirNext-DemiBold': require('./fonts/AvenirNext-DemiBold.ttf')
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
