import { isRouteErrorResponse, Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let errorStatus: number | undefined; //define a number or undefined variable that will contain the error status
  /** type check error */
  if (isRouteErrorResponse(error)) {
    //error is a route error
    errorStatus = error?.status;
  } else {
    console.log("Unknown error");
  }

  return (
    <section className='w-screen h-screen flex flex-col justify-start items-center p-3 sm:justify-center'>
      {errorStatus === 404 ? (
        <>
          <h1 className='text-[3rem] text-center font-rubik'>Page Not Found</h1>
          <img src='../src/assets/error.png' alt='' />
        </>
      ) : (
        <p>Something went wrong</p>
      )}

      <Link
        to='/'
        className='pointer text-customLoginBtnColorDark text-lg mt-6 sm:text-[1.5rem] sm:p-8'
      >
        Back to home
      </Link>
    </section>
  );
}
export default ErrorPage;
