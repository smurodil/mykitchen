import { useLogin } from "../hooks/useLogin"
import { useSignup } from "../hooks/useSignup"
import { useRef } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import Button from "../components/Button"
import videoBg from '../video/vid.mp4'


function Login() {
  const { signUpWithGoogleProvider } = useSignup()
  const { login } = useLogin()

  const email = useRef()
  const password = useRef()
  const { isPending } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email.current.value, password.current.value)
  }
  return (
    <div className="h-screen grid place-items-center top-0">
      <video className="w-full h-full object-cover" src={videoBg} autoPlay loop muted/>
      <div className="bg-slate-400 py-10 px-10 rounded-lg absolute">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-10">
            <label className="mr-5" htmlFor="email">Email: </label>
            <input ref={email} type="text" placeholder="Type here " id="email" className="input input-bordered input-primary w-full max-w-xs" required />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5" htmlFor="password">Password</label>
            <input ref={password} type="password" id="password" placeholder="Type your password" className="input input-bordered input-error w-full max-w-xs" required />
          </div>
          <div className="flex flex-col gap-3">

            {!isPending && <Button text={"Login"} disabled={false} />}
            {isPending && <Button text={"Loading..."} disabled={true} />}
            <button type="button" onClick={signUpWithGoogleProvider} className="btn btn-sm md:btn-md btn-accent">Google</button>
            <a className="btn btn-sm md:btn-md btn-info" href="/signup">If you do'nt have any account?</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login