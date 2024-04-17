"use client"

import axios from "axios"
import { useState, useEffect } from "react"

const page = () => {
  const [data, setDtata] = useState({name: ""})

  useEffect(() => {
    axios.get("/api/hello")
      .then((res)=> res.data)
      .then((data) =>{
        setDtata(data)
      })
  }, [])
  

  return (
    <div>hello!!{data.name}</div>
  );
}

export default page;