import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/notification.context'
import { store } from './redux/store'
import { AppRouter } from './Router'

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  )
}

export default App
