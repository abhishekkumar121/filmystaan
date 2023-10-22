import Header from "./components/Header";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import { Routes,Route } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { createContext,useState,useEffect } from "react";
import Signup from "./components/Signup";

const Appstate =createContext();

function App() {
   const [login,setLogin]=useState(false);
   const [userName,setUserName] =useState("");

   

  return (
    <Appstate.Provider value={{login,userName,setLogin,setUserName}} >

    <div className="App relative ">
      <Header />
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/addmovie" element={<AddMovie/>} />
        <Route path="/detailpage/:id" element={<Detail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
//cookies mein save nii kiya hai app ko , isiliye baar baar login karna pad rah hai.. refresh ke bad