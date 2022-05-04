import { useEffect, useState } from "react";
import "./App.css";
import "./Utility.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Spinner } from "react-bootstrap";
import { ContactGrid } from "./app/components/ContactGrid";
import { api } from "./app/rest_client/axios-apis";
// import { dummyContacts } from "./app/models/dummy-contacts";

function App() {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    api.get("/all").then(({data}) => {
      setContactList(data.customerContacts);
    });
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemAlignClass, setItemAlighClass] = useState("justify-content-right");
  const [footerClass, setFooterClass] = useState("pagination-fixed");

  const handleWindowResize = () => {
    const {innerWidth : windowSize} = window;
    setItemAlighClass("justify-content-left");
    setFooterClass("pagination-fixed");
    if(windowSize < 576){
      setItemsPerPage(2);
      setItemAlighClass("justify-content-center");
      setFooterClass("pagination-relative");
    } else if(windowSize < 992){
      setItemsPerPage(6);
    } else {
      setItemsPerPage(12);
    }
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  

  return (
    <div>
      <header></header>
      <body>
        <Container>
          {contactList?.length? 
          <ContactGrid 
            contactList={contactList} 
            itemsPerPage={itemsPerPage}
            itemAlignClass={itemAlignClass}
            footerClass={footerClass}
            ></ContactGrid>:
          <Spinner animation="border" variant="primary"></Spinner>}
        </Container>
      </body>
    </div>
  );
}

export default App;
