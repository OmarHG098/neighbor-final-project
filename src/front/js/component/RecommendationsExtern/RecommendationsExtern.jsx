import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPerson, faMobileRetro } from "@fortawesome/free-solid-svg-icons";

const RecommendationsExtern = ({ shopName, phone, name, lastname, numIndex }) => {
    const whatsappLink = `https://wa.me/${phone}`;
    return (
        <>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapseOne-${numIndex}`}
                        aria-expanded="false"
                        aria-controls={`panelsStayOpen-collapseOne-${numIndex}`}>
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        {shopName}
                    </button>
                </h2>
                <div
                    id={`panelsStayOpen-collapseOne-${numIndex}`}
                    class="accordion-collapse collapse"
                    data-bs-parent={`#accordionPanelsStayOpenExample${numIndex}`}>
                    <div class="accordion-body">
                        <ul>

                            <li>
                                <FontAwesomeIcon icon={faPerson} className="me-2" />
                                {name} <span> {lastname}</span></li>
                            <li>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faMobileRetro} />
                                    <span>
                                        {phone}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RecommendationsExtern;