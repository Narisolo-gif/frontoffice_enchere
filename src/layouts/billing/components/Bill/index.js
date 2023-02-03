// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function Bill({ iddemande, idutilisateur, name, prenom, email, montant, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  async function handleDelete() {
    fetch('https://encherews-production.up.railway.app/Enchere/demande_rechargements/' + iddemande, {
        method: "DELETE",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
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
       window.location.reload(false);
  };

  const demande = {
    id: iddemande,
    utilisateur: {
      id:idutilisateur,
    },
    montant: montant,
    statut:1,
  };

  async function handleValidate() {
    console.log(demande);
    console.log(JSON.stringify(demande));
    fetch('https://encherews-production.up.railway.app/Enchere/demande_rechargements', {
      method: "PUT",
      body: JSON.stringify(demande),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
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
       window.location.reload(false);
  };


  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name} {prenom}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            <MDButton variant="text" color="success" onClick={handleValidate}>
              <Icon>validation</Icon>&nbsp;validate
            </MDButton>
          </MDBox>
        </MDBox>
        
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {email}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          montant demandé:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {montant} Ariary
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  montant: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
