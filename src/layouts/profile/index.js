/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import React, { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";


function Overview() {
  
  const [libelle,setLibelle]=useState();
   async function Insertion(){
      const loginData={
        libelle:libelle,
        }
      fetch('https://encherews-production.up.railway.app/Enchere/categories',{
        method: "POST",
        body: JSON.stringify(loginData),
        headers:{
            'Content-type':'application/json;charset=UTF-8',
      },
      })
  }
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      fetch('https://encherews-production.up.railway.app/Enchere/categories')
        .then(response => response.json())
        .then(data => {
          setData(data);
          setIsLoading(false);
        });
    }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Categorie
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Ajouter des categories
            </MDTypography>
          </MDBox>
          <MDBox mb={1}>
            <MDBox mb={1}>
              <MDInput type="text" label="Libelle" id="categorie" fullWidth value={libelle} onChange={e => setLibelle(e.target.value)}></MDInput>
            </MDBox>
           <MDButton variant="gradient" color="success" onClick={Insertion} >Nouvelle categorie</MDButton>
          </MDBox>
          <MDBox mt={2}>
            <MDTypography variant="button" color="text">
              Liste des categories
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={1}>
        {data.map(item => (
          <Grid container spacing={6}>
            <Grid item xs={6} md={6} xl={3}>
              {item.id}. 
              {item.libelle}
              {/*<DefaultProjectCard
                label={item.id}
                title={item.libelle}
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />*/}
            </Grid>
          </Grid>
           ))}
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
