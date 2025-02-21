import DigitalProfile from "../components/DigitalProfile";
import DigitalProfile2 from "../components/DigitalProfile2";
import DigitalProfile3 from "../components/DigitalProfile3";

// Correct way to import images
import template1 from "./Images/template1.png";
import template2 from "./Images/template2.png";
import template3 from "./Images/template3.png";

const templates = [
    { id: 1, name: "DigitalProfile", component: DigitalProfile, thumbnail: template1 },
    { id: 2, name: "DigitalProfile2", component: DigitalProfile2, thumbnail: template2 },
    { id: 3, name: "DigitalProfile3", component: DigitalProfile3, thumbnail: template3 },
];

export default templates;
