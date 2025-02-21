import React, { useRef, useState } from "react";
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
  const handleDownload = async () => {
    const pdf = new jsPDF("p", "pt", "a4"); // 'pt' for point units, 'a4' for standard page size
    const element = resumeRef.current;

    pdf.html(element, {
      callback: function (doc) {
        doc.save("Resume.pdf");
      },
      x: 0, // Left padding
      y: 0, // Top padding
      html2canvas: {
        scale: 0.675, // Adjust the scale for better quality without excessive zoom
      },
      margin: [20, 0, 20, 0], // Margins for top, left, bottom, right
      autoPaging: true, // Ensures multi-page support
    });
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
          padding: "20px 40px",
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={8}>
          <Grid item xs={8}>
            {/* Header */}
            <Box pb={5}>
              <Typography variant="h3" fontWeight="bold" pb={"20px"}>
                {name || "Your Name"}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {role || "Your Role"}
              </Typography>
            </Box>
            {/* Experience Section */}

            <Typography
              variant="h6"
              fontWeight="bold"
              color="textPrimary"
              pb={"20px"}
            >
              EXPERIENCE
            </Typography>
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
                              variant= "body1"
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
                    <Typography variant="body1" sx={{ color: "#424242" }}>
                      Mention your responsibilities, achievements, and
                      contributions in this role.
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: "#424242" }}>
                Add your work experience to showcase your professional journey.
              </Typography>
            )}

            {/* Education Section */}
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                pt="20px"
              >
                Education Details
              </Typography>
              {educationDetails ? (
                educationDetails.split("\n").map((value, index) => (
                  <Typography
                    key={index}
                    variant="body1"
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
                <Typography variant="body1">
                  Mention your educational qualifications in a crisp manner.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
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
            <Typography
              variant="h6"
              fontWeight="bold"
              color="textPrimary"
              pb={"20px"}
            >
              SUMMARY
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="textPrimary">
              Contact Me
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {email || "Your Email"}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {number || "Your Phone"}
            </Typography>
            {/* Skills Section */}
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                pt="20px"
              >
                Industry Knowledge
              </Typography>
              <Grid container>
                {skills && skills.length > 0 ? (
                  <Grid item xs={12}>
                    <List sx={{ padding: 0 }}>
                      {" "}
                      {/* Removed padding */}
                      {skills.map((skill, index) => (
                        <ListItem key={index} sx={{ padding: "0" }}>
                          <Typography
                            variant="body1"
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
                      variant="body1"
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
                Other Skills
              </Typography>
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
                            variant="body1"
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
                    <Typography variant="body1" sx={{ color: "#424242" }}>
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
                Certificates
              </Typography>
              <Grid container>
                {certification &&  (
                  <Grid item xs={12}>
                    <List sx={{ padding: 0 }}>
                      {certification.split('\n').map((certificate, index) => (
                        <ListItem key={index} sx={{ padding: 0 }}>
                          <Typography
                            variant="body1"
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
              pt="20px"
            >
              Work Id's
            </Typography>
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
                          variant="body1"
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
                  <Typography variant="body1" sx={{ color: "#424242" }}>
                    Add your work Id's to showcase your expertise
                  </Typography>
                </Grid>
              )}
            </Grid>
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
