const Notification = ({message, vari}) => {

    if(message === null) return null

    const notifStyle = {
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 10,
        color: `${vari}`,
        fontSize: 20
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}

export default Notification