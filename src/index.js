
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';




// ReactDOM.render(<App />,  document.getElementById('root'));

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <App tab="home" />
    </BrowserRouter>
);
