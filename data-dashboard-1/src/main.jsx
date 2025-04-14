import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFound from './Components/NotFound.jsx'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import StationDetails from './Components/StationDetails.jsx';
import Layout from './routes/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="/station/:stationId" element={<StationDetails />} />
        </Route>
        <Route
          path="*"
          element={ <NotFound /> }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);