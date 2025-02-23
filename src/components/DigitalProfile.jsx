import React, { useRef, useState } from "react";
import { Box, Typography, Grid, Divider, Button, Avatar } from "@mui/material";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Phone, Email, Work } from "@mui/icons-material";
const DigitalProfile3 = ({ formData, dynamicNavigation, handleSubmit }) => {
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
  //   const handleDownload = () => {
  //     const element = resumeRef.current;

  //     // Define options for the PDF
  //     const doc = new jsPDF();

  //   // Get the resume container element
  //   //const element = resumeRef.current;

  //   // Use the html() method of jsPDF to directly render the HTML
  //   doc.html(element, {
  //     callback: function (doc) {
  //       // Save the PDF after the content is added
  //       doc.save("Resume.pdf");
  //     },
  //     margin: [10, 10, 10, 10], // Adjust margin if necessary
  //     x: 10, // Horizontal margin
  //     y: 10, // Vertical margin
  //     width: 180, // Max width of the content on the page
  //   });
  //     // Navigate to the thank you page after the download starts
  //     dynamicNavigation("/thank-you");
  //   };
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
    dynamicNavigation("/thank-you");
  };

  return (
    <>
      <Box
        ref={resumeRef}
        id="resume-container"
        sx={{
          padding: "10px 40px",
          maxWidth: "800px",
          margin: "auto",
          //backgroundColor: "#fdfdfd",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header Section */}
        <Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              {name || "Your Name"}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {role || "Your Role"}
            </Typography>
            <Typography variant="body1">
              {number || "Your Phone"}
              {" | "}

              {email || "Your Email"}
              {" | "}

              {workIds?.join(", ") || "Your WorkID's"}
            </Typography>
          </Box>
        </Box>

        <Divider aria-label="Section Divider" />

        {/* Profile Summary */}
        <Box>
          <Typography variant="h6" fontWeight="bold" color="textPrimary">
            Professional Summary
          </Typography>
          {summary ? (
            summary.split("\n").map((value, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
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
            <Typography variant="body1">
              Write a compelling profile summary about yourself. Highlight your
              skills, achievements, and professional background in a crisp
              manner.
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Experience Section */}

        <Typography
          variant="h6"
          fontWeight="bold"
          color="textPrimary"
          sx={{
            breakInside: "avoid", // Prevents breaking within this line
            pageBreakInside: "avoid",
          }}
        >
          Work Experience
        </Typography>
        {experience && experience.length > 0 ? (
          experience.map((exp, index) => (
            <Box key={index}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                sx={{
                  breakInside: "avoid", // Prevents breaking within this line
                  pageBreakInside: "avoid",
                  whiteSpace: "pre-wrap",
                }}
              >
                {index + 1}. {exp.company || "Your Company"} (
                {exp.location || "Location"})
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  breakInside: "avoid", // Prevents breaking within this line
                  pageBreakInside: "avoid",
                }}
              >
                {exp.role || "Your Role"} | {exp.fromDate || "Start Date"} -{" "}
                {exp.current ? "Present" : exp.toDate || "End Date"}
              </Typography>

              {/* Display responsibilities with individual line protection */}
              {exp.responsibilities ? (
                exp.responsibilities.split("\n").map((line, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      breakInside: "avoid",
                      pageBreakInside: "avoid",
                    }}
                  >
                    {line
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
                  Mention your responsibilities, achievements, and contributions
                  in this role.
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography variant="body1">
            Add your work experience to showcase your professional journey.
          </Typography>
        )}

        <Divider />

        {/* IT Skills */}

        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="textPrimary"
            sx={{
              breakInside: "avoid", // Prevents breaking within this line
              pageBreakInside: "avoid",
            }}
          >
            IT Skills
          </Typography>
          {itSkills ? (
            itSkills.split("\n").map((line, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >
                {line
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
              Mention your IT skills like programming languages, technologies,
              tools, etc.
            </Typography>
          )}
        </Box>

        <Divider />
        {/* certification Section */}
        {certification && (
          <>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                sx={{
                  breakInside: "avoid", // Prevents breaking within this line
                  pageBreakInside: "avoid",
                }}
              >
                Certifications
              </Typography>
              {certification.split("\n").map((line, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    breakInside: "avoid",
                    pageBreakInside: "avoid",
                  }}
                >
                  {line
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                </Typography>
              ))}
            </Box>
          </>
        )}

        <Divider />
        {/* Education Section */}
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="textPrimary"
            sx={{
              breakInside: "!avoid", // Prevents breaking within this line
              pageBreakInside: "!avoid",
            }}
          >
            Education Details
          </Typography>
          {educationDetails ? (
            educationDetails.split("\n").map((line, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >
                {line
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

        {/* Personal Details */}
        {personalDetails && (
          <>
            <Divider />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="textPrimary"
                sx={{
                  breakInside: "avoid", // Prevents breaking within this line
                  pageBreakInside: "avoid",
                }}
              >
                Personal Details
              </Typography>
              {personalDetails.split("\n").map((line, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    breakInside: "avoid",
                    pageBreakInside: "avoid",
                  }}
                >
                  {line
                    .split(/(#.*?#)/)
                    .map((part, i) =>
                      part.startsWith("#") && part.endsWith("#") ? (
                        <strong key={i}>{part.replace(/#/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
                </Typography>
              ))}
            </Box>
          </>
        )}
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
          variant="outlined"
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

export default DigitalProfile3;
