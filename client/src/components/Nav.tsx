import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { customNavbar } from "../utils/themes/customThemes";
import { useContext } from "react";
import { loggedUserContext } from "../context/Context";

function Nav() {
  const data = useContext(loggedUserContext);
  console.log(data);

  return (
    <>
      <Navbar
        fluid
        // className=' bg-customLoginBtnColor'
        theme={customNavbar}
      >
        <Navbar.Brand href='https://flowbite-react.com'>
          <img
            src='../../src/assets/CooktionaryLogo.png'
            className='mr-3 w-[3rem] h-[3rem] rounded-3xl  sm:w-[3rem] sm:h-[3rem]'
            alt='Cooktionary logo'
          />
          <span className='self-center whitespace-nowrap text-base font-bold dark:text-white font-rubik sm:text-xl'>
            Cooktionary
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User settings'
                img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                rounded
                className='mr-2'
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{`${data.firstName} ${data.lastName}`}</span>
              <span className='block truncate text-sm font-medium'>
                {data.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='rounded-md mt-2 mr-24'>
          <Navbar.Link href='/dashboard/myRecipes'>My Recipes</Navbar.Link>
          <Navbar.Link href='#'>Browse Recipes</Navbar.Link>
          <Navbar.Link href='#'>Services</Navbar.Link>
          <Navbar.Link href='#'>About</Navbar.Link>
          <Navbar.Link href='#'>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Nav;
