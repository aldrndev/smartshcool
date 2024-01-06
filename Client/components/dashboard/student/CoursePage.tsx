import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

const CoursePage = () => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl shadow-xl"
          src="/student-login.jpg"
          width={270}
        />
      </CardHeader>
      {/* <hr className="divided-y mb-3 mt-3" /> */}
      <CardBody className="overflow-hidden py-2 ml-5 mt-5">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardBody>
    </Card>
  );
};

export default CoursePage;
