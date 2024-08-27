import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import "../../styles/inputPhone.css";
import TitleProfiles from "../../component/titleProfiles/TitleProfiles.jsx";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dysmvst60"
  }
})

const imgCloudinary = [
  'samples/balloons',
  'samples/landscapes/nature-mountains',
  'samples/animals/cat',
  'samples/people/bicycle',
  'samples/animals/three-dogs',
  'samples/animals/reindeer',
  'cld-sample-2'
]

const ProfileAdmin = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const cldImg = cld.image('sample');


  const [recommendation, setRecommendation] = useState({
    name: "",
    lastname: "",
    shopName: "",
    phone: ""
  })

  function handleChange(e) {
    setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (id) {
      await actions.createAdminRecommendation(id, recommendation)
      navigate("/recommendations")
    }
  }

  useEffect(() => {
    actions.getProfileAdmin(id)
      .then((data) => {
        if (data?.error) {
          setError(data.error || "Error fetching profile");
          if (data.error === "Unknown error") {
            navigate("/register");
          }
        }
      });
  }, []);

  const imageIndex = parseInt(id, 10) % imgCloudinary.length;
  const selectedImageId = imgCloudinary[imageIndex]

  if (!store.admin) return <div>Loading...</div>;

  return (
    <div className="">
      <TitleProfiles title={store.admin.role} />
      <div
        className="container-profiles mt-3"

      >
        <div className="row w-100">
          <div className="col-md-4 ms-4">
            <div className="card-N" style={{ marginRight: "30px" }}>
              <AdvancedImage
                cldImg={cld.image(selectedImageId)}
                className="card-img-top"
                alt=""
              />
              <div className="card-body text-center">
                {/* <h5 className="card-title mb-4">Libros Favoritos</h5>
                <ol className="list-unlysted">
                  <li>Lord Rings</li>
                  <li>Harry Potter</li>
                </ol> */}
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Haz una recomendación
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">

                    <div className="recomendar modal-content text-white">
                      <div className="modal-header text-white">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Quiero recomendar a:</h1>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body text-white">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">

                            <label htmlFor="exampleInputName" className="form-label text-white">Nombre:</label>

                            <input
                              name="name"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              value={recommendation.name}
                              id="exampleInputName" />
                          </div>
                          <div className="mb-3">

                            <label htmlFor="exampleInputLastname" className="form-label text-white">Apellido:</label>

                            <input
                              name="lastname"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              value={recommendation.lastname}
                              id="exampleInputLastName" />
                          </div>
                          <div className="mb-3">

                            <label htmlFor="exampleInputPhone" className="form-label text-white">Whatsapp:</label>

                            <PhoneInput
                              country={'co'}
                              onChange={(phone) => setRecommendation({ ...recommendation, phone })}
                              value={recommendation.phone}
                              inputProps={{
                                name: 'phone',
                                id: 'exampleInputPhone',
                                className: 'form-control w-100',
                              }}
                              containerStyle={{ width: '100%' }}
                              inputStyle={{ width: '100%' }}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputShopName" className="form-label text-dark d-flex align-content-start">Nombre del comercio:</label>
                            <input
                              name="shopName"
                              onChange={(e) => handleChange(e)}
                              type="text"
                              className="form-control"
                              id="exampleInputShopName"
                              placeholder="Ferretería Mis llaves" />
                            <div id="exampleInputShopName" className="form-text">Colocar primero el TIPO de comercio</div>
                          </div>

                          <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >Submit</button>

                        </form>

                      </div>
                      <div className="modal-footer">

                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <PersonalProfileDetails
              nameProfile={store.admin.name}
              lastname={store.admin.lastname}
              floor={store.admin.floor}
              buildingName={store.admin.buildingName}
              email={store.admin.email}
            />
          </div>
          <div className="mt-auto text-end mb-5">
            <Link to={"/AdminDeleteUser"} className="btn btn-success me-5">
              Administracion de usuarios
            </Link>
            <Link to={"/profileEditAdmin"} className="btn btn-success me-5">
              Editar información
            </Link>
            <Link to={"/buildingUsers"} className="btn btn-success me-5">
              Ver miembros del edificio
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProfileAdmin;
