import Modal from "react-modal"
import { useForm } from 'react-hook-form'
import { useEffect, useImperativeHandle } from 'react'

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#0f172a",
        width: "50%"
    }
}

const CreateModal = ({ modalIsOpen, closeModal, onSubmitCreate, createModalRef, isCreate, onSubmitEdit, itinerarieToEdit }) => {
    const defaultValues = {
        title: '',
        description: '',
        route: [],
        _id: ""
    }
    const { register, handleSubmit, formState: { errors, isValid, touchedFields }, reset, setValue } = useForm({
        defaultValues,
        mode: "onBlur"
    })

    // set the input values if the modal is in edit mode
    useEffect(() => {
        if (itinerarieToEdit) {
            setValue("title", itinerarieToEdit.title)
            setValue("description", itinerarieToEdit.description)
            setValue("route", itinerarieToEdit.route)
            setValue("_id", itinerarieToEdit._id)
        }
    }, [itinerarieToEdit])

    // reset the input if the modal is closed
    const onModalClose = () => {
        reset(defaultValues)
        closeModal()
    }

    // submit the form - call the create or the edit function
    const onSubmit = (data) => {
        if (isCreate) {
            onSubmitCreate(data)
        } else {
            onSubmitEdit(data)
        }
    }

    // after success API call set the input fields to default value
    useImperativeHandle(createModalRef, () => ({
        resetForm() {
            reset(defaultValues)
        }
    }))

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={onModalClose}
                contentLabel={"Create itinerarie"}
                style={customStyles}
                ariaHideApp={false}
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2 text-slate-50">
                    Create itinerarie
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="text-slate-50 text-left mb-1" htmlFor="title">
                            Title
                        </label>
                        <input id="title" type="text" name="title" placeholder="Title" className={`p-4 border-solid rounded-lg focus:border-white ${touchedFields["title"]
                            ? errors["title"]
                                ? 'bg-red-100'
                                : 'bg-green-100'
                            : `bg-slate-800 text-slate-100 placeholder:text-slate-400`
                            }`} {...register("title", { required: true, maxLength: { value: 100, message: "Maximum 100 characters in this field!" } })} />
                        {errors.title && errors.title.message &&
                            <label className="text-red-500 mt-1">
                                {errors.title.message}
                            </label>}

                        
                        <label className="text-slate-50 text-left mb-1 mt-4" htmlFor="description">
                            Description
                        </label>
                        <textarea rows={10} id="description" placeholder="Description" className={`p-4 border-solid rounded-lg focus:border-white ${touchedFields["description"]
                            ? errors["description"]
                                ? 'bg-red-100'
                                : 'bg-green-100'
                            : `bg-slate-800 text-slate-100 placeholder:text-slate-400`
                            }`} {...register("description", { required: true, maxLength: { value: 2000, message: "Maximum 2000 characters in this field!" } })} />
                        {errors.description && errors.description.message &&
                            <label className="text-red-500 mt-1">
                                {errors.description.message}
                            </label>}

                        <button disabled={!isValid} type="submit" className="bg-green-600 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded-full mb-4 mt-4">
                            {isCreate ? "Create" : "Edit"}
                        </button>
                        <button onClick={onModalClose} className="bg-red-400 text-white font-bold py-2 px-4 rounded-full">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreateModal