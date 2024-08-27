import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TitleProfiles from "../../component/titleProfiles/TitleProfiles.jsx";
import PersonalProfileDetails from "../../component/personalProfileDetails/PersonalProfileDetails.jsx";
import ModalBusiness from "../../component/modalCreateBusiness/ModalBusiness.jsx";

import MPending from "../../component/messages/mPending.jsx";
import MRejected from "../../component/messages/mRejected.jsx";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dysmvst60"
  }
})

const imgCloudinary = [
  'cld-sample-2',
  'samples/food/fish-vegetables',
  'samples/landscapes/nature-mountains',
  'samples/people/bicycle',
  'samples/animals/three-dogs',
  'samples/animals/reindeer',
  'samples/balloons'
]
const ProfileSeller = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState();
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
      await actions.createSellerRecommendation(id, recommendation)
      navigate("/recommendations")
    }
  }

  const checkStatus = async () => {
    const resp = await actions.chekingStatus()
    setStatus(resp.status)
  }


  useEffect(() => {
    actions.getProfileSeller(id)
      .then((data) => {
        if (data?.error) {
          setError(data.error || "Error fetching profile");
          if (data.error === "No token found") {
            navigate("/register");
          }
        }
      });
    checkStatus()
  }, [id]);

  const imageIndex = parseInt(id, 10) % imgCloudinary.length;
  const selectedImageId = imgCloudinary[imageIndex]


  if (!store.seller) return <div>Loading...</div>;

  return (
    <>
      {status === "PENDING" && (
        <MPending />
      )}
      {status === "REJECTED" && (
        <MRejected />
      )}
      {status === "APPROVED" && (
        <div className="">
          <TitleProfiles title={store.seller.role} />
          <div
            className="container-profiles"

          >
            <div className="row">
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
                    <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Haz una recomendación
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="recomendar modal-content text-white">
                          <div className="modal-header text-white">
                            <h1 className=" modal-title fs-5 text-white" id="exampleModalLabel">Quiero recomendar a:</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body text-white">
                            <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-labe text-white">Nombre:</label>
                                <input
                                  name="name"
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  className="form-control"
                                  value={recommendation.name}
                                  id="exampleInputName" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="exampleInputLastname" className="form-label  text-white">Apellido:</label>
                                <input
                                  name="lastname"
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  className="form-control"
                                  value={recommendation.lastname}
                                  id="exampleInputLastName" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="exampleInputPhone" className="form-label  text-white">Whatsapp:</label>
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
                                <label htmlFor="exampleInputShopName" className="form-label  text-white">Nombre del comercio:</label>
                                <input
                                  name="shopName"
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  className="form-control"
                                  id="exampleInputShopName"
                                  placeholder="Ferretería Mis llaves" />
                                <div id="exampleInputShopName" className="form-text text-secondary">Colocar primero el TIPO de comercio</div>
                              </div>

                              <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >Submit</button>

                            </form>

                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to aria-labelledby="ModalBusiness">
                      <ModalBusiness
                        shopName={store.seller.shopName}
                        id={id}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-7 d-flex flex-column justify-content-center">
                <PersonalProfileDetails
                  nameProfile={store.seller.name}
                  lastname={store.seller.lastname}
                  floor={store.seller.floor}
                  shopName={store.seller.shopName}
                  email={store.seller.email}
                  phone={store.seller.phone}
                />
              </div>
              <div className="mt-auto text-end mb-5">
                <Link to={"/profileEditSeller"} className="btn btn-success me-5">
                  Editar información
                </Link>
                {/* <div>
              {" "}
              <Link to={"/register"}>Have you registered yet? Click here!</Link>
            </div> */}
                <div>
                  {" "}
                  {/* <Link to={="seller/:seller_id/shop/:business_id"}>Visita su tienda</Link>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSeller;
