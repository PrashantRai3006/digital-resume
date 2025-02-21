import { useLocation } from "react-router-dom";
import TemplateSelector from "./TemplateSelecter";
 const ConditionalLayout = ({ children}) => {
    const location = useLocation();
    console.log(location.pathname);
  return !location.pathname.startsWith('/digital-resume') ? children : <><TemplateSelector/>{children}</>;
};
export default ConditionalLayout;