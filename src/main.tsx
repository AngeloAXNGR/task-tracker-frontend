import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Context Provider
import { ProjectContextProvider } from './contexts/ProjectContext.tsx'
import { FormContextProvider } from './contexts/FormContext.tsx'
import { TaskContextProvider } from './contexts/TaskContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
        <TaskContextProvider>
          <FormContextProvider>
            <App />
          </FormContextProvider>
        </TaskContextProvider>
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
