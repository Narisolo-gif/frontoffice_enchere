import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useParams } from 'react-router';
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
    { Header: "date", accessor: "date", align: "center" },
    { Header: "date fin", accessor: "date_fin", align: "center" },
    { Header: "prix", accessor: "prix", align: "center" },
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
      
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {post.date}
        </MDTypography>
      ),

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
    })
  ));

  return {
    columns,
    rows,
  };
}
