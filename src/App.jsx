import {  Navbar, Transactor, Footer, Animate } from './components';

const App = () => {
  return (
    <>
      <Animate />
      <div className="min-h-screen">
        <div className="gradient-bg-welcome area" >
          <Navbar/>
          <Transactor/>
      </div >
      </div>
    </>
  );
}

export default App
