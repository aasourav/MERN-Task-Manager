import { useState } from 'react';
import SectionMerge from "./components/section/SectionMerge";


function App() {
  const[logged,setLogged] = useState(true)
  return (
    <div>
      <SectionMerge/>
    </div>
  );
}

export default App;
