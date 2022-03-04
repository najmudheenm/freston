import "./App.css";
import  "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import {useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import {useDispatch,useSelector} from 'react-redux'

import {useCookies}from 'react-cookie'

//import action
import {fetchJobData} from './redux/jobs/jobsAction'

//components
import Header from "./components/Header/Header.component";

// pages
import Careers from "./pages/Carrier/Career.page";
import Home from "./pages/Home/home.page";
import SignIn from './pages/Sign-in/SignIn.page';
import JobCreating from "./pages/Job-Create/JobCreating.pages";
import JobDetails from "./pages/JobDetails/JobDetails.page";
import Admin from "./pages/Admin/Admin.page"

function App() {
  const [cookies,setCookie]=useCookies(['Token'])
  const dispatch =useDispatch()

  const admin =useSelector(state=>state.admin)
  // useEffect(() => {
  //   dispatch(fetchJobData)
  // }, [dispatch])
  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch]);
  useEffect(() => {
    if(admin.token){
      setCookie('Token', admin.token, { path: '/' })
    }

  }, [admin,setCookie]);
  
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/:id" element={<JobDetails/>}/>
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/createjob" element={<JobCreating/>} />
      </Routes>
    </div>
  );
}

export default App;
