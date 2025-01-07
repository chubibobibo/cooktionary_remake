import { Button, Card } from "flowbite-react";
import RegisterForm from "../../components/RegisterForm";
import { customTheme } from "../../utils/themes/customThemes";

import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { redirect, Form, Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";

/** action function to login */
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData(); //obtains data from form.
  const data = Object.fromEntries(formData); //converts data into objects
  try {
    await axios.post("/api/auth/login", data);
    toast.success("User logged in");
    return redirect("/dashboard/myRecipes");
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      /** check if err contains messages else get error from data */
      toast.error(
        err?.response?.data?.message
          ? Array.isArray(err)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
          : err?.response?.data
      );
      return err;
    }
  }
};

function Login() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleHidePwd: React.MouseEventHandler<HTMLOrSVGElement> = () => {
    setIsVisible((prev) => {
      return !prev;
    });
  };
  return (
    <section
      className='w-screen h-screen flex flex-col items-center justify-start bg-cover bg-center bg-blend-luminosity pt-20 sm:pt-[12rem] gap-4'
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundImage: "url(../../src/assets/registerBg.png)",
      }}
    >
      {/* <section className='p-2'> */}
      <img
        src='../../src/assets/CooktionaryLogo.png'
        alt='cooktionary logo'
        className='w-[7rem] h-[7rem] rounded-full mb-2 opacity-100 z-10 sm:w-[15rem] sm:h-[15rem]'
      />
      {/* </section> */}
      <Card className='w-11/12 flex justify-center mb-4 sm:w-3/12 sm:p-3'>
        <Form className='flex flex-col gap-4' method='POST'>
          {/** username text field */}
          <RegisterForm
            title={"Username"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"username"}
            size={"custom"}
          />

          {/** password1 text field */}
          <RegisterForm
            title={"type your password"}
            inputIcon={RiLockPasswordFill}
            required={true}
            type={"password"}
            name={"password"}
            handleClick={handleHidePwd}
            isVisible={isVisible}
            isPassword={true}
            size={"custom"}
          />
          <Button
            theme={customTheme}
            type='submit'
            color='customLoginBtn'
            className='sm:m-auto sm:w-[10rem] flex'
          >
            Login
          </Button>
        </Form>
        <section className='text-[14px] flex justify-center gap-1'>
          <p>No account yet? </p>
          <Link to='/register' className='text-customLightGreen'>
            Register
          </Link>
        </section>
      </Card>
    </section>
  );
}
export default Login;
