import React from "react";
import { useState ,useEffect} from "react";
import { TailSpin,ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() =>{
      async function getData(){
        setLoading(true);
        const _data=await getDocs(moviesRef);
        // console.log(_data)
        _data.forEach((doc) =>{
          setData((oldData) => [...oldData, {...(doc.data()),id:doc.id}]);
          //it is returning the previous state and seting the new data and old data both.
        })
        setLoading(false);
      }
      getData();
  },[])
  // []=> ye bata raha ki jab app run kare to ek bar run karo , aur agar ye n rahe to har second render karega, isiliye ye diya jata hai.  

  return (
    <div className="flex flex-wrap justify-between  px-3 mt-2">
      { loading ? <div className="w-full flex justify-center items-center h-96"><ThreeDots height={50} color="white"/></div> :
      data.map((e, i) => {
        return (
          <Link to={`/detailpage/${e.id}`}><div className="card font-medium shadow-lg p-2 hover:-translate-y-3 
          cursor-pointer mt-6 transition-all duration-500">
            <img
              className="h-60 w-40 md:h-96 md:w-80"
              src={e.image}
            />
            <h1>
              <span className="text-gray-500">Name : </span> {e.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating : </span>
              <ReactStars
                    size={20}
                    half={true}
                    value={e.rating/e.rated}
                    edit={false} />
            </h1>
            <h1>
              <span className="text-gray-500">Year : </span> {e.year}
            </h1>
          </div></Link>
        );
      })
    }
    </div>
  );
};

export default Cards;
//authentication system and database we are getting in firebase and firebase makes it easier.
//we can also store images in firebase.
//Shift+alt+F ==> for formatting
// npm install react-router-dom react-loader-spinner sweet-alert
