// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import React, { useState, useEffect } from "react";
import authorsTableData from "layouts/fiche/data/authorsTableData";
import projectsTableData from "layouts/fiche/data/projectsTableData";
import { useParams } from 'react-router';
import { any } from "prop-types";

function Tables() {
  const [categorie, setCategorie] = useState('0');
  const [prix_min, setPrix_min] = useState('0');
  const [prix_max, setPrix_max] = useState('0');
  const [mot_cle, setMot_cle] = useState('');



   
    const [posts, setPosts ] =useState([]);
    const [photos, setPhotos ] =useState([]);
  let param=JSON.stringify(useParams());
  let id=JSON.parse(param).id;
  

  
  ///:prix_min/:prix_max/:mot_cle/:categorie
  console.log("id:"+id);
  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/'+id, {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPosts(data);       
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite');
      })           
       .then((result) => {
          console.log("result : " + result); 
       })
       .catch((err) => {
          console.log(err);   
       });
  }, []);
  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/'+id+"/photos", {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPhotos(data);       
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite');
      })           
       .then((result) => {
          console.log("result : " + result); 
       })
       .catch((err) => {
          console.log(err);   
       });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
        
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Fiche Enchere 
                </MDTypography>
              </MDBox>
              {posts.length!==0 && 

              
              <MDBox pt={3} mx={20}>
                <img src={posts.photo_couverture} width="250"></img>
                <MDTypography variant="h3" color="back">
                {posts.intitule}
                </MDTypography>
                <MDTypography variant="h5" color="back">
                  Description: 
                </MDTypography>
                <p>{posts.description}</p>
                <MDTypography variant="h5" color="back">
                  Categorie: 
                </MDTypography>
                
                <p>{posts.categorie.libelle}</p>
                <MDTypography variant="h5" color="back">
                Prix: 
                </MDTypography>
                <p>{posts.prix_mise_enchere} Ar</p>
                <MDTypography variant="h5" color="back">
                Enchereur: 
                </MDTypography>
                <p>{posts.utilisateur.nom} </p>
                
              </MDBox>
              }
              {photos.map(item => (
              <MDBox pt={3} mx={20}>
                <img src={item.photo} width="250"></img>
              </MDBox>
              ))}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Tables;
