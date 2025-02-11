import SubCategory from "./subCategoryModal";
export default interface Category {
    _id: string;
    name: string;
    description: string;
    image: string;
    subCategories: SubCategory[];
};