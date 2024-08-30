import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Maptalks from './components/maptalks/Maptalks'
import Footer from './components/footer/Footer'


function App() {
  return (
    <div className="App">
      {/* header */}
      <div className="App-header">
        <h1>Header Section</h1>
      </div>


      {/* Page-Container */}
      <div className='pageContainer'>
        {/* Side Bar */}
        <div className='sideBar'>
          <Sidebar/>
          <hr/>
        </div>

        

        {/* All Contents */}
        <div className='contentsContainer'>
          <Maptalks/>
        </div>

      </div>


      {/* Footer-Container */}
      <div className='footerContainer'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
