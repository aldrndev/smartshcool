import { PiStudent } from 'react-icons/pi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { Tabs, Tab } from '@nextui-org/react';
import Image from 'next/image';

const ContentPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Tabs aria-label="Options" color="primary" variant="bordered" size="lg">
        <Tab
          key="student"
          title={
            <div className="flex items-center space-x-2">
              <PiStudent />
              <span>Student</span>
            </div>
          }
        >
          <div className="flex items-center justify-between p-10">
            <div className="w-1/2 flex justify-center">
              <Image
                src="/content-student.jpg"
                alt="content-student"
                width={500}
                height={450}
              />
            </div>
            <div className="w-1/2 px-10">
              <h3 className="text-3xl font-semibold mb-5">
                Smart School for Student
              </h3>
              <p className="text-lg mb-5">
                Smart School makes student activities easier with features like
                online lessons, assignments, and connecting with teachers
                anytime, anywhere.
              </p>
              <div className="flex flex-col gap-y-6">
                <h4 className="text-2xl text-blue-500 font-medium">
                  Features:
                </h4>
                <div className="flex">
                  <div className="flex flex-col gap-y-8">
                    <FeatureItem
                      title="Message"
                      description="Send message to teacher anytime, everywhere"
                    />
                    <FeatureItem
                      title="Courses"
                      description="Enroll course from teacher and learn online"
                    />
                    <FeatureItem
                      title="Assigment"
                      description="Take assignment online"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          key="teacher"
          title={
            <div className="flex items-center space-x-2">
              <FaChalkboardTeacher />
              <span>Teacher</span>
            </div>
          }
        >
          <div className="flex items-center justify-between p-10">
            <div className="w-1/2 flex justify-center">
              <Image
                src="/content-teacher.jpg"
                alt="content-teacher"
                width={350}
                height={300}
              />
            </div>
            <div className="w-1/2 px-10">
              <h3 className="text-3xl font-semibold mb-5">
                Smart School for Teacher
              </h3>
              <p className="text-lg mb-5">
                Smart School makes teacher activities easier with features like
                upload course, create assignments, and connecting with student
                anytime, anywhere.
              </p>
              <div className="flex flex-col gap-y-6">
                <h4 className="text-2xl text-blue-500 font-medium">
                  Features:
                </h4>
                <div className="flex">
                  <div className="flex flex-col gap-y-8">
                    <FeatureItem
                      title="Message"
                      description="Send message to student anytime, everywhere"
                    />
                    <FeatureItem
                      title="Courses"
                      description="Upload course everywhere, anytime for student"
                    />
                    <FeatureItem
                      title="Assigment"
                      description="Create assignment online for student"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          key="admin"
          title={
            <div className="flex items-center space-x-2">
              <RiAdminFill />
              <span>Admin School</span>
            </div>
          }
        >
          <div className="flex items-center justify-between p-10">
            <div className="w-1/2 flex justify-center">
              <Image
                src="/content-admin.jpg"
                alt="content-admin"
                width={500}
                height={450}
              />
            </div>
            <div className="w-1/2 px-10">
              <h3 className="text-3xl font-semibold mb-5">
                Smart School for Admin School
              </h3>
              <p className="text-lg mb-5">
                Smart School makes admin school activities easier with features
                like manage student, manage teacher, and connecting with
                teachers and student anytime, anywhere.
              </p>
              <div className="flex flex-col gap-y-6">
                <h4 className="text-2xl text-blue-500 font-medium">
                  Features:
                </h4>
                <div className="flex">
                  <div className="flex flex-col gap-y-8">
                    <FeatureItem
                      title="Message"
                      description="Send message to teacher and student anytime, everywhere"
                    />
                    <FeatureItem
                      title="Manage Student"
                      description="Manage student anywhere, anytime"
                    />
                    <FeatureItem
                      title="Manage Teacher"
                      description="Manage student anywhere, anytime"
                    />
                    <FeatureItem
                      title="Administration"
                      description="Create administration online"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <div className="flex gap-x-8">
    <div className="relative">
      <div className="h-[60px] w-[1px] bg-gray-300 ml-2"></div>
      <div className="w-[11px] h-[11px] rounded-full bg-blue-400 absolute -left-[-4px] top-6"></div>
    </div>
    <div>
      <h5 className="text-lg font-semibold mb-2">{title}</h5>
      <p className="text-md text-gray-600">{description}</p>
    </div>
  </div>
);

export default ContentPage;
