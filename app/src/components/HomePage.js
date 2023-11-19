import { useState, useEffect, useRef } from "react"

import { ReactComponent as ArrowUp } from '../images/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../images/arrow-down.svg'
import { ReactComponent as Delete } from '../images/delete.svg'
import { ReactComponent as Plus } from '../images/plus.svg'
import { ReactComponent as Edit } from '../images/edit.svg'
import Pagination from "./Pagination"
import DeleteModal from "./DeleteModal"
import CreateModal from "./CreateEditModal"
import Alert from "./Alert"

// Page title component
const Head = () => {
    return (
        <div className="flex flex-col items-center mx-auto mb-10 md:mb-12 lg:mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2">
                Travel Planner
            </h1>
            <h2 className="text-1xl md:text-2xl lg:text-3xl">
                Me And My Travel.
            </h2>
        </div>
    )
}

const ItinerarieList = ({ itemList, deleteItem, openCreateModal }) => {
    return (
        <div>
            {itemList.length > 0 &&
                <div>
                    {itemList.map((item) => {
                        return (
                            <ItinerarieContent
                                item={item}
                                key={item._id}
                                deleteItem={deleteItem}
                                openCreateModal={openCreateModal}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

const ItinerarieContent = ({ item, deleteItem, openCreateModal }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false)
    const hasDetails = item.description.length > 200

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function confirmedDelete(id) {
        deleteItem(id)
        closeModal()
    }
    return (
        <div className="mb-6 last:mb-0">
            <DeleteModal
                modalIsOpen={modalIsOpen}
                title={item.title} id={item._id}
                openModal={openModal}
                closeModal={closeModal}
                confirmedDelete={confirmedDelete}
            />
            {detailsOpen &&
                <div className="text-center mb-6">
                    <hr />
                </div>
            }
            {hasDetails &&
                <button onClick={() => setDetailsOpen(!detailsOpen)} className="float-right md:mt-4">
                    {!detailsOpen &&
                        <ArrowDown className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                    }
                    {detailsOpen &&
                        <ArrowUp className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                    }
                </button>
            }
            <div className="flex flex-row">
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
                    {item.title}:
                </h1>
                &nbsp;
                <h2 className="text-1xl md:text-2xl lg:text-3xl mb-2">
                    <span className="inline-block align-middle">
                        {item.route.map((route, index) => {
                            if (index + 1 !== item.route.length) {
                                return `${route} - `
                            }
                            return route
                        })}
                    </span>
                </h2>
                <button onClick={() => openCreateModal(item)} className="ml-4 mt-2 md:mt-3 bg-blue-400 h-6 w-6 group inline-flex items-center justify-center rounded-full">
                    <Edit className="h-6" />
                </button>
                <button onClick={openModal} className="ml-4 mt-2 md:mt-3 bg-red-400 h-6 w-6 group inline-flex items-center justify-center rounded-full">
                    <Delete className="h-6" />
                </button>
            </div>

            {!detailsOpen &&
                <p className="text-xl lg:text-2xl">
                    {hasDetails ? `${item.description.substring(0, 200)}...` : item.description}
                </p>
            }
            {detailsOpen &&
                <>
                    <p className="text-xl lg:text-2xl text-slate-800 dark:text-slate-200">
                        {item.description}
                    </p>
                    <div className="text-center mt-6">
                        <hr />
                    </div>
                </>
            }
        </div>
    )
}



export default function HomePage() {
    // eslint-disable-next-line no-undef
    const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE
    const backendApiUrl = process.env.REACT_APP_BACKEND_API_URL
    const [itinerarieList, setItinerarieList] = useState([])
    const [itemList, setItemList] = useState([])
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(itinerarieList.length / itemsPerPage))
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [isSuccessAlert, setIsSuccessAlert] = useState(true)
    const [isCreate, setIsCreate] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [itinerarieToEdit, setItinerarieToEdit] = useState({})

    const createModalRef = useRef()

    // update page index and set the new page elements
    const changePage = (pageIndex) => {
        setCurrentPageIndex(pageIndex)
        const limitedItems = itinerarieList.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)
        setItemList([...limitedItems])
    }

    // error handling
    const errorHandling = (error) => {
        console.log(error)
        setIsSuccessAlert(false)
        setAlertMessage(error?.message || "Something went wrong")
        setShowAlert(true)
    }

    // fetch all element and set to the "itinerarieList" state variable
    const fetchItineraries = () => {
        try {
            console.log(backendApiUrl)
            // eslint-disable-next-line no-undef
            fetch(backendApiUrl)
                .then((response) => response.json())
                .then((items) => {
                    setItinerarieList([...items])
                })
        } catch (error) {
            errorHandling(error)
        }
    }

    // on page load call fetchItineraries function
    useEffect(() => {
        fetchItineraries()
    }, [])

    // itinerarie list changed
    useEffect(() => {
        let newList = itinerarieList

        // update state
        setNumberOfPages(Math.ceil(newList.length / itemsPerPage))
        const limitedItems = newList.slice(0, itemsPerPage)
        setItemList([...limitedItems])
        setCurrentPageIndex(1)
    }, [itinerarieList])


    // delete element
    const deleteItem = (id) => {
        try {
            // eslint-disable-next-line no-undef
            fetch(`${backendApiUrl}/${id}`, { method: 'DELETE' })
                .then(() => {
                    // search the deleted element local and remove it
                    // so no need to fetch the whole list again
                    const list = itinerarieList
                    const deletedItemIndex = list.findIndex((element) => id = element._id)
                    if (deletedItemIndex > -1) {
                        list.splice(deletedItemIndex, 1)
                        setItinerarieList([...list])
                    }
                })
        } catch (error) {
            errorHandling(error)
        }
    }

    // create new itinerarie
    const onSubmitCreate = (data) => {
        try {
            // eslint-disable-next-line no-undef
            fetch(backendApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => {
                // have to fetch the itinerarie list again for get the new element _id
                // if the user want to edit the currently added itinerarie without refresh
                // eslint-disable-next-line no-undef
                fetchItineraries()
                createModalRef.current.resetForm()
                setAlertMessage(`Success add`)
            })
        } catch (error) {
            errorHandling(error)
        }
    }

    // edit a itinerarie
    const onSubmitEdit = (data) => {
        try {
            const id = data._id
            delete data._id
            // eslint-disable-next-line no-undef
            fetch(`${backendApiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => {
                // search the edited element in the state
                // update that element and set the state
                // no need to fetch the whole itinerarie list again
                const newList = itinerarieList
                const editItemIndex = newList.findIndex((element) => data._id = element._id)
                if (editItemIndex > -1) {
                    newList[editItemIndex] = data
                    data._id = id
                    setItinerarieList([...newList])
                    createModalRef.current.resetForm()
                    closeModal()
                    setAlertMessage(`Success update`)
                    setIsSuccessAlert(true)
                    setShowAlert(true)
                    setItinerarieToEdit({})
                }
            })
        } catch (error) {
            errorHandling(error)
        }
    }

    function openModal(item) {
        if (item && item._id) {
            setItinerarieToEdit(item)
            setIsCreate(false)
        } else {
            setIsCreate(true)
        }
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
        setItinerarieToEdit({})
    }

    return (
        <div className="mt-8 md:mt-12 pb-20">
            <div className="grid grid-cols-1">
                <div>
                    <Head />
                </div>
                <div>
                    <Alert
                        showAlert={showAlert}
                        alertMessage={alertMessage}
                        setShowAlert={setShowAlert}
                        isSuccessAlert={isSuccessAlert}
                    />
                </div>
                <div className="mb-6">
                    <CreateModal
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        onSubmitCreate={onSubmitCreate}
                        onSubmitEdit={onSubmitEdit}
                        isCreate={isCreate}
                        itinerarieToEdit={itinerarieToEdit}
                        createModalRef={createModalRef}
                    />
                    <button onClick={openModal} className="md:mt-3 bg-green-500 group inline-flex items-center justify-center rounded-full">
                        <Plus className="h-10 w-10" />
                    </button>
                </div>
                <div>
                    <ItinerarieList itemList={itemList} deleteItem={deleteItem} openCreateModal={openModal} />
                </div>
                {itinerarieList.length > itemsPerPage &&
                    <div>
                        <Pagination
                            numberOfPages={numberOfPages}
                            currentPageIndex={currentPageIndex}
                            changePage={changePage}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
