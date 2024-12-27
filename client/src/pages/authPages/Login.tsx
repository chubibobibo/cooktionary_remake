import { Button, Card } from "flowbite-react";
import RegisterForm from "../../components/RegisterForm";
import { StateType } from "../../types/InputProps";
import { customTheme } from "../../utils/themes/customThemes";

import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { redirect, Form } from "react-router-dom";

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
    return redirect("/");
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      toast.error(
        Array.isArray(err)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
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
    <section className='w-screen h-full flex flex-col items-center justify-center'>
      <img
        src='../../src/assets/registerBg.png'
        alt='background'
        className='opacity-30 object-cover h-screen w-screen object-bottom-right'
      />
      {/* <section className='p-2'> */}
      <img
        src='../../src/assets/CooktionaryLogo.png'
        alt='cooktionary logo'
        className='w-[7rem] h-[7rem] rounded-full -mt-[37rem] mb-2 opacity-100 z-10'
      />
      {/* </section> */}
      <Card className='w-11/12 h-[25rem] flex justify-center mb-4 sm:w-4/12'>
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
          <Button theme={customTheme} type='submit' color='customLoginBtn'>
            Login
          </Button>
        </Form>
      </Card>
    </section>
  );
}
export default Login;
