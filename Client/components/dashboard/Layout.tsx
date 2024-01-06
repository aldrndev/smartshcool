import SidebarPage from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const user: {
    name: string;
    profilePic: string;
    role: 'student' | 'teacher' | 'admin';
  } = {
    name: 'Aldrin',
    profilePic: 'https://placekitten.com/200',
    role: 'student', // Now correctly typed as 'student'
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <SidebarPage user={user} />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
