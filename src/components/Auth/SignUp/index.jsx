function SignUp(props){
  return (
      <div className="loginCont">
          <h2>Partiya</h2>
          <p>Register</p>
          <form className="authForm" onSubmit={props.submitHandler}>
              <input
                  onChange={props.changeHandler}
                  type="text"
                  name="nickname"
                  placeholder="Enter a username"
                  required
              />
              <input
                  onChange={props.changeHandler}
                  type="email"
                  name="email"
                  placeholder="example123@email.com"
                  required
              />
              <input
                  onChange={props.changeHandler}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
              />
              <button type="submit">Create Account</button>
          </form>
      </div>
  )
}

export default SignUp;