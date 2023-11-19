import { useEffect } from "react"

import { ReactComponent as Close } from '../images/close.svg'

const Alert = ({ alertMessage, showAlert, setShowAlert, isSuccessAlert }) => {
    // success alert disapear after 5s
    useEffect(() => {
        if (showAlert && isSuccessAlert) {
            setTimeout(() => {
                setShowAlert(false)
            }, 5000);
        }
    }, [showAlert])

    return (
        <>
            {showAlert &&
                <div className={`${isSuccessAlert ? "bg-green-50 text-green-700" : "bg-red-100 text-red-700" } px-4 py-3 rounded relative md:w-1/2 text-center mx-auto`} role="alert">
                    <span className="block sm:inline">{alertMessage}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <button onClick={() => setShowAlert(false)}>
                            <Close className="h-6 w-6 float-right" />
                        </button>
                    </span>
                </div>
            }
        </>
    )
}

export default Alert;