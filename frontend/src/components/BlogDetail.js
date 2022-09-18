import { InputSharp } from "@mui/icons-material";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = {mb:1,mt:2,fontSize:'18px', fontWeight:'bold'};

const BlogDetail = () => {
  const navigate = useNavigate();
 const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({
   
  });
   const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

   };
  const fetchDetail = async () => {
    const res =  axios.get(`http://localhost:5000/ap/blog/${id}`).catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetail().then((data) => {setBlog(data.blog)
          setInputs({title:data.blog.title,description: data.blog.description,});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
const sendRequest = async () => {
  const res  =  axios.put(`http://localhost:5000/api/blog/update/${id}`,{
     title: inputs.title,
     description: InputSharp.description,
  }).catch(err => console.log(err));
    const data = await res.data
    return data
}
  console.log(blog);
  const handleSubmit = (e)=> {
     e.preventDefault()
     console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/myBlogs/"));
  };

  return <div>
     {inputs &&  
     <form onSubmit={handleSubmit}>
  <Box border={3} borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(145,114,223,1) 100%)" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={4} display='flex' flexDirection={'column'} width={"75%"} alignContent={"center"}>
     <Typography fontWeight={'bold'} padding={3} color="grey" variant="h4" textAlign={'center'}>Post Your Blog</Typography>
     <InputLabel  sx={labelStyles}>Title</InputLabel>
     <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined"/>
     <InputLabel sx={labelStyles}>Description</InputLabel>
     <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
      <Button sx={{mt:2,borderRadius:4}} variant="contained" color="primary" type="submit">Submit</Button>
  </Box>
</form>}</div>;
};

export default BlogDetail;
