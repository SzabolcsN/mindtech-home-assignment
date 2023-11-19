import Modal from "react-modal"

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
}

const DeleteModal = ({ title, modalIsOpen, closeModal, confirmedDelete, id }) => {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={title}
                style={customStyles}
                ariaHideApp={false}
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
                    Are you sure want to delete:
                    <span className="text-red-500">
                    &nbsp;{title}&nbsp;
                    </span> ?</h1>
                <button onClick={() => confirmedDelete(id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-4">
                    Delete
                </button>
                <button onClick={closeModal} className="bg-slate-400 text-white font-bold py-2 px-4 rounded-full">
                    Cancel
                </button>
            </Modal>
        </div>
    );
}

export default DeleteModal;