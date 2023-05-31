import { Person } from "@mui/icons-material";
import { TextField, Paper, Avatar, Typography, Button, Alert } from "@mui/material";
import Container from '@mui/material/Container';
import React, { useState } from "react";

import { adduserapi } from "../constant";
const initialize = () => {
    return {
        name: "",
        email: "",
    };
};
const regex = {
    name: /^[^\s].{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const AddUser = () => {
    const [addUserForm, setAddUserForm] = useState(initialize());
    const [error, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("");

    const errors = {
        name: "Name should have atleast length 3",
        email: "Email is not valid",
    };

    const validate = (value, name) => {
        if (!value) {
            if(name==="name"){
                return "Name field is empty";
            }
            return "Email field is empty";
        } else if (!regex[name].test(value)) {
            return errors[name];
        }
        return ""
    };

    const postData = async (data) => {
        try {
            const res = await fetch(adduserapi, {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                method: "POST"
            });
            if (res.ok) {
                // Handle successful signup
            } else {
                // Handle signup error
            }
        } catch (err) {
            //handle error
        }
    };

    const handleChange = (e) => {
        setAddUserForm({ ...addUserForm, [e.target.name]: e.target.value });
        validations(e.target.value, e.target.name);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        var temp = {};
        for (let x in addUserForm) {
            temp[x] = validate(addUserForm[x], x)
        }

        setErrors({ ...error, ...temp })

        if (Object.keys(error).length !== 2) {
            if (Object.keys(error).length === 0) {
                setSubmitStatus("Please fill the form ");
                return;
            }
            setSubmitStatus("Please fill the form Properly");
            return;
        } else {
            for (let i in error) {
                if (error[i].length !== 0) {
                    setSubmitStatus("Please fill the form properly");
                    return;
                }
            }
        }
        setSubmitStatus("");
        postData(addUserForm);
    };

    const validations = (value, name) => {
        const errorMessage = validate(value, name);

        setErrors({ ...error, [name]: errorMessage });
    };

    return (
        <Container align={"center"}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    p: 4,
                    maxWidth: 300
                }}
                size="small">
                {submitStatus && (
                    <Alert severity="error" sx={{mb:1}}>
                        <strong>{submitStatus} </strong>
                    </Alert>
                )}<form onSubmit={handleSubmit} method="POST"
                >
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            mr: "auto",
                            ml: "auto"
                        }}>
                        <Person />
                    </Avatar>
                    <Typography sx={{ mt: 1, textAlign: "center" }}>
                        Add User
                    </Typography>

                    <TextField
                        sx={{ mt: 1, mb: 1 }}
                        label="Name"
                        placeholder="Enter your Name"
                        onChange={handleChange}
                        name="name"
                        fullWidth
                        value={addUserForm.name}
                        error={!!error.name}
                        helperText={error.name}
                        size="small"
                    />
                    <TextField
                        sx={{ mt: 1,mb:1 }}
                        label="Email"
                        fullWidth
                        placeholder="Enter your Email"
                        onChange={handleChange}
                        name="email"
                        value={addUserForm.email}
                        error={!!error.email}
                        helperText={error.email}
                        size="small"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            height: 40,
                            mt: 1
                        }}
                        size="small"
                    >
                        Add</Button>
                </form>

            </Paper>
        </Container>
    )
}

export default AddUser;