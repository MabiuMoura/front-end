import { BrowserRouter } from "react-router-dom"
import Routes from "./routes"
import Providers from "./providers"
import { GlobalStyles } from "./styles/global"
import ContextProviderComposer from "./providers/contextProviderComposer"
import { ReactElement } from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <ContextProviderComposer contextProviders={Providers as ReactElement[]}>
          <GlobalStyles />
          <Routes />
        </ContextProviderComposer>
      </BrowserRouter>
      <div id="modal-root" />
    </>
  )
}

export default App
