import React, { useRef, useState,useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
} from "@mui/material";
import html2pdf from "html2pdf.js";
const DigitalProfile2 = ({ formData, dynamicNavigation, handleSubmit }) => {
  const {
    name,
    email,
    number,
    summary,
    skills,
    experience,
    workIds,
    role,
    softSkills,
    educationDetails,
    certification,
    itSkills,
    personalDetails,
  } = formData;
  const resumeRef = useRef();
  const [image, setImage] = useState("/static/images/avatar/1.jpg");
  useEffect(() => {
    adjustHeight(); // Adjust height when component mounts or updates
  }, []);
  const adjustHeight = () => {
    const element = resumeRef.current;
    if (!element) return;
  
    // Get the actual content height
    let contentHeight = element.scrollHeight;
  
    // Calculate the nearest multiple of 1123px
    let pageCount = Math.ceil(contentHeight / 1123); // Number of pages required
    let adjustedHeight = pageCount * 1123; // Total height should be multiple of 1123
  
    // Apply the new height to the element
    element.style.minHeight = `${adjustedHeight}px`;
  };
  
  
  
  const handleDownload = async () => {
    const pdf = new jsPDF("p", "px", [794, 1123]); // A4 in px at 96 DPI
    const element = resumeRef.current;

    pdf.html(element, {
      callback: function (doc) {
        doc.save("Resume.pdf");
      },
      x: -30, // Left padding
      y: -30, // Top padding
      html2canvas: {
        dpi: 96, // Match the DPI
        scale: 1, // Adjust the scale for better quality without excessive zoom
        backgroundColor: null, // Ensure full-page background applies
      },
      margin: [20, 0, 20, 0], // Margins for top, left, bottom, right
      autoPaging: true, // Ensures multi-page support
    });
    dynamicNavigation("/thank-you");
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click(); // ✅ Triggers file input click
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // ✅ Updates Avatar with new image
    }
  };
  return (
    <>
      <Box
        ref={resumeRef}
        sx={{
          //padding: "20px 40px",
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          height:'1123px'
        }}
      >
        <Grid container sx={{ height: '100%' }}>
        <Grid item xs={4} sx={{padding:'40px 20px 20px 40px', backgroundColor:'darkgrey', height:'100%'}}>
            {/* Avatar */}
            <Box pb={5}>
              <Avatar
                alt="User Avatar"
                src={image} // ✅ Uses state to update image
                sx={{ width: 108, height: 108, cursor: "pointer" }} // ✅ Ensures it's clickable
                onClick={handleAvatarClick}
              />
              <input
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Box>
            
            <Typography variant="h6" fontWeight="bold" color="textPrimary">
              CONTACT
            </Typography>
            <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
            <Typography variant="body2" color="textPrimary">
              {email || "Your Email"}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {number || "Your Phone"}
            </Typography>
            {/* Education Section */}
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                pt="10px"
              >
                EDUCATION
              </Typography>
              <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
              {educationDetails ? (
                educationDetails.split("\n").map((value, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-wrap",
                      breakInside: "avoid", // Prevents breaking within this line
                      pageBreakInside: "avoid",
                    }}
                  >
                    {value
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  Mention your educational qualifications in a crisp manner.
                </Typography>
              )}
            </Box>
            {/* Skills Section */}
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                pt="10px"
              >
                IT SKILLS
              </Typography>
              <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
              <Grid container>
                {skills && skills.length > 0 ? (
                  <Grid item xs={12}>
                    <List sx={{ padding: 0 }}>
                      {" "}
                      {/* Removed padding */}
                      {skills.map((skill, index) => (
                        <ListItem key={index} sx={{ padding: "0" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              breakInside: "avoid", // Prevents breaking within this line
                              pageBreakInside: "avoid",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {skill
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        breakInside: "avoid", // Prevents breaking within this line
                        pageBreakInside: "avoid",
                      }}
                    >
                      Add your skills to showcase your expertise
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            {/* Soft Skills */}
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                sx={{ marginTop: "20px" }} // Replaced pt with marginTop for better spacing
              >
                OTHER SKILLS
              </Typography>
              <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
              <Grid container>
                {softSkills && softSkills.length > 0 ? (
                  <Grid item xs={12}>
                    <List sx={{ padding: 0 }}>
                      {" "}
                      {/* Removed padding */}
                      {softSkills.map((softSkill, index) => (
                        <ListItem key={index} sx={{ padding: 0 }}>
                          {" "}
                          {/* Removed padding */}
                          <Typography
                            variant="body2"
                            sx={{
                              breakInside: "avoid", // Prevents breaking within this line
                              pageBreakInside: "avoid",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {softSkill}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: "#424242" }}>
                      Add your soft skills to showcase your expertise
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
            {/* {certification} */}
            {certification &&
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                sx={{ marginTop: "20px" }} // Replaced pt with marginTop for better spacing
              >
                CERTIFICATES
              </Typography>
              <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
              <Grid container>
                {certification &&  (
                  <Grid item xs={12}>
                    <List sx={{ padding: 0 }}>
                      {certification.split('\n').map((certificate, index) => (
                        <ListItem key={index} sx={{ padding: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              breakInside: "avoid", // Prevents breaking within this line
                              pageBreakInside: "avoid",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {certificate
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ) }
              </Grid>
            </Box>
}

            <Typography
              variant="h6"
              fontWeight="bold"
              color="textPrimary"
              pt="10px"
            >
              WORK ID'S
            </Typography>
            <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
            <Grid container>
              {workIds && workIds.length > 0 ? (
                <Grid item xs={12}>
                  <List sx={{ padding: 0 }}>
                    {" "}
                    {/* Removed padding */}
                    {workIds.map((workId, index) => (
                      <ListItem key={index} sx={{ padding: 0 }}>
                        {" "}
                        {/* Removed padding */}
                        <Typography
                          variant="body2"
                          sx={{
                            breakInside: "avoid", // Prevents breaking within this line
                            pageBreakInside: "avoid",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {workId}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    Add your work Id's to showcase your expertise
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={8} sx={{padding:'40px 40px 20px 20px'}}>
            {/* Header */}
            <Box pb={5}>
              <Typography variant="h3" fontWeight="bold" pb={"20px"}>
                {name || "Your Name"}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {role || "Your Role"}
              </Typography>
            </Box>
             {/* Profile Summary */}
                    <Box sx={{ marginBottom: "10px" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="textPrimary"
                        
                      >
                        PROFILE SUMMARY
                      </Typography>
                      <Divider sx={{height:'0.5px', backgroundColor:"black", marginBottom:'2px'}}/>
                      {summary ? (
                        summary.split("\n").map((value, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              color: 'textPrimary',
                              breakInside: "avoid", // Prevents breaking within this line
                              pageBreakInside: "avoid",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {value
                                .split(/(#.*?#)/)
                                .map((part, i) =>
                                  part.startsWith("#") && part.endsWith("#") ? (
                                    <strong key={i}>{part.replace(/#/g, "")}</strong>
                                  ) : (
                                    part
                                  )
                                )}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ color: "#424242" }}>
                          Write a compelling profile summary about yourself. Highlight your
                          skills, achievements, and professional background in a crisp
                          manner.
                        </Typography>
                      )}
                    </Box>
            {/* Experience Section */}

            <Typography
              variant="h6"
              fontWeight="bold"
              color="textPrimary"
              
            >
              WORK EXPERIENCE
            </Typography>
            <Divider sx={{height:'0.5px', backgroundColor:"white", marginBottom:'2px'}}/>
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <Box key={index} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",

                      breakInside: "avoid", // Prevents breaking within this line
                      pageBreakInside: "avoid",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {index + 1}. {exp.company || "Your Company"} (
                    {exp.location || "Location"})
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontStyle: "italic",
                      color: "#757575",
                      marginBottom: "10px",
                      breakInside: "avoid", // Prevents breaking within this line
                      pageBreakInside: "avoid",
                    }}
                  >
                    {exp.role || "Your Role"} | {exp.fromDate || "Start Date"} -{" "}
                    {exp.current ? "Present" : exp.toDate || "End Date"}
                  </Typography>

                  {/* Display responsibilities with individual line protection */}
                  {exp.responsibilities ? (
                    <Box>
                      {exp.responsibilities
                        .split("\n")
                        .map((responsibility, i) => {
                          
                          return (
                            <Typography
                              key={i}
                              color="textPrimary"
                              variant= "body2"
                              sx={{
                                display: "block",
                                breakInside: "avoid", // Prevents breaking within this line
                                pageBreakInside: "avoid",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {responsibility
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                            </Typography>
                          );
                        })}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#424242" }}>
                      Mention your responsibilities, achievements, and
                      contributions in this role.
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Add your work experience to showcase your professional journey.
              </Typography>
            )}

            
          </Grid>
          
        </Grid>
      </Box>
      {/* Buttons */}
      <Box
        sx={{
          padding: "40px",
          maxWidth: "800px",
          margin: "auto",

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => dynamicNavigation('/form')}
          sx={{
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default DigitalProfile2;
