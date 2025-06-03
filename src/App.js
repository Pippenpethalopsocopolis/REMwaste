// Imports from another source
import { useEffect } from 'react';
import ChooseSkipSize from './skip_page/ChooseSkipSize.jsx';

// My own imports
import './App.css';

function App() {
    useEffect(() => {
        document.title = "REM Waste - Skip Hire Made Easy";
    }, []);

    return (
        <ChooseSkipSize />
    );
}

export default App;
