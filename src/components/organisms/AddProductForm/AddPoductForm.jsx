import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, addProduct, productActions, infoProducts } from "../../../app/store";
import { TextField, Button, Fab } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CropFreeIcon from "@mui/icons-material/CropFree";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Quagga from "quagga";
// import { ScanProduct } from "../ScanProduct/ScanProduct"

export const AddProductForm = () => {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.products.status);
  const productInfo = useSelector((state) => state.products.lastProductInfo);

  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [produceradress, setProducerAdress] = useState("");
  const [productimg, setProductImg] = useState("");

  const [barcodeproduct, setBarcodeProduct] = useState("");

  const [scan, setScanner] = useState(false);

  useEffect(() => {
    if (productStatus === "fulfilled") {
      alert("Ajout réussi !");
    }
    dispatch(productActions.resetStatus());
  }, [productStatus, dispatch]);

  if (scan === false) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Veuillez ajouter un produit</h3>
        <form>
          <TextField
            style={{ width: "350px", margin: "5px" }}
            type="text"
            label="Nom"
            variant="outlined"
            value={productInfo ? productInfo.product.product_name_fr: "" }
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />
          <TextField
            style={{ width: "350px", margin: "5px" }}
            type="text"
            label="Description"
            variant="outlined"
            value={productInfo ? productInfo.product.categories: ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            style={{ width: "350px", margin: "5px" }}
            type="number"
            label="Prix"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            style={{ width: "350px", margin: "5px" }}
            type="text"
            label="Adresse du producteur"
            variant="outlined"
            value={productInfo ? productInfo.product.manufacturing_places: ""}
            onChange={(e) => setProducerAdress(e.target.value)}
          />
          <br />
          <br />
          <Button
            onClick={() => {
              store.dispatch(
                addProduct({
                  productname: productInfo ? productInfo.product.product_name_fr: "",
                  description: productInfo ? productInfo.product.categories: "",
                  price: price,
                  produceradress: productInfo ? productInfo.product.manufacturing_places: "",
                  productimg: productInfo ? productInfo.product.image_front_small_url: ".png",
                })
              );
              console.log("Status : " + productStatus);
            }}
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              margin: "5px",
              marginLeft: 10,
              backgroundColor: "#77CCBB",
            }}
          >
            Ajouter
          </Button>

          <IconButton
            color="primary"
            aria-label="scan a product"
            size="large"
            variant="contained"
            sx={{ marginLeft: 5 }}
            onClick={() => setScanner(true)}
          >
            <CropFreeIcon />
          </IconButton>
        </form>
      </div>
    );
  } else if (scan === true) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>Scanner</p>
        <Button onClick={() => {
      
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        Quagga.init({
          inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.querySelector('.text'), 
              constraints: {
                 width: 520,
                 height: 400,                  
                 facingMode: "environment"  //"environment" for back camera, "user" front camera
                 }    
          },
          decoder : {
              readers : ["ean_reader"]
          }
          }, function(err) {
              if (err) {
                  console.log(err);
                  return
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
              Quagga.onDetected((data) => {
                alert("Code barre : "+data.codeResult.code);
                setBarcodeProduct(data.codeResult.code)
                Quagga.stop();
                store.dispatch(
                  infoProducts(data.codeResult.code)
                );
                console.log("productInfo : " + productInfo);
                document.getElementById("text").innerHTML = productInfo.product.product_name_fr
                setScanner(false)
              })
          });
        
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      })          

            }} variant="contained" color="primary" style={{ width: "200px", margin: "5px" }}>
                Code barre
            </Button>
       <div className="text" id="text">{ productInfo ? productInfo.product.product_name_fr: "" }</div>



       
      </div>
    );
  }
};
