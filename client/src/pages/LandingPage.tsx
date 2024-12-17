import { Button } from "flowbite-react";
import { customTheme } from "../utils/themes/customThemes";

function LandingPage() {
  return (
    <main className={"w-screen h-screen "}>
      <img
        src='../src/assets/landingPage.jpg'
        alt='background image'
        className='w-screen h-screen opacity-15 fixed object-cover'
      />
      <section className=' h-screen flex items-center flex-col gap-8'>
        <img
          src='../src/assets/CooktionaryLogo.png'
          alt='cooktionary logo'
          className=' w-[18rem] h-[18rem] object-cover rounded-full shadow-xl mt-10'
        />
        <section className='flex flex-col gap-2 items-center'>
          <Button
            theme={customTheme}
            size='sm'
            color='customLoginBtn'
            className='w-40'
          >
            Register
          </Button>
          <Button
            theme={customTheme}
            size='sm'
            color='customLoginBtn'
            className='w-40'
          >
            Login
          </Button>
          <p>or checkout our library of recipes here:</p>
          <Button
            theme={customTheme}
            size='sm'
            color='customLoginBtn'
            className='w-40'
          >
            Explore Recipes
          </Button>
        </section>
      </section>
    </main>
  );
}
export default LandingPage;
