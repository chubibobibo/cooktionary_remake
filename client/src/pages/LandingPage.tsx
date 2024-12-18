import { Button } from "flowbite-react";
import { customTheme } from "../utils/themes/customThemes";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className={"w-screen h-screen md:flex flex-col items-center"}>
      <img
        src='../src/assets/landingPage.jpg'
        alt='background image'
        className='w-screen h-screen fixed object-cover opacity-30'
      />
      <section className='h-screen flex items-center flex-col gap-8 md:w-11/12 sm:gap-10 md:gap-14 relative'>
        <img
          src='../src/assets/CooktionaryLogo.png'
          alt='cooktionary logo'
          className=' w-[18rem] h-[18rem] object-cover rounded-full shadow-xl mt-10 md:w-[30rem] md:h-[30rem]  '
        />
        {/* Button container */}
        <section className='flex flex-col  gap-2 items-center sm:gap-4 md:gap-5'>
          <p className='text-[12px] text-center sm:text-base md:text-lg'>
            Create and save you own recipes by logging in
          </p>
          <section className='flex flex-col gap-2 md:flex-row'>
            <Link to='/register'>
              <Button
                theme={customTheme}
                size='sm'
                color='customLoginBtn'
                className='w-40'
              >
                Register
              </Button>
            </Link>
            <Button
              theme={customTheme}
              size='sm'
              color='customLoginBtn'
              className='w-40'
            >
              Login
            </Button>
          </section>
          <p className='text-[12px] text-center mt-2 sm:text-base md:text-lg'>
            or check out our library of recipes here:
          </p>
          <Button
            theme={customTheme}
            size='sm'
            color='customLoginBtn'
            className='w-40'
          >
            Browse Recipes
          </Button>
        </section>
      </section>
    </main>
  );
}
export default LandingPage;
