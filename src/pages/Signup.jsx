import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import videoBg2 from '../video/vid2.mp4'
import { useGlobalContext } from "../hooks/useGlobalContext"
import Button from "../components/Button"


function Signup() {
  const displayName = useRef()
  const email = useRef()
  const password = useRef()
  const { isPending } = useGlobalContext()
  const { signUpWithGoogleProvider, signup } = useSignup()

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signUpWithGoogleProvider()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(displayName.current.value, email.current.value, password.current.value)
  }
  return (
    <div className="h-screen grid place-items-center">
      <video className="w-full h-full object-cover" src={videoBg2} autoPlay loop muted/>
      <div className=" bg-emerald-400 py-10 px-10 rounded-lg absolute">
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-10">
            <label className="mr-5" htmlFor="username">Name: </label>
            <input ref={displayName} type="text" placeholder="Type your username" id="username" className="input input-bordered input-primary w-full max-w-xs" required />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5" htmlFor="username">Email: </label>
            <input ref={email} type="email" placeholder="Type your username" id="username" className="input input-bordered input-primary w-full max-w-xs" required />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5" htmlFor="password">Password</label>
            <input ref={password} type="password" id="password" placeholder="Type your password" className="input input-bordered input-error w-full max-w-xs" required />
          </div>
          <div className="flex flex-col gap-3">
            {!isPending && <Button text={"Login"} disabled={false} />}
            {isPending && <Button text={"Loading..."} disabled={true} />}
            <button onClick={handleGoogleLogin} className="btn btn-sm md:btn-md btn-neutral">Google</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup