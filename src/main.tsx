import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store,persistor} from './redux/storag.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
