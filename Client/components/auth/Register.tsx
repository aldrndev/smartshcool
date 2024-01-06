import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

interface RegisterProps {
  type: string;
  image: string;
}

const Register = (props: RegisterProps) => {
  const { type, image } = props;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newPreview = URL.createObjectURL(file);
      setImagePreview(newPreview);
    } else {
      setImagePreview(null);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[990px]">
        <CardHeader className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-semibold mt-2">Register</div>
            <div className="text-xl mt-3">{`Let's create your account here`}</div>
          </div>
        </CardHeader>
        <div className="flex justify-center items-center">
          <hr className="w-5/6  border-gray-200 my-2" />
        </div>
        <div className="flex justify-between gap-5 p-2">
          <CardBody className="flex flex-row">
            <div className="w-1/2 flex justify-center items-center ">
              <form>
                <Input
                  className="mb-5 w-[350px]"
                  type="name"
                  label="Name"
                  name="name"
                />
                <Input
                  className="mb-5 w-[350px]"
                  type="email"
                  label="Email"
                  name="email"
                />
                <Input
                  className="mb-5 w-[350px]"
                  label="Password"
                  type="password"
                  name="password"
                />
                <div className="flex justify-between mb-5">
                  <div className="mt-3.5">
                    <label
                      className="flex flex-col text-md text-gray-700 mb-5"
                      htmlFor="profileImg"
                    >
                      Profile Image
                    </label>
                    <input
                      id="profileImg"
                      name="profileImg"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <label
                      className="cursor-pointer bg-gray-100 text-gray-500  px-6 py-3 rounded-xl shadow hover:bg-blue-200"
                      htmlFor="profileImg"
                    >
                      Choose File
                    </label>
                    {imagePreview && (
                      <div className="mt-4 flex justify-center items-center">
                        <Image
                          src={imagePreview}
                          alt="Profile Preview"
                          width={50}
                          height={50}
                        />
                      </div>
                    )}
                  </div>

                  {type === 'student' ? (
                    <div className="mt-5">
                      <Select
                        labelPlacement="outside"
                        label="Select Class"
                        placeholder="Select your class"
                        name="grade"
                        className="mb-5 w-[200px]"
                        size="lg"
                      >
                        <SelectItem key="10">10</SelectItem>
                        <SelectItem key="11">11</SelectItem>
                        <SelectItem key="12">12</SelectItem>
                      </Select>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="flex justify-center items-center p-5">
                  <Button
                    type="submit"
                    className="h-[50px] w-[200px] hover:bg-blue-200"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            <div>
              <Image src={image} alt="" width={450} height={350} />
            </div>
          </CardBody>
        </div>
        <div className="flex justify-center items-center mb-5">
          <p>
            Already have account? Login to your account
            <span className="ml-1 underline text-blue-500">
              <Link
                href={
                  type === 'student'
                    ? '/student/login'
                    : type === 'teacher'
                    ? '/teacher/login'
                    : '/admin/login'
                }
              >
                Here
              </Link>
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
