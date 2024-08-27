import React from "react";
import "../../../styles/inputPhone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPerson, faMobileRetro } from "@fortawesome/free-solid-svg-icons";

const ModalBodyRecommendation = ({ recommendations, user }) => {
    // console.log("recomendations", recommendations)
    if (!recommendations) return null
    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
                            Recomendaciones de {user.name} <span> - {user.role.toLowerCase()}</span>
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {recommendations.map((recommendation) => {
                            const whatsappLink = `https://wa.me/${recommendation.phone}`;
                            return (
                                <div key={recommendation.id}>
                                    <ul>
                                        <li className="text-white">
                                            <FontAwesomeIcon icon={faBriefcase} className="me-2 text-white" />
                                            {recommendation.shopName}
                                        </li>
                                        <li className="text-white">
                                            <FontAwesomeIcon icon={faPerson} className="me-2 text-white" />
                                            {recommendation.name} <span></span> {recommendation.lastname}
                                        </li>
                                        <li className="text-white">
                                            <a
                                                href={whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faMobileRetro} />
                                                <span>
                                                    {recommendation.phone}
                                                </span>
                                            </a>
                                        </li>
                                        <hr />
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalBodyRecommendation;

