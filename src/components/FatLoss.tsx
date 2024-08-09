function FatLoss () {
    const date = new Date();
    const currentMonth = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return(
        <> <div>{monthNames[currentMonth]} Fat Loss</div>
        <div className='FatLoss'>-0.25kg</div>
        <div>Total Fat Loss</div>
        <div className='FatLoss'>-0.47kg</div> </>
        
    );
}

export default FatLoss;