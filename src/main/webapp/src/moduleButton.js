import React, {Fragment, useState} from 'react';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-modal";

function ModuleButton(props) {
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
    return (
        <Fragment>
            <Modal isOpen={modalIsOpenEdit}>

                <div className="custom-modal">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{props.name}</p>
                        <button className="delete" aria-label="close" onClick={() => setModalIsOpenEdit(false)}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="image-box">
                            <img src="../images/code1 (2).jpg" alt=""/>
                        </div>
                        <div className="modal-details">
                            <div className="module-title-tag">
                                <h2 className="title is-4">{props.name}</h2>
                                <span className="tag is-info">{props.code}</span>
                            </div>
                        </div>
                    </section>

                </div>
            </Modal>
            <Tooltip title={props.title} aria-label={props.title} arrow>
                <Button className="card-footer-item" onClick={() => setModalIsOpenEdit(true)}><i
                    className="material-icons-outlined">{props.icon}</i></Button>
            </Tooltip>
        </Fragment>
    );
}

export default ModuleButton;