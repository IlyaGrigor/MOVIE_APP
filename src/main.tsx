import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from './app/App.tsx'
import {store} from "./app/store";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StrictMode>,
    </Provider>
)
