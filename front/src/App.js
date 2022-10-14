import { BrowserRouter } from 'react-router-dom';
import SectionMerge from "./components/section/SectionMerge";


function App() {
  return (
    <div className='bg-orange-50 h-screen bg-mybg bg-cover'>
      <BrowserRouter>
          <SectionMerge/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
