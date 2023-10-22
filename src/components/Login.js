import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getDocs,query,where } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs"
import swal from "sweetalert";
import {Appstate} from "../App";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";

const Login = () => {
  const useAppstate=useContext(Appstate);
  const navigate=useNavigate();
    const [form, setForm] =useState({
        mobile:"",
        password:""

    });
    const [loading,setLoading] = useState(false);

    const login = async () =>{
      setLoading(true);
      try{

        const quer=query(usersRef,where("mobile","==",form.mobile));
        const querySnapshot= await getDocs(quer);
        querySnapshot.forEach((doc) =>{
          const _data=doc.data();
          const _pass=bcrypt.compareSync(form.password,_data.password);
          if(_pass){
            useAppstate.setLogin(true);
            useAppstate.setUserName(_data.name);
            swal({
              title:"logged in",
              icon: "success",
              button: false,
              timer: 3000,
            })
            navigate("/");
            
          }else{
            swal({
              title:"Invalid password",
              icon: "error",
              button: false,
              timer: 3000,
            })
          }

        })

        


      }catch(error){
        swal({
          title:error.message,
          icon: "error",
          button: false,
          timer: 3000,
        })
    }
    setLoading(false);
  }
  return (
    <div className=" mt-4 w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Login</h1>

      <div className="p-2 md:w-1/3 w-full">
        <div className="relative">
          <label className="leading-7 text-sm text-gray-200">Mobile no.</label>
          <input
            type={"number"}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-white  rounded border border-gray-300
                    focus:border-indigo-500 focus:bg-white focus:ring-2
                     focus:ring-indigo-200 text-base outline-none
                      text-gray-700 py-1 px-3 leading-8 
                      transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="p-2 md:w-1/3 w-full">
        <div className="relative">
          <label className="leading-7 text-sm text-gray-200">Password</label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white  rounded border border-gray-300
                    focus:border-indigo-500 focus:bg-white focus:ring-2
                     focus:ring-indigo-200 text-base outline-none
                      text-gray-700 py-1 px-3 leading-8 
                      transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="p-2 w-full">
            <button onClick={login}  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> : "Login"}
            </button>
        </div>
        <div>
            <p className="text-center text-gray-200">Don't have an account? <Link to="/signup"><span className="text-blue-500">Sign up</span></Link></p>
        </div>
    </div>
  );
};

export default Login;
