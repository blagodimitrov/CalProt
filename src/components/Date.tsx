function CurrentDate () {
    return(
    <p className="Date">{new Date().toLocaleDateString()}</p>
)
}

export default CurrentDate;