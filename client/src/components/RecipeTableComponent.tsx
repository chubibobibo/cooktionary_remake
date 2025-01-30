/** @NOTE THIS IS A TABLE COMPONENT THAT IS RENDERED IN THE PARENT COMPONENT CARD COMPONENT */

import { Table } from "flowbite-react";

import { IngredientStateProps } from "../types/InputProps";

interface IngredientProps {
  ingredients: IngredientStateProps[];
}

function RecipeTableComponent({ ingredients }: IngredientProps) {
  // console.log(ingredients);

  /** indicate a fixed width for overflow to work */

  return (
    <div className='overflow-x-auto w-[20rem] md:w-full mt-5 mb-10'>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Ingredients</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
        </Table.Head>
        {Array.isArray(ingredients) &&
          ingredients.map((allRecipes) => {
            // console.log(allRecipes.ingredientName);
            return (
              <>
                <Table.Body className='divide-y'>
                  {/* <section key={allRecipes._id}> */}
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {allRecipes?.ingredientName}
                    </Table.Cell>
                    <Table.Cell>{allRecipes?.ingredientQty}</Table.Cell>
                  </Table.Row>
                  {/* </section> */}
                </Table.Body>
              </>
            );
          })}
      </Table>
    </div>
  );
}
export default RecipeTableComponent;
