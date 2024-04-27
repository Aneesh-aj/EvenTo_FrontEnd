import { useEffect, useState } from "react"
import Nav from "../../componant/common/Nav"
import { editCategory, getCategory } from "../../api/admin"
import { Divider, FormControlLabel, Switch } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryModal } from "../../componant/admin/categoryModal";






export const CategoryPage: React.FC = () => {
    const [allCategory, setAllcategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [categoryData, setCategoryData] = useState({ id: '', category: "" })

    useEffect(() => {
        async function getCategorys() {
            const response = await getCategory()
            console.log(response)
            setAllcategory(response.category)
        }
        getCategorys()
    }, [])

    //   async  function Edit(id:string,category:string){
    //         const result = await editCategory(id,category)
    //     }

    function handleModal(id: string, category: string) {
        setCategoryData({ id: id, category: category })
        setIsModalOpen(true)
        return
    }
    function hangleCloseModal() {
        setIsModalOpen(false)
    }
    const updateAllCategory = (updatedCategories: any[]) => {
        setAllcategory(updatedCategories);
    };
    

    return (
        <> <Nav />
            <div className="w-full flex flex-col ps-2 pe-2  items-center gap-2  auto pt-20">
                <div className="w-full border-2 rounded-md bg-white ">
                    <h1 className="font-extrabold p-5">Categorys</h1>
                </div>
                <div className="w-full h-[80rem] flex flex-col border-2 p-20 rounded-md bg-white">
                    <div className="w-full p-2 flex">
                        <ul className="flex justify-around w-[70%]  pe-16">
                            <li>category</li>
                            <li>id</li>
                        </ul>
                        <ul className="w-[20%]   flex justify-around">
                            <li>edit</li>
                            <li>delete</li>
                            <li>active</li>
                        </ul>
                    </div>
                    <Divider variant="middle" />
                    <CategoryModal isOpen={isModalOpen} onClose={hangleCloseModal} categoryData={categoryData} onEditSuccess={updateAllCategory} />

                    {
                        allCategory && allCategory.map((elem: any) => {
                            return (
                                <>
                                    <div className="w-full p-2 h-16 items-center flex">
                                        <ul className="flex justify-around w-[70%]   ">
                                            <li>{elem?.category}</li>
                                            <li>{elem?._id}</li>
                                        </ul>
                                        <ul className="w-[20%]  items-center   flex justify-around">
                                            <li onClick={() => handleModal(elem?._id, elem?.category)}><EditIcon /></li>
                                            <li><DeleteIcon /></li>
                                            <li> <Switch checked={elem?.active} />  </li>
                                        </ul>
                                    </div>
                                    <Divider variant="middle" />
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}