import { Link} from 'react-router-dom';
const Title = () => {
  


  return (
    <>
      <div className="title">
        <Link to='/profile'> <div
          role="button"
         
          className="flex align-baseline justify-end"
        >
          {/* <img
            src={icons8}
            className="w-5 h-5 mt-6"
          ></img> */}
          <h4 className="mt-5 mr-7 ml-2 text-xl ">Profile</h4>
        </div></Link>
       
        <h2 className="text-4xl">All Pictures</h2>
        <p>
          You can share your pics with rest of the world in{" "}
          <span className="login-text">Memories</span>
        </p>
      </div>
    </>
  );
};

export default Title;
