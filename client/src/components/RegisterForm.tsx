import { TextInput } from "flowbite-react";

import { InputProps } from "../types/InputProps";

//infer types of props using InputProp types
function RegisterForm({ title, inputIcon, required, type, name }: InputProps) {
  return (
    <section>
      <div className='max-w-md'>
        {/* <div className='mb-2 block'>
          <Label htmlFor={title} value={title} />
        </div> */}
        <TextInput
          id={title}
          type={type}
          icon={inputIcon}
          placeholder={title}
          required={required}
          name={name}
        />
      </div>
    </section>
  );
}
export default RegisterForm;
