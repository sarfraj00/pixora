import { Camera } from "lucide-react";
import logoImage from '../../assets/images/pixora_logo.png'

const BrandLogo = ({ dark = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <img src={logoImage} alt="" className="size-15"/>
    </div>
  );
};

export default BrandLogo;