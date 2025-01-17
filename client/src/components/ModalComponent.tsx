import {
  Button,
  Label,
  TextInput,
  Modal,
  Textarea,
  Select,
  Table,
} from "flowbite-react";

import {
  customInput,
  customTextArea,
  customTheme,
  customTable,
} from "../utils/themes/customThemes";

import { stateProps, IngredientStateProps } from "../types/InputProps";
import { FaPlus } from "react-icons/fa";

import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ModalComponent = ({
  setOpenModal,
  openModal,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}: stateProps) => {
  const navigate = useNavigate();

  /** @handleChange event handler for the text inputs */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /** @handleChangeTextArea event handler for the textarea */
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /** @handleChangeSelect event handler for the select input */
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

  /** @handleAddIngredientClick used as onClick function to add data in the ingredients state to the recipes.recipeIngredients array */
  /** @handleAddIngredientClick returns all the previous recipes then accesses the recipeIngredients array. Then we accessed all the prev values in the recipeIngredients array, this is so that we can persist all it's values when updating. Then created a new object containing the new ingredientName and ingredientQty */
  /** @setIngredients used to reset the inputs for ingredientName and ingredientQty inputs */
  const handleAddIngredientClick = () => {
    setRecipes((prev) => {
      return {
        ...prev,
        recipeIngredients: [
          ...prev.recipeIngredients,
          {
            ingredientName: ingredients?.ingredientName,
            ingredientQty: ingredients?.ingredientQty,
          },
        ],
      };
    });
    setIngredients({ ingredientName: "", ingredientQty: 0, _id: null });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/recipe/addRecipe", recipes);
      navigate("/dashboard/myRecipes");
      toast.success("Created new recipe");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        //type check err if axios error
        console.log(err);
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      }
    }
  };

  //   console.log(tempIngredients);
  //   console.log(ingredients);
  //   console.log(recipes);
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create your recipe</Modal.Header>
        <Modal.Body>
          <Form
            className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div>
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
                <Label
                  htmlFor='category'
                  value='Select your recipe category'
                  className='font-rubik font-base'
                />
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
                <h2 className='font-rubik'>Add your ingredients</h2>
              </div>
              <div className='px-2'>
                <TextInput
                  id='ingredientName'
                  type='text'
                  placeholder='Ingredient Name'
                  required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientName'
                  onChange={handleChangeIngredients}
                  value={ingredients?.ingredientName}
                />
              </div>
              <div className='p-2'>
                <TextInput
                  id='ingredientQty'
                  type='number'
                  placeholder='Ingredient Quantity'
                  required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientQty'
                  onChange={handleChangeIngredients}
                  value={ingredients?.ingredientQty}
                />
              </div>
              <Button
                theme={customTheme}
                color='customLoginBtn'
                className='ml-2 mt-1'
                onClick={handleAddIngredientClick}
              >
                <FaPlus className='mr-2 h-5 w-4 text-gray-700' />
                Add
              </Button>
              {/** ingredient table */}
              <div>
                <h2 className='font-rubik p-2 mt-2'>Ingredient List</h2>
                <div className='px-2'>
                  <div className='overflow-x-auto'>
                    <Table striped className='rounded-none'>
                      <Table.Head>
                        <Table.HeadCell>Ingredient Name</Table.HeadCell>
                        <Table.HeadCell>Ingredient Quantity</Table.HeadCell>

                        <Table.HeadCell>
                          <span className='sr-only'>Edit</span>
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className='divide-y'>
                        {recipes?.recipeIngredients.map(
                          (allRecipes: IngredientStateProps) => {
                            return (
                              <>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {allRecipes?.ingredientName}
                                  </Table.Cell>
                                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {allRecipes?.ingredientQty}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <a
                                      href='#'
                                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                                    >
                                      Delete
                                    </a>
                                  </Table.Cell>
                                </Table.Row>
                              </>
                            );
                          }
                        )}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalComponent;
