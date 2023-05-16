import React, {useState} from "react";
import SignupModal from "../components/SignupModal"
import Modal from "react-modal"
import { close } from "../utils/Icons"
import Auth from "../utils/auth"

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        height: "280px",
        backgroundColor: "rgb(31, 29, 29)",
      },
  };
  
  
Modal.setAppElement("#root")

function Signup() {
    const [modalIsOpen, setIsOpen] = useState(false);
      
    function openModal() {
          setIsOpen(true);
    }
      
    function closeModal() {
        setIsOpen(false);
    }

const isLoggedIn = Auth.loggedIn();
// flex justify-end
  return (
    <div className="absolute top-5 right-0">
        {isLoggedIn ? null :
    <div className="flex justify-end">
            <button 
                className="mr-24"
                onClick={openModal}> Signup
            </button>
          </div>    
        }
            <Modal 
                isOpen={modalIsOpen} 
                style={customStyles}
                overlayClassName="modal-overlay"
                onRequestClose={closeModal}>
                     
                     <button 
                     className="float-right"
                     onClick={closeModal}> {close} </button>
                    
                    <SignupModal onClose={closeModal} />
            
            </Modal>

    </div>
  )}


export default Signup;