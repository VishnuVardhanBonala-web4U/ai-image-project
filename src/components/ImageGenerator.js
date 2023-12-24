import React, { useState } from "react";
import "../components/ImageGenerator.css"
import ReactPlayer from "react-player";

function ImageGenerator()
{

  const [searchQuery, setSearchQuery] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [ loading, setloading ] = useState( false )
  
  const handleSearch = () => {
    // Your fetch code here
    setloading( true )
    setGeneratedImage(null)
    fetch( "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
 {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ inputs: searchQuery.trim() }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        setGeneratedImage( URL.createObjectURL( blob ) );
          setloading(false)
      } );
  
  };

  const handleDownload = () => {
  if (generatedImage) {
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = "generated_image.png"; // Set the desired file name
    a.click();
  }
  };

  return (
   

    <div className="App">   
   

      <h1 className="shadow m-3 rounded-5 text-light"> AI Image Generator  </h1> 
      <div className="search-container">
        <input
          type="text"
          placeholder="Type what you want"
          value={searchQuery}
          onChange={ ( e ) => setSearchQuery( e.target.value ) }
          className="container shadow search_bar"
        />
        
        { !searchQuery ? (
          <div>
            <h5 className="alert_message container shadow p-2 text-light  rounded-5 mt-3 ">I need Query Fast!</h5>
          </div>
           ) : (
            <>
  <button onClick={handleSearch} className="submit_btn shadow btn btn-success p-2">
    Search
              </button>
              

              { generatedImage !== null ?( <button onClick={handleDownload} className="download_btn btn btn-info p-2 mx-3 text-light">Download</button>)
                : "" }
            </>
            
)}

        
      </div>
      <div className="image-container d-flex justify-content-center align-items-center">
      
        { loading && loading ? ( <>
          
          
       <button className="btn btn-danger w-50 m-5" type="button" disabled>
  <span className="spinner-border spinner-border-sm mx-2 " role="status" aria-hidden="true" />
  Loading...
</button>


        </>
        ) : ( "" ) }
        


        
        { generatedImage && (
          <div className="generated-image-box ">
            <img src={ generatedImage } alt="Image Not Found" className=" image_size shadow m-4  card-body card  "  />
            
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
