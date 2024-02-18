const SignUp = () => {

    return(
        <div>
        <h1>This is the Sig page</h1>


        <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <br />
                <input type="submit" value="Create Account" />
            </form>
</div>
    )
}

export default SignUp;