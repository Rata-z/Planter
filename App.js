import MainContainer from 'src/navigation/container/MainContainer'
import store, { persistor } from 'src/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'expo-dev-client'
function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
