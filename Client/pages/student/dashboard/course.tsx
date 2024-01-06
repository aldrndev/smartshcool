import Layout from '@/components/dashboard/Layout';
import PaginationPage from '@/components/dashboard/Pagination';
import CoursePage from '@/components/dashboard/student/CoursePage';
import { Input, Select, SelectItem } from '@nextui-org/react';

import React from 'react';

const Course = () => {
  return (
    <>
      <Layout>
        <div className="flex-grow p-5">
          <div className="flex justify-between mb-5">
            <div className="w-[200px]">
              <Input
                type="search"
                placeholder="Search course..."
                variant="faded"
              />
            </div>
            <div className="w-[150px]">
              <Select label="Sort by grade" name="sort" variant="faded">
                <SelectItem key="10">10</SelectItem>
                <SelectItem key="11">11</SelectItem>
                <SelectItem key="12">12</SelectItem>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <CoursePage />
            <CoursePage />
            <CoursePage />
            <CoursePage />
            <CoursePage />
            <CoursePage />
            <CoursePage />
            <CoursePage />
          </div>
          <div className="flex justify-center items-center p-5 mt-3">
            <PaginationPage />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Course;
