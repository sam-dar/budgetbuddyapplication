// components/Banner.tsx
import Image from "next/image";
import bannerImage from "../public/banner.png"; // Adjust the path as necessary

export default function Banner() {
  return (
    <div className="relative w-full h-[25vh] md:h-[25vh] lg:h-[25vh]">
       <Image
        src={bannerImage}
        alt="Banner Image"
        width={1800}
        height={550} // Fixed height of 450px
        style={{
          maxWidth: "100%",
          height: "550px", // Fixed height for image
          // objectFit: "cover",
          objectPosition: "center",
        }}
        priority // Optional: For better performance on important images
      />
    </div>
  );
}
