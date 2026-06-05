import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar1 from './Navbar1';
import HeroSection from './HeroSection';
import Card1 from './Card1';
import Card2 from './Card2';
import Login1 from './Login1';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

const [complaints, setComplaints] = useState([]);

const[department, setDepartment] = useState("");
const[description, setDescription] = useState("");
const[image, setImage] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(false);
 
useEffect(()=>{
  if (isLoggedIn){
  getComplaints();
}
}, [isLoggedIn]);

const addComplaint=async()=>{
  const newComplaint={
    department:department,
    description:description,
    image:image
  }
  await axios.post("https://devika-nmmp.onrender.com/complaints", newComplaint);
getComplaints();
};
const getComplaints=async()=>{
  const response=await axios.get("https://devika-nmmp.onrender.com/complaints")
  setComplaints(response.data)
}
const deleteComplaint=async(id)=>{
  try {
    await axios.delete(`https://devika-nmmp.onrender.com/complaints/${id}`);
    getComplaints();
  } catch (error) {
    console.error("Error deleting complaint:", error);
     
  }
};


  return(
    isLoggedIn ? 
    <div  style={{ width: "100%" }}>
      <Navbar1 setIsLoggedIn={setIsLoggedIn}></Navbar1>
      <div className='mt-3'>
      <HeroSection
      setDepartment={setDepartment}
      setDescription={setDescription}
      setImage={setImage}
      addComplaint={addComplaint}
      ></HeroSection>
      </div>
      <div className='flex-wrap p-4 mt-3 d-flex gap-4'>
      {
        complaints.map((item)=>(
      <Card1 department={item.department} description={item.description} image={item.image} 
      deleteComplaint={() => deleteComplaint(item._id)}></Card1>
        ))}
      
      </div>
      
      
      <Footer></Footer>
    </div>
    :
    <Login1 setIsLoggedIn={setIsLoggedIn}></Login1>
  )
}

export default App;