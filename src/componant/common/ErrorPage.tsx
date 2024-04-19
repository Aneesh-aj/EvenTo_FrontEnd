

function ErrorPage(){
    return (
      <>
   <section className="page_404 bg-white py-10 font-arvo">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-10/12 text-center">
              <div className="four_zero_four_bg bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}>
                <h1 className="text-6xl text-white">404</h1>
              </div>
  
              <div className="contant_box_404 mt-10">
                <h3 className="text-6xl font-bold mb-4">Looks like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <a href="/" className="link_404 inline-block mt-4 px-8 py-4 bg-green-500 text-white rounded-md">Go to Home</a>
              </div>
            </div>
          </div>
        </div>
      </section>    </>
    )
  }
  
  export default ErrorPage