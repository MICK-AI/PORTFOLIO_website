import React from 'react'
import { Toaster, toast } from 'react-hot-toast'

const MessageToaster = ({ message, type }) => {
    React.useEffect(() => {
        if (message) {
            if (type === 'success') {
                toast.success(message)
            } else if (type === 'error') {
                toast.error(message)
            } else {
                toast(message)
            }
        }
    }, [message, type])

    return <Toaster position="top-center" reverseOrder={false} />
}

export default MessageToaster
