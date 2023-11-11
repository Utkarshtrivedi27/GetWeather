import React from 'react';
import { createRoot } from 'react-dom/client';
import Weather from './Weather';

const App = () => {
    return (
        <div>
            <Weather/>
        </div>
        
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
