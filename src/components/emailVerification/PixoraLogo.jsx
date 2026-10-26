import { Link } from "react-router-dom";
import logoImage from '../../assets/images/pixora_logo.png'

const PixoraLogo = () => {
  return (
      <div className="flex items-center gap-3">
           <img src={logoImage} alt="" className="size-15"/>
        </div>
  );
};

export default PixoraLogo;