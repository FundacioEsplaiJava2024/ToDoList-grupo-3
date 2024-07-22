import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import SignMain from './components/authComponents/SignMain';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element ={<SignMain/>}/>
        <Route path="/tasks" element ={<App/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;