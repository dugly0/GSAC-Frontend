import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";
import React, { useState } from "react";
import SignUpModal from "./assets/components/signUpModal/SignUpModal";
import PassRecoveryModal from "./assets/components/passRecoveryModal/PassRecoveryModal";

export default function AccountServices() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPassRecoveryModal, setShowPassRecoveryModal] = useState(false);

  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleClosePassRecoveryModal = () => setShowPassRecoveryModal(false);

  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
    setShowPassRecoveryModal(false); // Certifique-se de fechar o modal de recuperação de senha
  };

  const handleOpenPassRecoveryModal = () => {
    setShowPassRecoveryModal(true);
    setShowSignUpModal(false); // Certifique-se de fechar o modal de cadastro
  };

  return (
    <div className="container-md text-center">
      <div className="row justify-content-center">
        <div className="col-md-4 mt-2 mb-2">
          <button className="btn btn-link" onClick={handleOpenPassRecoveryModal}>
            Esqueceu a senha?
          </button>
        </div>
        <div className="col-md-4 mt-2 mb-2">
          <button className="btn btn-link" onClick={handleOpenSignUpModal}>
            Deseja se cadastrar?
          </button>
        </div>
        <hr className="small-margin"></hr>
      </div>
      <SignUpModal isShow={showSignUpModal} handleClose={handleCloseSignUpModal} />
      <PassRecoveryModal isShow={showPassRecoveryModal} handleClose={handleClosePassRecoveryModal} />
    </div>
  );
}
