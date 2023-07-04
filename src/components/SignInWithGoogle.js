import React from 'react'

const SignInWithGoogle = (props) => {
  const handleSignInWithGoogleClick = () => {
    window.open("https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=4424322079-ejm6s550hm5r76v1shsktpag2frir52f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth2callback",  "_self");
  }
  return (
    <>
    <div className='container' style={{textAlign: "center"}} >
<button type="button" className="login-with-google-btn" onClick={handleSignInWithGoogleClick} >
  {props.location} in with Google
</button>
</div>
  </>)
}

export default SignInWithGoogle;
