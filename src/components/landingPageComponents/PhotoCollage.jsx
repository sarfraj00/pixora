import photographer from "../../assets/images/photographer.png";
import beach from "../../assets/images/beach.png";
import lake from "../../assets/images/lake.png";
import city from "../../assets/images/city.png";
import waterfall from "../../assets/images/waterfall.png";
import {motion} from 'motion/react'
const photos = [
  {
    src: photographer,
    className:
      "left-[28%] top-2 lg:h-72 lg:w-48 w-40 h-52 rotate-[7deg] animate-photo-1 z-20",
  },
  {
    src: beach,
    className:
      "right-[3%] top-36 lg:h-72 lg:w-48 w-40 h-52 rotate-[13deg] animate-photo-2 z-10",
  },
  {
    src: lake,
    className:
      "left-[6%] top-60 lg:h-[390px] lg:w-72 w-40 h-52 -rotate-[8deg] animate-photo-3 z-30",
  },
  {
    src: city,
    className:
      "right-[13%] top-[410px] lg:h-64 lg:w-44 w-40 h-52 rotate-[12deg] animate-photo-4 z-10",
  },
  {
    src: waterfall,
    className:
      "left-[30%] top-[540px] lg:h-72 lg:w-52 w-40 h-52 -rotate-[5deg] animate-photo-5 z-0",
  },
];

const PhotoCollage = () => {

  return (
    <div
      className="
        relative h-178 w-[75%]
        lg:w-full lg:block 
      "
    >
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className={`
            group absolute
            overflow-hidden
            rounded-2xl
            border-2 border-white/60
            bg-white/10
            p-1
            shadow-2xl
            shadow-black/40
            transition-all duration-500
            hover:z-50
            hover:scale-105
            hover:rotate-0
            ${photo.className}
          `}
          
        >
          <img
            src={photo.src}
            alt={`Pixora photo ${index + 1}`}
            className="
              lg:h-full lg:w-full
              h-50 w-40
              rounded-[13px]
              object-cover
              transition duration-700
              group-hover:scale-110
            "
            
          />

          <div
            className="
              pointer-events-none absolute inset-0
              bg-linear-to-t
              from-black/30
              via-transparent
              to-white/10
              opacity-6
            "
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoCollage;