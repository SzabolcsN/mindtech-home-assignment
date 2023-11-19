// Format error messages from mongodb to send to the FE for the user
module.exports = (errors) => {
    const messageKeys = Object.keys(errors);
    const messages = messageKeys.map((key) => errors[key].message)
    return messages.join(", ")
}