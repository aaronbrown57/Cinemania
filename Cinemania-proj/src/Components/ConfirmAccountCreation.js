const ConfirmAccountCreation = () => {

    // in the future will need a number generator to randomly generate 4 digit numbers
    //  but for now this is good

    return (
        
        <div className="confirmationDiv">
            <h1>Thank you valued user for creating your account</h1>
            <h4>Please confirm the 4 digit code sent to your email</h4>
            <form>
                <label htmlFor="code">Enter 4 digit code:</label>
                <input type="number" name="code" />
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}  
export default ConfirmAccountCreation;