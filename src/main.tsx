import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Context Provider
import { ProjectContextProvider } from './contexts/ProjectContext.tsx'
import { ProjectFormContextProvider } from './contexts/ProjectFormContext.tsx'
import { TaskContextProvider } from './contexts/TaskContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
        <TaskContextProvider>
          <ProjectFormContextProvider>
            <App />
          </ProjectFormContextProvider>
        </TaskContextProvider>
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
