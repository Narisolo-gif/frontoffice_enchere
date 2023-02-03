import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const [posts, setPosts ] = useState([]);

  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/encours', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPosts(data);       
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

  const columns = [
    { Header: "photo", accessor: "photo", align: "left" },
    { Header: "intitule", accessor: "intitule", align: "center" },
    { Header: "catégorie", accessor: "categorie", align: "left" },
    { Header: "utilisateur", accessor: "utilisateur", align: "center" },
    { Header: "date fin", accessor: "date_fin", align: "center" },
    { Header: "prix", accessor: "prix", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
    { Header: "action", accessor: "enchere", align: "center" },
  ];

  const rows = [];


  posts?.map(post =>(

    rows.push({
      photo: <Author image={post.photo_couverture} />,
      intitule: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {post.intitule}
        </MDTypography>
      ),

      categorie: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {post.categorie.libelle}
        </MDTypography>
      ),

      utilisateur: 
      <Author name={post.utilisateur.nom + " " + post.utilisateur.prenom} email={post.utilisateur.email}/>,
      
      date_fin: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {post.date_fin}
        </MDTypography>
      ),

      prix: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {post.prix_mise_enchere} Ar
        </MDTypography>
      ),
      action: (
        <a href={'fiche/'+post.id}><MDButton variant="gradient" color="info">
                fiche
              </MDButton></a>
              
      ),
      enchere: (
        <a href={'login/'+post.id}><MDButton variant="gradient" color="info">
                Rencherir
              </MDButton></a>
              
      )
    })
  ));

  return {
    columns,
    rows,
  };
}
