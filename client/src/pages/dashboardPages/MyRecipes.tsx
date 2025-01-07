import { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";
import { categoryStateType } from "../../types/InputProps";

function MyRecipes() {
  /** @selectedcategory state that contains data for the BadgeComponent */
  const [selectedCategory, setSelectedCategory] = useState({ category: "" });

  const handleActiveBadge: React.MouseEventHandler<HTMLOrSVGElement> = (
    str: string
  ) => {
    setSelectedCategory({
      ...selectedCategory,
      category: str,
    });
  };

  return (
    <section className='flex justify-center gap-4 mt-2 flex-wrap'>
      <BadgeComponent
        category={"beef"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
      />
      <BadgeComponent
        category={"pork"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
      />
      <BadgeComponent
        category={"fish"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
      />
      <BadgeComponent
        category={"vegetarian"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
      />
      <BadgeComponent
        category={"dessert"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
      />
    </section>
  );
}
export default MyRecipes;
