 import { useTheme } from '@emotion/react'
import { AppBar, Avatar, Button, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
 const paperStyle={
   /* width:"30vw",
    margin:"20px auto",
     padding:"15px", */
     padding:"15px",
     margin:"20px 0px"

      
     
 }
 const textField={
  margin:"8px 0px",
   
 }
 const SignupPage = () => {
  const theme=useTheme()
   return (
    <Grid  sx={{backgroundColor:"#f7f5ff",minHeight:"100vh"}}>
    <AppBar position='sticky'>
      <Toolbar sx={{bgcolor:theme.palette.primary}}> 
        <Typography variant='h5'>Polls-App</Typography>
      </Toolbar>
      
    </AppBar>
       <Grid container  sx={{display:"flex",justifyContent:"center"}}> 
        <Grid item xs={12} md={6} lg={4} >
        <Paper elevation={3} style={paperStyle} align={"center"} >
          
          <Avatar sx={{backgroundColor:theme.palette.success.main}}></Avatar>
          <Typography variant="h5"  >Sign up</Typography>
          <Typography variant="caption"  >Create your Poll-App Account</Typography>
          <form action="">
            <Grid  >
          <TextField fullWidth label="Name" placeholder='Enter your Name' sx={textField} > </TextField>
          <TextField fullWidth label="Email" placeholder='Enter your Email' sx={textField}> </TextField>
          <TextField fullWidth label="Mobile" placeholder='Enter your Mobile' sx={textField}> </TextField>
          <TextField fullWidth label="Password" placeholder='Enter your password' sx={textField}> </TextField>
          <TextField fullWidth label="Conform Password" placeholder='Enter your Pasword' sx={textField}> </TextField>
          <Button fullWidth variant="contained"  sx={{padding:"11px 0px",marginBottom:"9px"}}>Create account</Button>
          <Typography variant="p">Already have account? <a href="">Signin</a></Typography>
          </Grid></form>
          


        </Paper>
        </Grid>
        
       </Grid>
      </Grid>
   )
 }
 
 export default SignupPage