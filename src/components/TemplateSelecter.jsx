import { useNavigate } from "react-router-dom";
import templates from "../data/templates";
import { Button } from "@mui/material";
import { useState } from "react";
const TemplateSelector = () => {
    const navigate = useNavigate();
    const[selectedTemplate,setSelectedTemplate] = useState([true,...Array(templates.length-1).fill(false)]);
    const handleTemplateSelection = (id,index) => {
      const newSelectedTemplate = Array(templates.length).fill(false);
      newSelectedTemplate[index] = true;
      setSelectedTemplate(newSelectedTemplate);
      navigate(`/digital-resume/${id}`)
    };
  
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, margin: 20 }}>
        {templates.map((template,index) => (
            <Button sx={selectedTemplate[index] && {border:'2px solid blue'}}><img
            key={template.id}
            height={50}
            width={50}
            src={template.thumbnail}
            alt={template.name}
            className="template-thumbnail"
            onClick={() => handleTemplateSelection(template.id,index)}
          /></Button>
          
        ))}
      </div>
    );
  };
  export default TemplateSelector;