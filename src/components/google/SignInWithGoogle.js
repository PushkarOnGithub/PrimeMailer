import React from 'react'

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const SignInWithGoogle = (props) => {
	const handleSignInWithGoogleClick = () => {
		window.open(`${SERVER_HOST}/auth/google/login`, "_self");
	}
	return (
		<>
			<div className='container' style={{ textAlign: "center" }} >
				<button type="button" className="login-with-google-btn" onClick={handleSignInWithGoogleClick} >
					{props.location} in with Google
				</button>
			</div>
		</>
	)
}

export default SignInWithGoogle;
