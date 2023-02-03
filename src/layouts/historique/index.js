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
  const [user,setUser]= useState();

  const token=localStorage.getItem('token');
  var iduser=0;
  useEffect(() =>{
    if(token){
      
      const tokenuser=JSON.parse(token);
      setUser(tokenuser.utilisateur);
      console.log("token "+tokenuser.utilisateur.id);
      iduser= tokenuser.utilisateur.id;
    }
  }, []);
   
    const [posts, setPosts ] =useState([]);

  useEffect(() =>{
    const tokenuser=JSON.parse(token);
    console.log(tokenuser.utilisateur.id);
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/historique/utilisateur/'+tokenuser.utilisateur.id, {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
        
          <Grid color="grey" item xs={12}>
            <Card color="grey">
              <MDBox color="grey"
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
                  Historique
                </MDTypography>
              </MDBox>
              {posts.map(item => (
                <Grid item xs={10}>
              <Card>
              <MDBox pt={3} mx={20}>
                <img src={item.enchere.photo_couverture}></img>
                
                <MDTypography variant="h5" color="back">
                  Intitule: 
                </MDTypography>
                
                <p>{item.enchere.intitule}</p>
                <MDTypography variant="h5" color="back">
                  Date: 
                </MDTypography>
                
                <p>{item.date}</p>
                <MDTypography variant="h5" color="back">
                Prix mise: 
                </MDTypography>
                <p>{item.prix} Ar</p>
                
              </MDBox>
              </Card>
              </Grid>
              ))}

            </Card>
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Tables;
