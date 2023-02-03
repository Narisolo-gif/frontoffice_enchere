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
import authorsTableData from "layouts/recherche/data/authorsTableData";
import projectsTableData from "layouts/recherche/data/projectsTableData";


function Tables() {
  const [categorie, setCategorie] = useState('0');
  const [prix_min, setPrix_min] = useState('0');
  const [prix_max, setPrix_max] = useState('0');
  const [mot_cle, setMot_cle] = useState('');

  const { columns, rows } = authorsTableData();
  console.log(columns);
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


    async function handleSubmit() {
      const requete=prix_min+'/'+prix_max+'/'+mot_cle+'/'+categorie;
      console.log('https://encherews-production.up.railway.app/Enchere/encheres/recheche?prix_min='+prix_min+'&prix_max='+prix_max+'&mot_cle='+mot_cle+'&categorie='+categorie);
      fetch('https://encherews-production.up.railway.app/Enchere/encheres/recheche?prix_min='+prix_min+'&prix_max='+prix_max+'&mot_cle='+mot_cle+'&categorie='+categorie, {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
        })
         .then(function(response) {
          if(response.ok) {
            const jsonPromise = response.json();
            jsonPromise.then(data => {
              window.location.href = "/recherche/"+requete;
              console.log("Successful request, parsed json body", data);
              setMessage("");
              return jsonPromise;
            }).catch(error => {
              setMessage("Email ou mot de passe incorrecte. Reessayez!");
              console.log("Successful request, Could not parse body as json", error);
            })
          }
          else throw new Error('Une erreur s\'est produite');
        })
         .then((result) => {
            console.log("result : " + result);
            // mettre le token dans le localstorage
            // ...
            
         })
         .catch((err) => {
            setMessage("Une erreur s\'est produite, vérifiez votre connexion internet");
            console.log(err);   
         });
    };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
        <Grid item xs={5}>
        <Card>
          <form>
          <p><MDTypography my={2} mx={1} variant="h6" >Categorie:</MDTypography>
          <MDBox mx={1} my={1}>
            <select name="categorie" onChange={e => setCategorie(e.target.value)} >
              <option value="0">Tout</option>
            {data.map(item => (
              <option value={item.id}>{item.libelle}</option>
              
              ))}
            </select>
            </MDBox>
          </p>
          <p><MDTypography  mx={1} variant="h6" >Prix:</MDTypography><MDBox mb={1} mx={1}><MDInput type="number" name="prix_min" onChange={e => setPrix_min(e.target.value)}/> - <MDInput type="number"  name="prix_max" onChange={e => setPrix_max(e.target.value)}/></MDBox></p>
          <p><MDTypography  mx={1} variant="h6" >Mot cle:</MDTypography><MDBox mb={1} mx={1}><MDInput mx={1} type="text" name="mot_cle"  onChange={e => setMot_cle(e.target.value)}/> </MDBox></p>
          
          <p><MDTypography  mx={1}variant="h6" >Statut:</MDTypography><MDBox mb={1} mx={1}> <MDInput type="radio" name="statut"/><label>en cours </label><MDInput type="radio" name="statut"/> <label>terminé</label></MDBox></p>
          <MDBox mt={1} mb={2} mx={4}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                Rechercher
              </MDButton>
            </MDBox>
          </form>
          </Card>
        </Grid>
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
                  Liste des enchères 
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  prix_max='0'
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Tables;
