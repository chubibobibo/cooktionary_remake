import { Button, Card } from "flowbite-react";
import RegisterForm from "../../components/RegisterForm";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { redirect, Form } from "react-router-dom";

/** action data to submit  */
/** assert request type as Request instead of any */
/** @confirmedPwd obtains the 2 passwords from the data object (converted form data) */
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData(); //obtain data from forms
  const data = Object.fromEntries(formData); //converts data to object
  const confirmedPwd = data.password1 === data.password2;
  if (!confirmedPwd) {
    return toast.error("Passwords does not match");
  }
  data.password = data.password1; // create a new key in data that will contain the password
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
  return (
    <section className='w-screen h-full flex flex-col items-center justify-center bg-customLoginBtnColor'>
      <section className='p-2  '>
        <img
          src='../../src/assets/CooktionaryLogo.png'
          alt='cooktionary logo'
          className='w-[10rem] h-[10rem] rounded-full'
        />
      </section>
      <Card className='w-11/12 mb-4'>
        <Form className='flex flex-col gap-4' method='POST'>
          {/** username text field */}
          <RegisterForm
            title={"Username"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"username"}
          />
          {/** firstname text field */}
          <RegisterForm
            title={"First name"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"firstName"}
          />
          {/** lastname text field */}
          <RegisterForm
            title={"Last name"}
            inputIcon={FaUser}
            required={true}
            type={"text"}
            name={"lastName"}
          />
          {/** email text field */}
          <RegisterForm
            title={"Email"}
            inputIcon={FaUser}
            required={true}
            type={"email"}
            name={"email"}
          />
          {/** password1 text field */}
          <RegisterForm
            title={"Password"}
            inputIcon={FaUser}
            required={true}
            type={"password"}
            name={"password1"}
          />
          {/** password2 text field */}
          <RegisterForm
            title={"password2"}
            inputIcon={FaUser}
            required={true}
            type={"password"}
            name={"password2"}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Card>
    </section>
  );
}
export default Register;
