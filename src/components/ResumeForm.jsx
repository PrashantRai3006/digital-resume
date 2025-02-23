import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DeleteForever } from "@mui/icons-material";
import dayjs from "dayjs"; // Ensure you have dayjs installed
import { use } from "react";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Ensure correct import path
import LogoutIcon from "@mui/icons-material/Logout";

const ResumeForm = ({ setFormData, formData, dynamicNavigation }) => {
  const [skills, setSkills] = useState(formData.skills || []);
  const [experience, setExperience] = useState(formData.experience || []);
  const [summary, setSummary] = useState(formData.summary || "");
  const [workId, setWorkId] = useState(formData.workId || "");
  const [name, setName] = useState(formData.name || "");
  const [number, setNumber] = useState(formData.number || "");
  const [email, setEmail] = useState(formData.email || "");
  const [role, setRole] = useState(formData.role || "");
  const [newSkill, setNewSkill] = useState("");
  const [workIds, setWorkIds] = useState(formData.workIds || []);
  const [softSkills, setSoftSkills] = useState(formData.softSkills || []);
  const [newSoftSkill, setNewSoftSkill] = useState("");
  
  const [educationDetails, setEducationDetails] = useState(
    formData.educationDetails || ""
  );
  const [certification, setCertification] = useState(
    formData.certification || ""
  );
  const [itSkills, setITSkills] = useState(formData.itSkills || "");
  const [personalDetails, setPersonalDetails] = useState(
    formData.personalDetails || ""
  );
  

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
    // Redirect user to login page after logout
    window.location.href = "/login"; 
  } catch (error) {
    console.error("Error logging out:", error);
  }
};


  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() !== "") {
      setSoftSkills([...softSkills, newSoftSkill]);
      setNewSoftSkill("");
    }
  };
  const handleAddWorkId = () => {
    if (workId.trim() !== "") {
      setWorkIds([...workIds, workId]);
      setWorkId("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };
  const handleRemoveSoftSkill = (index) => {
    const updatedSkills = softSkills.filter((_, i) => i !== index);
    setSoftSkills(updatedSkills);
  };
  const handleRemoveWorkId = (index) => {
    const updatedWorkId = workIds.filter((_, i) => i !== index);
    setWorkIds(updatedWorkId);
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        location: "",
        role: "",
        responsibilities: "",
        fromDate: null,
        toDate: null,
        current: false,
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const handleChangeExperience = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setExperience(updatedExperience);
  };

  const handleDateChange = (value, index, dateType) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [dateType]: value ? value.format("YYYY-MM-DD") : null, // Format the date to a string
    };
    setExperience(updatedExperience);
  };

  const handleCreateResume = () => {
    const resumeData = {
      name,
      email,
      number,
      summary,
      educationDetails,
      certification,
      itSkills,
      personalDetails,
      skills,
      experience,
      workIds,
      role,
      softSkills,
    };
    setFormData(resumeData);
    dynamicNavigation("/digital-resume/1");
  };
  useEffect(() => {
    setFormData({
      name,
      email,
      number,
      summary,
      educationDetails,
      certification,
      itSkills,
      personalDetails,
      skills,
      experience,
      workIds,
      role,
      softSkills,
    });
  }, [
    skills,
    experience,
    summary,
    workId,
    name,
    number,
    email,
    role,
    newSkill,
    workIds,
    softSkills,
    educationDetails,
    certification,
    itSkills,
    personalDetails,
    setFormData,
  ]);

  return (
    <Box
      sx={{
        padding: "40px",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0px",
    position: "relative",
  }}
>
  <Typography
    variant="h4"
    sx={{
      textAlign: "center",
      color: "#3f51b5",
      fontWeight: "bold",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    Create Your Professional Resume
  </Typography>
  <Button
    variant="contained"
    color="error"
    onClick={handleLogout}
    startIcon={<LogoutIcon />}
    sx={{
      borderRadius: "8px",
      padding: "10px 24px",
      fontWeight: "bold",
      backgroundColor: "#d32f2f",
      '&:hover': { backgroundColor: "#b71c1c" },
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      marginLeft: "auto",
    }}
  >
    Log Out
  </Button>
</Box>



      {/* Basic Information */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Grid>
        {Boolean(workIds.length) && (
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {workIds.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "aliceblue",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    margin: "5px",
                  }}
                >
                  <Typography sx={{ marginRight: "10px", fontWeight: "500" }}>
                    {value}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveWorkId(index)}
                    color="error"
                  >
                    <DeleteForever />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        )}
        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Work ID"
            required
            value={workId}
            onChange={(e) => setWorkId(e.target.value)}
            placeholder="Enter LinkedIn, Naukri, Behance, Portfolio, or Slack ID"
            onKeyPress={(e) => e.key === "Enter" && handleAddWorkId()}
            sx={{ background: "white", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddWorkId}
            sx={{
              borderRadius: "16px",
              height: "100%",
            }}
          >
            Add
          </Button>
        </Grid>

        {/* Profile Summary */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#3f51b5", marginBottom: "16px" }}
          >
            Profile Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter a brief summary about yourself"
            sx={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        {/* Education Details */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#3f51b5", marginBottom: "16px" }}
          >
            Education Details
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={educationDetails}
            onChange={(e) => setEducationDetails(e.target.value)}
            placeholder="Enter your education details like degree, college, year of passing, etc. after each detail press enter"
            sx={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        {/* Certification */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#3f51b5", marginBottom: "16px" }}
          >
            Certification
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
            placeholder="Enter your certifications, courses, etc. after each certification press enter"
            sx={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        {/* IT Skills */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#3f51b5", marginBottom: "16px" }}
          >
            IT Skills
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={itSkills}
            onChange={(e) => setITSkills(e.target.value)}
            placeholder="Enter your IT skills like programming languages, tools, etc. after each skill press enter"
            sx={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        {/* Personal Details */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#3f51b5", marginBottom: "16px" }}
          >
            Personal Details
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={personalDetails}
            onChange={(e) => setPersonalDetails(e.target.value)}
            placeholder="Enter your personal details like address, date of birth, etc. after each detail press enter"
            sx={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        {/* Skills Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ color: "#3f51b5" }}>
            Skills
          </Typography>
        </Grid>
        {Boolean(skills.length) && (
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "aliceblue",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    margin: "5px",
                  }}
                >
                  <Typography sx={{ marginRight: "10px", fontWeight: "500" }}>
                    {skill}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSkill(index)}
                    color="error"
                  >
                    <DeleteForever />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        )}

        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Enter Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
            sx={{ background: "white", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            sx={{
              borderRadius: "16px",
              height: "100%",
            }}
          >
            Add
          </Button>
        </Grid>
        {/* Soft Skills Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ color: "#3f51b5" }}>
            Soft Skills
          </Typography>
        </Grid>
        {Boolean(softSkills.length) && (
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {softSkills.map((softSkill, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "aliceblue",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    margin: "5px",
                  }}
                >
                  <Typography sx={{ marginRight: "10px", fontWeight: "500" }}>
                    {softSkill}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSoftSkill(index)}
                    color="error"
                  >
                    <DeleteForever />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        )}

        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Enter Soft Skill"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddSoftSkill()}
            sx={{ background: "white", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSoftSkill}
            sx={{
              borderRadius: "16px",
              height: "100%",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {/* Work Experience */}
      <Typography variant="h5" sx={{ color: "#3f51b5", marginTop: "16px" }}>
        Work Experience
      </Typography>
      {experience.map((exp, index) => (
        <Box
          key={index}
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography
                variant="h6"
                sx={{ color: "#3f51b5", fontWeight: "600" }}
              >
                {index + 1}. Experience
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => handleRemoveExperience(index)}
                color="error"
              >
                <DeleteForever />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company"
                value={exp.company}
                name="company"
                onChange={(e) => handleChangeExperience(e, index)}
                sx={{ background: "white", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                value={exp.location}
                name="location"
                onChange={(e) => handleChangeExperience(e, index)}
                sx={{ background: "white", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Role"
                value={exp.role}
                name="role"
                onChange={(e) => handleChangeExperience(e, index)}
                sx={{ background: "white", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Responsibilities"
                multiline
                rows={3}
                value={exp.responsibilities}
                name="responsibilities"
                onChange={(e) => handleChangeExperience(e, index)}
                sx={{ background: "white", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="From Date"
                value={exp.fromDate ? dayjs(exp.fromDate) : null}
                onChange={(value) => handleDateChange(value, index, "fromDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ background: "white" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              {!exp.current && (
                <DatePicker
                  label="To Date"
                  value={exp.toDate ? dayjs(exp.toDate) : null}
                  onChange={(value) => handleDateChange(value, index, "toDate")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{ background: "white" }}
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>
          <FormControlLabel
            sx={{ marginTop: "16px" }}
            control={
              <Checkbox
                checked={exp.current}
                onChange={() => {
                  const updatedExperience = [...experience];
                  updatedExperience[index].current =
                    !updatedExperience[index].current;
                  setExperience(updatedExperience);
                }}
              />
            }
            label="Current Employer"
          />
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={handleAddExperience}
        sx={{
          borderRadius: "8px",
          borderColor: "#3f51b5",
          color: "#3f51b5",
          "&:hover": {
            background: "#3f51b5",
            color: "white",
          },
          marginBottom: "32px",
          marginTop: "16px",
        }}
      >
        Add Experience
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateResume}
        sx={{
          width: "100%",
          borderRadius: "8px",
          padding: "12px 0",
        }}
      >
        Create Digital Resume
      </Button>
    </Box>
  );
};

export default ResumeForm;
