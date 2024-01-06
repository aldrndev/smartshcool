import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoBookOutline } from 'react-icons/io5';
import { MdOutlineAssignment } from 'react-icons/md';
import { BiMessageSquare } from 'react-icons/bi';
import { FaCreditCard, FaChalkboardTeacher, FaBookmark } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { PiStudent } from 'react-icons/pi';
import { BiTask } from 'react-icons/bi';

import Link from 'next/link';

interface User {
  role: 'student' | 'teacher' | 'admin';
  name: string;
  profilePic: string;
}

interface SidebarProps {
  user: User;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  link: string;
}

const SidebarPage: React.FC<SidebarProps> = ({ user }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const baseLink = `/${user.role}/dashboard`;
    const commonItems: MenuItem[] = [
      { name: 'Course', icon: <IoBookOutline />, link: `${baseLink}/course` },
      {
        name: 'Assignment',
        icon: <MdOutlineAssignment />,
        link: `${baseLink}/assignment`,
      },
      {
        name: 'Message',
        icon: <BiMessageSquare />,
        link: `${baseLink}/message`,
      },
    ];

    switch (user.role) {
      case 'student':
        setMenuItems([
          ...commonItems,
          {
            name: 'Enrolled Course',
            icon: <FaBookmark />,
            link: `${baseLink}/enrolled-course`,
          },
          {
            name: 'Payment',
            icon: <FaCreditCard />,
            link: `${baseLink}/payment`,
          },
        ]);
        break;
      case 'teacher':
        setMenuItems(commonItems);
        break;
      case 'admin':
        setMenuItems([
          {
            name: 'Manage Student',
            icon: <PiStudent />,
            link: `${baseLink}/student`,
          },
          {
            name: 'Manage Teacher',
            icon: <FaChalkboardTeacher />,
            link: `${baseLink}/teacher`,
          },
          {
            name: 'Administration',
            icon: <BiTask />,
            link: `${baseLink}/administration`,
          },
        ]);
        break;
      default:
        setMenuItems([]);
    }
  }, [user.role]);

  return (
    <div className="w-[15vw] min-h-full fixed shadow-lg">
      <div className="p-7">
        <div className="flex items-center flex-col p-4">
          <Image
            src={user.profilePic}
            alt="profile"
            width={70}
            height={70}
            className="rounded-full"
          />
          <span className="mt-3">{user.name}</span>
        </div>
        <hr className="divided-y" />
        <div className="mt-5">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex mt-2 items-center p-2 hover:bg-blue-400 cursor-pointer"
            >
              <div className="mr-2">{item.icon}</div>
              {item.name}
            </Link>
          ))}

          <Link
            href="#"
            className="flex mt-2 items-center p-2 hover:bg-blue-400 cursor-pointer"
          >
            <div className="mr-2">
              <HiOutlineLogout />
            </div>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarPage;
