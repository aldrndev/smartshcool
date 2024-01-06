import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginProps {
  type: string;
  image: string;
}

const Login = (props: LoginProps) => {
  const { type, image } = props;
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[990px]">
        <CardHeader className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-semibold mt-2">Welcome {type}</div>
            <div className="text-xl mt-3">Please login to your account</div>
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
            {`Don't have account yet? Register your account`}
            <span className="ml-1 underline text-blue-500">
              <Link
                href={
                  type === 'student'
                    ? '/student/register'
                    : type === 'teacher'
                    ? '/teacher/register'
                    : '/admin/register'
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

export default Login;
