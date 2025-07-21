import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import { SaltProvider } from "@salt-ds/core";
// import "@salt-ds/core/styles"; // throws error 


const rootElement = document.getElementById('photo-deck')
const root = createRoot(rootElement)
root.render(
    <App />
);