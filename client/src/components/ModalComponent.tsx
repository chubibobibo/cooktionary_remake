import {
  Button,
  Label,
  TextInput,
  Modal,
  Textarea,
  Select,
} from "flowbite-react";

import {
  customInput,
  customTextArea,
  customTheme,
} from "../utils/themes/customThemes";

import { stateProps, TempIngredientType } from "../types/InputProps";
import { FaPlus } from "react-icons/fa";

import { useState } from "react";

const ModalComponent = ({
  setOpenModal,
  openModal,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}: stateProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecipes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /** @setIngredients allows us to set the state for the ingredients which we will then use to set the recipeIngredients array in recipes  */
  const handleChangeIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /** @handleAddIngredientClick returns all the previous recipes then accesses the recipeIngredients array. Then we accessed all the prev values in the recipeIngredients array, this is so that we can persist all it's values when updating. Then created a new object containing the new ingredientName and ingredientQty */
  const handleAddIngredientClick = () => {
    setRecipes((prev) => {
      return {
        ...prev,
        recipeIngredients: [
          ...prev.recipeIngredients,
          {
            ingredientName: ingredients.ingredientName,
            ingredientQty: ingredients.ingredientQty,
          },
        ],
      };
    });
  };

  //   console.log(tempIngredients);
  console.log(ingredients);
  console.log(recipes);
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create your recipe</Modal.Header>
        <Modal.Body>
          <form className='flex max-w-md flex-col gap-4'>
            <div>
              {/* <div className='mb-2 block'>
                <Label htmlFor='email1' value='Your email' />
              </div> */}
              <TextInput
                id='recipeName'
                type='text'
                placeholder='Recipe Name'
                required
                theme={customInput}
                color='customInputColor'
                onChange={handleChange}
                name='recipeName'
              />
            </div>
            <div>
              <Textarea
                id='recipeDescription'
                placeholder='Description'
                required
                rows={3}
                theme={customTextArea}
                color='customColor'
                name='recipeDescription'
                onChange={handleChangeTextArea}
              />
            </div>
            <div>
              <Textarea
                id='recipeInstructions'
                placeholder='Cooking Instructions'
                required
                rows={3}
                theme={customTextArea}
                color='customColor'
                name='recipeInstructions'
                onChange={handleChangeTextArea}
              />
            </div>
            <div>
              {/* <div className='mb-2 block'>
                <Label htmlFor='email1' value='Your email' />
              </div> */}
              <TextInput
                id='cookingTime'
                type='text'
                placeholder='Cooking time'
                required
                theme={customInput}
                color='customInputColor'
                name='cookingTime'
                onChange={handleChange}
              />
            </div>
            <div className='max-w-md'>
              <div className='mb-2 block'>
                <Label htmlFor='category' value='Select your recipe category' />
              </div>
              <Select
                id='category'
                required
                name='category'
                onChange={handleChangeSelect}
              >
                <option value={"beef"}>Beef</option>
                <option value={"pork"}>Pork</option>
                <option value={"chicken"}>Chicken</option>
                <option value={"fish"}>Fish</option>
                <option value={"vegetarian"}>Vegetarian</option>
                <option value={"dessert"}>Dessert</option>
              </Select>
            </div>

            {/** Add ingredients and quantity */}
            <div className='bg-red-100 w-full h-[40rem]'>
              <div className='p-2'>
                <TextInput
                  id='ingredientName'
                  type='text'
                  placeholder='Ingredient Name'
                  required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientName'
                  onChange={handleChangeIngredients}
                />
              </div>
              <div className='p-2'>
                <TextInput
                  id='ingredientQty'
                  type='text'
                  placeholder='Ingredient Quantity'
                  required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientQty'
                  onChange={handleChangeIngredients}
                />
              </div>
              <Button
                theme={customTheme}
                color='customLoginBtn'
                className='ml-2'
                onClick={handleAddIngredientClick}
              >
                <FaPlus className='mr-2 h-5 w-4 text-gray-700' />
                Add
              </Button>
              <div>'recipes'</div>
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default ModalComponent;
