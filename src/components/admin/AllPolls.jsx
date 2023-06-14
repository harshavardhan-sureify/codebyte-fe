import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AllPolls = () => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent="space-between" p={4}>
      <Grid item >All polls</Grid>
      <Grid item><Button variant='contained' color='secondary' onClick={() => navigate("/admin/create")}>Create Poll</Button></Grid>
    </Grid> 
  )
}

export default AllPolls 