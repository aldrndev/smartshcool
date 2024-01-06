import Image from 'next/image';

const FooterPage = () => {
  return (
    <div className="relative w-full h-[250px]">
      <Image
        src="/footer.svg"
        alt="footer"
        fill={true}
        className="object-cover"
      />
      <div className="absolute bottom-0 w-full text-center text-white p-4">
        <p>Copyright © 2024 Smart School. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterPage;
