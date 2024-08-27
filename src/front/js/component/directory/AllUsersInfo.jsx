import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import TagRol from "../tagRol/TagRol.jsx";
import PersonalProfileDetails from "../personalProfileDetails/PersonalProfileDetails.jsx";
import ModalButtonRecommendation from "../modalRecommendationsProfile/ModalButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dysmvst60"
  }
})

const imgCloudinary = [
  'cld-sample-3',
  'samples/cup-on-a-table',
  'samples/animals/reindeer',
  'cld-sample-2',
  'samples/balloons',
  'samples/cloudinary-group',
  'samples/imagecon-group'
]

const AllUsersInfo = ({
  role,
  nameProfile,
  lastname,
  shopName,
  buildingName,
  floor,
  email,
  phone,
  id,
  recommendation
}) => {
  const { actions } = useContext(Context)

  useEffect(() => {
    actions.getAllRecommendations()
  }, [])

  const imageIndex = parseInt(id, 10) % imgCloudinary.length;
  const selectedImageId = imgCloudinary[imageIndex]

  return (

    <div className="row w-100 rounded justify-content-center">
      <div className="col-md-4">
        <div className="card mt-5 mb-5 w-50" style={{ padding: 0, marginLeft: "40px" }}>

          <AdvancedImage
            cldImg={cld.image(selectedImageId)}
            className="card-img-top"
            alt={nameProfile}
          />
          <button
            type="button"
            className="btn btn-outline-success position-relative bottom-0 end-0 mt-3"
            onClick={() => actions.addToFavorite(id, nameProfile, role)}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <div className="mb-5">
          <ModalButtonRecommendation recommendation={recommendation} role={role} id={id} />
        </div>
      </div>

      <div className="col-md-7 mt-5 mb-5">
        <TagRol role={role} />
        <PersonalProfileDetails
          nameProfile={nameProfile}
          lastname={lastname}
          floor={floor}
          shopName={shopName}
          buildingName={buildingName}
          email={email}
          phone={phone}
          id={id}
          role={role}
        />
      </div>
    </div>
  );
};

export default AllUsersInfo;
