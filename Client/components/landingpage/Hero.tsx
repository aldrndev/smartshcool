import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';

const HeroPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-10 bg-gray-50">
        <div className="w-1/2 p-5 ml-10">
          <h1 className="text-4xl font-bold mb-4 text-primary-400">
            Welcome to Smart School
          </h1>
          <p className="w-[600px] text-lg text-foreground-700 mt-10">
            Smart School is learning management system when student, teacher and
            admin school can connected always anywhere, anytime !
          </p>
          <p className="w-[600px] text-lg text-foreground-700 mt-10">
            Start using smart school for free, register your account now without
            any charge !
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Image src="/hero.png" alt="Hero" width={700} height={500} />
        </div>
      </div>
      <div className="relative w-full h-[200px]">
        <Image
          src="/hero.svg"
          alt="hero"
          fill={true}
          className="object-cover"
        />
        <div className="flex absolute left-2/4 bottom-12 animate-bounce">
          <IoIosArrowDown className="text-3xl text-primary" />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
