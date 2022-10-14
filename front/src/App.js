import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SectionMerge from "./components/section/SectionMerge";


function App() {
  const[logged,setLogged] = useState(true)
  return (
    <div>
      <BrowserRouter>
          <SectionMerge/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
