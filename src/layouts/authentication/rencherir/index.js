import { useState, useEffect } from "react";
import { useParams } from 'react-router';
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDAlert from "components/MDAlert";

function Basic() {
  let param=JSON.stringify(useParams());
  let id=JSON.parse(param).id;
  const [user,setUser]=useState(null);
  const [somme,setSomme]=useState(0);
 
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

  const [email, setEmail] = useState('admin@gmail.com');
  const [mdp, setMdp] = useState('admin');
  const [message, setMessage] = useState('');

  const [prix, setPrix] = useState(0);

  function handleSubmit() {
    const loginData = {
      email: email,
      mdp: mdp,
    };
    const tokenuser=JSON.parse(token);
    console.log(JSON.stringify(loginData));
    console.log("token "+tokenuser.utilisateur.id);
    fetch('https://encherews-production.up.railway.app/Enchere/encherir/'+tokenuser.utilisateur.id+'/'+id+'/'+somme, {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            window.location.href = "/dashboard";
            console.log("Successful request, parsed json body", data);
            setMessage("");
            return jsonPromise;
          }).catch(error => {
            window.location.href = "/dashboard";
          })
        }
        else throw new Error('Operation invalide');
      })
       .then((result) => {
          console.log("result : " + result);
          // mettre le token dans le localstorage
          // ...
          
       })
       .catch((err) => {
          setMessage("Operation invalide");
          console.log(err);   
       });
  };
  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/'+id+'/lasthistorique', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPrix(data);       
            return jsonPromise;
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
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Rencherir
          </MDTypography>
          
        </MDBox>
        {prix.length!==0 && 
        <MDTypography variant="h6" fontWeight="light" color="black" mx={4}mt={0}>
            Derniere mise: {prix.prix}
          </MDTypography>
        }
        <MDBox pt={4} pb={3} px={3}>
        
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="number" label="Somme" id="somme" fullWidth  onChange={e => setSomme(e.target.value)}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                Rencherir
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        {message && <MDAlert color='error'>{message}</MDAlert>}
      </Card>
    </BasicLayout>
  );
}

export default Basic;
