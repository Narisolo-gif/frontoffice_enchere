import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [benefice, setBenefice ] = useState("0");
  const [utilisateur, setUtilisateur ] = useState("0");
  const [enchere, setEnchere ] = useState("0");

  async function sendRequest(){
    fetch('https://encherews-production.up.railway.app/Enchere/ventes/benefice', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            setBenefice(data);  
            console.log("Successful request, parsed json body", data);
            return jsonPromise;
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Response not ok');
      })
       .then((result) => {
          console.log("result : " + result); 
                 
       })
       .catch((err) => {
          console.log(err);   
       });

       fetch('https://encherews-production.up.railway.app/Enchere/utilisateurs/count', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            setUtilisateur(data);  
            console.log("Successful request, parsed json body", data);
            return jsonPromise;
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Response not ok');
      })
       .then((result) => {
          console.log("result : " + result); 
                 
       })
       .catch((err) => {
          console.log(err);   
       });

       fetch('https://encherews-production.up.railway.app/Enchere/encheres/count', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setEnchere(data); 
            return jsonPromise;
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Response not ok');
      })
       .then((result) => {
          console.log("result : " + result); 
                  
       })
       .catch((err) => {
          console.log(err);   
       });
  };

  sendRequest();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Bénéfice"
                count={benefice} 
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Ariary",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Enchères"
                count={enchere}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Utilisateurs"
                count={utilisateur}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/*<MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
              */}
      </MDBox>
     
    </DashboardLayout>
  );
}

export default Dashboard;
