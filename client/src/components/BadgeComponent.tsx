import { Badge } from "flowbite-react";
import { useNavigate } from "react-router-dom";

/** @propTypes sets types for the props received from parent component (Myrecipes.tsx)*/
type propTypes = {
  category?: string;
  handleActiveBadge?: (str: string) => void;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<{ category: string | undefined }>
  >;
  selectedCategoryProp?: { category: string | undefined }; //sets type for the prop object containing category
  badgeIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
  name: string;
};

function BadgeComponent({
  category,
  // handleActiveBadge,
  selectedCategoryProp,
  badgeIcon,
  setSelectedCategory,
  name,
}: propTypes) {
  const navigate = useNavigate(); //navigates to a url with query strings
  //set the type of the event handler that accepts str as a string.
  const handleActiveBadge: (str: string) => void = (str) => {
    setSelectedCategory({
      ...selectedCategoryProp,
      category: str,
    });
    navigate(`/dashboard/myRecipes?searchCategory=${category}`);
  };

  return (
    <>
      <Badge
        className={`w-[6rem] h-7 text-xs ${
          category === selectedCategoryProp?.category //checks category which is the id of the specific badge cis equal to the current state.
            ? "bg-green-300 sm:text-sm capitalize text-white"
            : "bg-customLoginBtnColor sm:text-sm capitalize"
        }  flex justify-center  active:bg-blue-200 cursor-pointer text-gray-800 sm:w-36 sm:h-10`}
        icon={badgeIcon}
        size='sm'
        onClick={
          () => handleActiveBadge && category && handleActiveBadge(category) //checks handleActiveBadge event handler and category prop if undefined
        }
      >
        {name}
      </Badge>
    </>
  );
}
export default BadgeComponent;
