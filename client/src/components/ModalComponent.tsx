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
} from "../utils/themes/customThemes";

import {
  stateProps,
  IngredientStateProps,
  RecipeArray,
} from "../types/InputProps";
import { FaPlus } from "react-icons/fa";

import { Form, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ModalComponent = ({
  setOpenModal,
  openModal,
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
}: stateProps) => {
  const navigate = useNavigate();
  const uuid = uuidv4();
  //   console.log(recipes);

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
    setRecipes((prev: RecipeArray) => {
      return {
        ...prev,
        recipeIngredients: [
          ...prev.recipeIngredients,
          {
            ingredientName: ingredients?.ingredientName,
            ingredientQty: ingredients?.ingredientQty,
            ingredientId: uuid,
          },
        ],
      };
    });
    //sets the ingredient state to empty the input field after every click on add button.
    setIngredients({
      ingredientName: "",
      ingredientQty: 0,
      ingredientId: null,
      _id: null,
    });
  };

  const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      //type checking target.files is not null
      const file = e.target.files[0];
      setRecipes((prev: RecipeArray) => {
        return { ...prev, photoUrl: file };
      });
    }
  };

  /** @handleSubmit checks if the ingredients array is not empty before submitting */
  /** @formData will contain all the data from the inputs in order for multer to parse it. */
  /** @append takes 2 args, name of key and value of key = using recipes state (contains data from the input forms) */
  /** @newIngredient object that contains ingredientName, ingredientQty, ingredientId */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recipeName", recipes.recipeName);
    //map the recipeIngredients array, for every iteration append the stringified data into the formData
    //remember to parse the stringified recipeIngredients in the server before saving to the DB
    recipes.recipeIngredients.forEach((newIngredient) => {
      //   console.log(newIngredient);
      formData.append("recipeIngredients", JSON.stringify(newIngredient));
    });
    formData.append("recipeInstructions", recipes.recipeInstructions);
    formData.append("recipeDescription", recipes.recipeDescription);
    formData.append("cookingTime", recipes.cookingTime);
    formData.append("category", recipes.category);
    formData.append("photoUrl", recipes.photoUrl);
    formData.append("photoId", recipes.photoId);
    try {
      //prevent sending if ingredients are empty
      if (recipes?.recipeIngredients?.length === 0) {
        toast.error("Ingredients cannot be empty");
      } else {
        await axios.post("/api/recipe/addRecipe", formData);
        setRecipes({
          _id: "",
          recipeName: "",
          recipeIngredients: [],
          recipeDescription: "",
          recipeInstructions: "",
          cookingTime: 0,
          category: "",
          photoUrl: "",
          photoId: "",
        });
        toast.success("Created new recipe");
        setOpenModal(false);
        return redirect("/dashboard/myRecipes");
      }
    } catch (err) {
      //type check err if axios error
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      }
    }
  };

  /** @handleDeleteIngredients accepts an id that will be used to filter the ingredients array */
  /** @setRecipes returns all prev contents of the recipes state then access the recipeIngredient to provide new values (filtered ingredients) */
  const handleDeleteIngredients = (id: string) => {
    const recipeIngredients = [...recipes.recipeIngredients]; //create new array containing previous recipeIngredients from the recipe state
    //filters the ingredients array using the id passed in the event handler
    const filteredIngredients = recipeIngredients.filter((prev) => {
      return prev.ingredientId !== id;
    });
    setRecipes((prev) => {
      return { ...prev, recipeIngredients: filteredIngredients };
    });
    // console.log(filteredIngredients);
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
            method='POST'
            encType='multipart/form-data'
          >
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='category'
                  value='Upload image'
                  className='font-rubik font-base'
                />
              </div>
              <TextInput
                type='file'
                name='photoUrl'
                onChange={handleImageUploadChange}
              />
            </div>
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
                defaultValue={recipes.recipeName}
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
                defaultValue={recipes.recipeDescription}
              />
            </div>
            <div>
              <Textarea
                id='recipeInstructions'
                placeholder='Cooking Instructions'
                required
                rows={8}
                theme={customTextArea}
                color='customColor'
                name='recipeInstructions'
                onChange={handleChangeTextArea}
                defaultValue={recipes.recipeInstructions}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='category'
                  value='Indicate the cooking time in minutes'
                  className='font-rubik font-base'
                />
              </div>
              <TextInput
                id='cookingTime'
                type='number'
                placeholder='Cooking time'
                required
                theme={customInput}
                color='customInputColor'
                name='cookingTime'
                onChange={handleChange}
                defaultValue={recipes.cookingTime}
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
                defaultValue={recipes.category}
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
                  //   required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientName'
                  onChange={handleChangeIngredients}
                  value={ingredients?.ingredientName ?? ""}
                />
              </div>
              <div className='p-2'>
                <TextInput
                  id='ingredientQty'
                  type='text'
                  placeholder='Ingredient Quantity'
                  //   required
                  theme={customInput}
                  color='customInputColor'
                  name='ingredientQty'
                  onChange={handleChangeIngredients}
                  value={ingredients?.ingredientQty ?? ""}
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
                            // console.log(allRecipes);
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
                                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                                      onClick={() => {
                                        handleDeleteIngredients(
                                          allRecipes?.ingredientId ?? ""
                                        );
                                      }}
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
