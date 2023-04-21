import React, {useState} from "react";
import LoginModal from "../components/LoginModal"
import Modal from "react-modal"
import { close } from "../utils/Icons"


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "200px",
        backgroundColor: "rgb(31, 29, 29)",
      },
  };
  
  
Modal.setAppElement("#root")

function Login() {
    const [modalIsOpen, setIsOpen] = useState(false);
      
    function openModal() {
          setIsOpen(true);
    }
      
    function closeModal() {
        setIsOpen(false);
    }

  return (
    <div className="absolute top-0 right-0 mr-20">
            <button
                onClick={openModal}> Login
            </button>

            <Modal 
                isOpen={modalIsOpen} 
                style={customStyles}
                overlayClassName="modal-overlay"
                onRequestClose={closeModal}>
                     
                     <button 
                     className="float-right"
                     onClick={closeModal}> {close} </button>
                    
                    <LoginModal onClose={closeModal} />
            
            </Modal>

    </div>
  )}


export default Login;
