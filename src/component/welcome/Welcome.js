import React,{useCallback} from 'react';
import image from '../../assest/welcome-banner.jpg'
import '../welcome/Welcome.css';
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();
    const text = "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.";
    const author = "George R.R. Martin";

    const backgroundImage = {
        backgroundImage: `url(${image})`, // Update the path to your image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh', // Adjust as needed
        width: '100vw'
      };

      if (keycloak?.authenticated){
        navigate('/home');
      }

      const login = useCallback(() => {
        keycloak?.login();
      }, [keycloak])

      
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6" style={{margin:"auto",width:"50%"}}>
                    <div className="row" style={{display:"block",textAlign:"center"}}>
                        <div>
                            WELCOME TO WISH BOOKS COLLECTION
                        </div>
                    </div>
                    <div className="row quote">
                    <blockquote>"{text}"</blockquote>
                    <p className="author">- {author}</p>
                    </div>
                    <div className="form-group" style={{textAlign:"center"}}>
                                  <button className="bottom-button btn btn-outline-primary"
                                  type="button"
                                  onClick={() => login()}
                                >
                                  Login
                                </button>
                            </div>
                </div>
                <div className="col-lg-6 col-md-6" style={backgroundImage}>
                </div>
            </div>
        </div>
    );
}

export default Welcome;