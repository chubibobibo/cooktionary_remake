import { Table } from "flowbite-react";
import { customRecipeTable } from "../utils/themes/customThemes";

function RecipeTableComponent() {
  {
    /** indicate a fixed width for overflow to work */
  }
  return (
    <div className='overflow-x-auto w-[20rem] mt-5'>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Ingredients</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>

            <Table.Cell>
              <a
                href='#'
                className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          {/* <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>

            <Table.Cell>
              <a
                href='#'
                className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>

            <Table.Cell>
              <a
                href='#'
                className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Google Pixel Phone
            </Table.Cell>
            <Table.Cell>Gray</Table.Cell>

            <Table.Cell>
              <a
                href='#'
                className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Apple Watch 5
            </Table.Cell>
            <Table.Cell>Red</Table.Cell>

            <Table.Cell>
              <a
                href='#'
                className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table>
    </div>
  );
}
export default RecipeTableComponent;
