function SignUp(props){
  return (
      <div className="loginCont">
        <div className="headings">
          <h2>Partiya</h2>
          <p>Plan with us!</p>
        </div>
          <form className="authForm" onSubmit={props.submitHandler}>
              <label htmlFor="nickname"><i class="bi bi-person-fill"></i> Username</label>
              <input
                  onChange={props.changeHandler}
                  type="text"
                  name="nickname"
                  placeholder="Enter a username"
                  required
              />
              <label htmlFor="email"><i class="bi bi-envelope-at-fill"></i> Email</label>
              <input
                  onChange={props.changeHandler}
                  type="email"
                  name="email"
                  placeholder="example123@email.com"
                  required
              />
              <label htmlFor="password"><i class="bi bi-incognito"></i> Password</label>
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