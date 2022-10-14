import { BrowserRouter } from 'react-router-dom';
import SectionMerge from "./components/section/SectionMerge";


function App() {
  return (
    <div>
      <BrowserRouter>
          <SectionMerge/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
