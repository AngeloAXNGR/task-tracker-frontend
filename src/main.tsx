import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/index.ts'

// Context Provider
import { FormContextProvider } from './contexts/FormContext.tsx'
import { TaskContextProvider } from './contexts/TaskContext.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
          <TaskContextProvider>
            <FormContextProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </FormContextProvider>
          </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
