import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import {
  MdOutlineAccountCircle,
  MdOutlineSupervisorAccount,
} from 'react-icons/md';
import { ThemeSwitcher } from '../ThemeSwitcher';

enum ModalType {
  Login = 'login',
  Register = 'register',
}

const NavbarPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>(ModalType.Login);

  const openModal = (type: ModalType) => {
    setModalType(type);
    onOpen();
  };
  return (
    <Navbar maxWidth="xl" className="shadow-lg p-2">
      <NavbarBrand>
        <Image src="/next.svg" alt="logo" width={100} height={100} />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2">
          <Button
            onPress={() => openModal(ModalType.Login)}
            startContent={<MdOutlineAccountCircle size={20} />}
            variant="flat"
            className="bg-gradient-to-tr from-teal-500 to-cyan-500 text-white  shadow-lg"
          >
            Login
          </Button>

          <Button
            onPress={() => openModal(ModalType.Register)}
            startContent={<MdOutlineSupervisorAccount size={20} />}
            variant="flat"
            className="bg-gradient-to-tr from-cyan-600 to-blue-400 text-white shadow-lg"
          >
            Register
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col justify-center items-center">
                    {modalType === ModalType.Login
                      ? 'Choose Login as :'
                      : 'Choose Register as :'}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-between gap-2 p-5 mb-7">
                      <Button
                        fullWidth
                        as={Link}
                        href={`/student/${modalType}`}
                        variant="flat"
                        className={
                          modalType === ModalType.Login
                            ? 'bg-gradient-to-tr from-teal-500 to-cyan-500 text-white shadow-lg'
                            : 'bg-gradient-to-tr from-cyan-600 to-blue-400 text-white shadow-lg'
                        }
                      >
                        Student
                      </Button>
                      <Button
                        fullWidth
                        as={Link}
                        href={`/teacher/${modalType}`}
                        variant="flat"
                        className={
                          modalType === ModalType.Login
                            ? 'bg-gradient-to-tr from-teal-500 to-cyan-500 text-white shadow-lg'
                            : 'bg-gradient-to-tr from-cyan-600 to-blue-400 text-white shadow-lg'
                        }
                      >
                        Teacher
                      </Button>
                      <Button
                        fullWidth
                        as={Link}
                        href={`/admin/${modalType}`}
                        variant="flat"
                        className={
                          modalType === ModalType.Login
                            ? 'bg-gradient-to-tr from-teal-500 to-cyan-500 text-white shadow-lg'
                            : 'bg-gradient-to-tr from-cyan-600 to-blue-400 text-white shadow-lg'
                        }
                      >
                        Admin School
                      </Button>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarPage;
