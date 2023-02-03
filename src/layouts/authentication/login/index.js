import { useState } from "react";
import { useEffect } from "react";
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

  const [email, setEmail] = useState('sharonrandrianasolo@gmail.com');
  const [mdp, setMdp] = useState('mdp2');
  const [message, setMessage] = useState('');

  const [token, setTokens] = useState([]);

  async function handleSubmit() {
    const loginData = {
      email: email,
      mdp: mdp,
    };
    console.log(JSON.stringify(loginData))
    fetch('https://encherews-production.up.railway.app/Enchere/utilisateurs/login', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            setTokens(data);
            window.location.href = "/tables";
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
  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
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
            Login utilisateur
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" id="email" fullWidth value={email} onChange={e => setEmail(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" id="mdp" fullWidth value={mdp} onChange={e => setMdp(e.target.value)} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign in
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
