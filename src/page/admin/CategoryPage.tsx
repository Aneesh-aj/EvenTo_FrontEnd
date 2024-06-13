import React, { useEffect, useState } from "react";
import Nav from "../../componant/common/Nav";
import { editCategory, getCategory, addCategory, deleteCategory } from "../../api/admin";
import { Divider, TextField, Button, Pagination, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryModal } from "../../componant/admin/categoryModal";
import AddCategoryModal from "../../componant/admin/AddCategoryModal";
import toast from "react-hot-toast";

export const CategoryPage: React.FC = () => {
    const [allCategory, setAllcategory] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [categoryData, setCategoryData] = useState<{ id: string, category: string }>({ id: '', category: "" });
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
    const [deleteItemId, setDeleteItemId] = useState<string>("");

    const itemsPerPage = 7;

    // Fetch categories from API on component mount
    useEffect(() => {
        getCategorys();
    }, []);

    // Function to fetch categories from API
    async function getCategorys() {
        try {
            const response = await getCategory();
            setAllcategory(response.category);
            // Update total pages based on initial category list
            setTotalPages(Math.ceil(response.category.length / itemsPerPage));
        } catch (error) {
            console.error("Error fetching categories:", error);
            // Handle error here (e.g., show error message to user)
        }
    }

    // Function to handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        // Filter categories based on search query and update total pages
        const filtered = allCategory.filter(category =>
            (category.category?.toLowerCase() || "").includes(query) ||
            (category._id?.toLowerCase() || "").includes(query)
        );
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setPage(1); // Reset to the first page when searching
    };

    // Function to handle pagination change
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Function to handle opening the edit modal
    const handleModal = (id: string, category: string) => {
        setCategoryData({ id, category });
        setIsModalOpen(true);
    };

    // Function to close the edit modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle opening the add modal
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Function to close the add modal
    const handleCloseAddModal = () => {
        getCategorys(); // Refresh categories after adding
        setIsAddModalOpen(false);
    };

    // Function to handle successful addition of a category
    const handleAddSuccess = (newCategory: any) => {
        setAllcategory(prev => [...prev, newCategory]);
        setTotalPages(Math.ceil((allCategory.length + 1) / itemsPerPage));
    };

    // Function to handle deletion confirmation dialog open
    const handleOpenDeleteConfirm = (id: string) => {
        setDeleteItemId(id);
        setDeleteConfirmOpen(true);
    };

    const handleCloseDeleteConfirm = () => {
        setDeleteItemId("");
        setDeleteConfirmOpen(false);
    };

    // Function to handle delete category operation
    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(deleteItemId);
            toast.success("category deleted")
            setAllcategory(prev => prev.filter(category => category._id !== deleteItemId));
            setTotalPages(Math.ceil((allCategory.length - 1) / itemsPerPage));
            setDeleteItemId("");
            setDeleteConfirmOpen(false);
        } catch (error) {
            console.error("Error deleting category:", error);
            // Handle error here (e.g., show error message to user)
        }
    };

    // Calculate paginated categories based on search query and current page
    const paginatedCategories = allCategory
        .filter(category =>
            (category.category?.toLowerCase() || "").includes(searchQuery) ||
            (category._id?.toLowerCase() || "").includes(searchQuery)
        )
        .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <>
            <Nav />
            <div className="w-full flex flex-col ps-2 pe-2 items-center gap-2 auto pt-20">
                <div className="w-full border-2 rounded-md bg-white ">
                    <h1 className="font-extrabold p-5">Categories</h1>
                </div>
                <div className="w-[80%] h-auto flex flex-col border-2 p-10 rounded-md ">
                    <div className="w-full p-2 flex justify-between">
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
                            Add Category
                        </Button>
                    </div>
                    <div className="w-full p-2 flex">
                        <ul className="flex justify-around w-[70%] pe-16">
                            <li>Category</li>
                            <li>ID</li>
                        </ul>
                        <ul className="w-[20%] flex justify-around">
                            <li>Edit</li>
                            <li>Delete</li>
                        </ul>
                    </div>
                    <Divider variant="middle" />
                    <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} categoryData={categoryData} onEditSuccess={getCategorys} />
                    <AddCategoryModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAddSuccess={handleAddSuccess} />
                    {
                        paginatedCategories.map((elem: any) => (
                            <div key={elem._id} className="w-full p-2 h-16 items-center flex">
                                <ul className="flex justify-around w-[70%]">
                                    <li>{elem?.category}</li>
                                    <li>{elem?._id}</li>
                                </ul>
                                <ul className="w-[20%] items-center flex justify-around">
                                    <li onClick={() => handleModal(elem._id, elem.category)}><EditIcon /></li>
                                    <li onClick={() => handleOpenDeleteConfirm(elem._id)}><DeleteIcon /></li>
                                </ul>
                            </div>
                        ))
                    }
                    <Divider variant="middle" />
                    <div className="mt-4">
                        <Stack spacing={2} direction="row" justifyContent="center">
                            <Pagination count={totalPages} page={page} onChange={handleChangePage} />
                        </Stack>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteConfirm}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this category?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCategory} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CategoryPage;
