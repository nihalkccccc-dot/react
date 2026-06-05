import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar5 from './Navbar5.jsx'
import Hero5 from './Hero5.jsx'
import Card5 from './Card5.jsx'
import Footer5 from './Footer5.jsx'
import Login5 from './Login5.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function App() {

  const [complaints, setComplaints]=useState([]);

  const[department,setDepartment]=useState("");
  const[description,setDescription]=useState("");
  const[image,setImage]=useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
useEffect(()=>{
  if (isLoggedIn){
  getComplaints();
}
}, [isLoggedIn]);
  

const addcomplaint=async()=>{
  const newComplaint={
    department:department,
    description:description,
    image:image
  }
  await axios.post("https://react-gzcp.onrender.com/complaints", newComplaint)

  getComplaints();
}
const getComplaints=async()=>{
  const response=await axios.get("https://react-gzcp.onrender.com/complaints")
setComplaints(response.data)
}

const deleteComplaint=(index)=>{
  try {
  const updatedComplaints=complaints.filter((item,i)=> i !==index);
  setComplaints(updatedComplaints);
}catch(error){
  console.error("Failed to delete complaint:", error);
}
};



  return (
    isLoggedIn ? 
   <div style={{width: "100%" }}>
    
    <Navbar5
     setIsLoggedIn={setIsLoggedIn}>

    </Navbar5>
    <Hero5  
    setDepartment={setDepartment}
    setDescription={setDescription}
    setImage={setImage}
    addcomplaint={addcomplaint}
    ></Hero5> 
    <div className='d-flex flex-wrap justify-content-center gap-3'>
{
    complaints.map((items,index)=>(
        <Card5
      department={items.department}
      description={items.description}
      image={items.image}
      deleteComplaint={deleteComplaint}
      index={index}
       />
        
     ))
     }
</div>
    <Footer5>
    
    </Footer5>
    
      
   </div>
:  
   <Login5
    setIsLoggedIn={setIsLoggedIn}
  />
    )            
}

export default App
