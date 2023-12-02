import { createRoot } from 'react-dom/client';

const rootElement = document.body.appendChild(document.createElement('main'));

createRoot(rootElement).render(<h1>Hello, world</h1>);
