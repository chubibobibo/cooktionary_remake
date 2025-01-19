import { TextInput } from "flowbite-react";

import { InputProps } from "../types/InputProps";
import { customInput } from "../utils/themes/customThemes";

import { FaEye, FaEyeSlash } from "react-icons/fa";

//infer types of props using InputProp types
function RegisterForm({
  title,
  inputIcon,
  required,
  type,
  name,
  handleClick,
  isVisible,
  isPassword,

  size,
}: InputProps) {
  /** @visibleIconCondition conditional to render icon for visible password depending on isVisible state(icon1 and icon2) */
  const visibleIconCondition = isVisible ? (
    <FaEyeSlash color='gray' onClick={handleClick} />
  ) : (
    <FaEye color='gray' onClick={handleClick} />
  );

  return (
    <section className='w-full relative'>
      <TextInput
        id={title}
        type={isVisible ? "text" : type}

        icon={inputIcon}
        placeholder={title}
        required={required}
        name={name}
        theme={customInput}
        color='customInputColor'

        sizing={size}
      />
      {/** separates the icon allows us to generate the icon as component for applying onClick event */}
      <div className='absolute inset-y-0 right-4 flex items-center cursor-pointer'>

        {/** renders the icon to hide pwd */}
        {/** @isPassword limits the rendering of eye icon only in the pwd fields */}
        {/** @visibleIconCondition determines the icon to be rendered if input field is a password field*/}
        {isPassword && visibleIconCondition}
      </div>
    </section>
  );
}
export default RegisterForm;
