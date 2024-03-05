import logo from "../../assets/logo.png"
const Footer = () => {
    return (
        <div className="border-b  text-gray-1000 text-m">
    
        <div className="border-b text-center text-gray-1000 ">
      
    
        <div className="mt-24 ">Contatti:</div>
        
        <div className="flex  items-center justify-center gap-2">
            <a href="https://www.linkedin.com/in/vincenzo-melillo-developer/" target="_blank" rel="noopener noreferrer">
                LinkedIn
            </a>
            <a href="https://github.com/Vince-mel" target="_blank" rel="noopener noreferrer">
                Github
            </a>
        </div>
    
        <div className="mt-1 mb-7">
        <p>copyright&copy;Vincenzo M.</p>
        <div className="flex items-center justify-center"> 
        <img src={logo} className=" w-[80px] mr-3" alt="" />
      <span>
       <b> Made with ❤️ by  with React.js</b>
      </span>
      
      <img src={logo} alt="" className=" w-[80px] mr-3"/>
      </div>
    
        </div>  
     
        </div> 
        </div>
    
      
    );
};

export default Footer;


    
