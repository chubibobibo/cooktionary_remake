import { Button, Card } from "flowbite-react";
import RegisterForm from "../../components/RegisterForm";
import { StateType } from "../../types/InputProps";
import { customTheme } from "../../utils/themes/customThemes";

import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { redirect, Form, Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useState } from "react";

/** action data to submit  */
/** assert request object type as Request instead of any */
/** @confirmedPwd obtains the 2 passwords from the data object (converted form data) */
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData(); //obtain data from forms
  const data = Object.fromEntries(formData); //converts data to object
  const confirmedPwd = data.password1 === data.password2;
  if (!confirmedPwd) {
    return toast.error("Passwords does not match");
  }
  data.password = data.password1; // create a new key in data that will contain the password if 2 passwords are the same
  try {
    await axios.post("/api/auth/register", data);
    toast.success("User successfully registered");
    return redirect("/");
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
    return err;
  }
};

function Register() {
  /** State handles visibility icon */
  const [isVisible, setIsVisible] = useState<StateType>({
    icon1: false,
    icon2: false,
  });

  /** correct typing for event handlers */
  const handleClickIcon1: React.MouseEventHandler<HTMLOrSVGElement> = () => {
    setIsVisible({ ...isVisible, icon1: !isVisible.icon1 });
  };
  const handleClickIcon2: React.MouseEventHandler<HTMLOrSVGElement> = () => {
    setIsVisible({ ...isVisible, icon2: !isVisible.icon2 });
  };

  return (
    <section
      className='w-screen h-full flex flex-col items-center bg-cover bg-center bg-blend-luminosity p-2 gap-4 sm:pt-[10rem] sm:h-screen'
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundImage: "url(../../src/assets/registerBg.png)",
        // opacity: 0.5,
      }}
    >
      <img
        src='../../src/assets/CooktionaryLogo.png'
        alt='cooktionary logo'
        className='w-[7rem] h-[7rem] rounded-full mb-2 opacity-100 z-1 sm:w-[15rem] sm:h-[15rem]'
      />
      {/* </section> */}
      <Card className='w-11/12 p-1 flex justify-center sm:p-0 sm:w-3/12'>
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
          {/** firstname text field */}
          <RegisterForm
            title={"First name"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"firstName"}
            size={"custom"}
          />
          {/** lastname text field */}
          <RegisterForm
            title={"Last name"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"lastName"}
            size={"custom"}
          />
          {/** email text field */}
          <RegisterForm
            title={"Email"}
            inputIcon={MdEmail}
            required={true}
            type={"email"}
            name={"email"}
            size={"custom"}
          />
          {/** password1 text field */}
          <RegisterForm
            title={"type your password"}
            inputIcon={RiLockPasswordFill}
            required={true}
            type={"password"}
            name={"password1"}
            handleClick={handleClickIcon1}
            isVisible={isVisible.icon1}
            isPassword={true}
            size={"custom"}
          />
          {/** password2 text field */}
          <RegisterForm
            title={"Re-type your password"}
            inputIcon={RiLockPasswordFill}
            required={true}
            type={"password"}
            name={"password2"}
            handleClick={handleClickIcon2}
            isVisible={isVisible.icon2}
            isPassword={true}
            size={"custom"}
          />
          <Button
            theme={customTheme}
            type='submit'
            color='customLoginBtn'
            className='sm:w-[10rem] sm:m-auto'
          >
            Register
          </Button>
        </Form>
        <section className='text-[14px] flex justify-center gap-1'>
          <p>Already a user? </p>
          <Link to='/login' className='text-customLightGreen'>
            Login
          </Link>
        </section>
      </Card>
    </section>
  );
}
export default Register;
