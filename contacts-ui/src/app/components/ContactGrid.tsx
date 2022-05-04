import { useEffect, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactInfo } from "../models/contact-info";
import ContactCard from "./ContactCard";
import { Pagination } from "./Pagination";

type GridProps = { 
  contactList: ContactInfo[];
  itemsPerPage: number;
  itemAlignClass: string;
};

type GridState = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

type GridAction = {
  type: 'next' | 'prev' | 'goto' | 'resize';
  payload: number
}

export const ContactGrid = (props: GridProps) => {
  const { contactList, itemsPerPage, itemAlignClass } = props;
  const [filteredContacts, setFilteredContacts] = useState(contactList);
  
  const initialState: GridState = {
    startIndex: 0,
    endIndex: itemsPerPage,
    totalItems: itemsPerPage
  }

  const gridReducer = (state: GridState, action: GridAction): GridState => {
    const {startIndex: start, endIndex: end, totalItems} = state;
    const {type, payload} = action;
    switch(type){
      case 'next': {
        return Object.assign({}, {...state, startIndex: start + totalItems, endIndex: end + totalItems});
      }
      case 'prev': {
        return Object.assign({},{...state, startIndex: start - totalItems, endIndex: end - totalItems});
      }
      case 'goto': {
        const newIndex = payload * totalItems;
        return Object.assign({},{...state, startIndex: newIndex, endIndex: newIndex + totalItems});
      }
      case 'resize': {
        return Object.assign({}, {...state, totalItems: payload});
      } 
      default: {
        throw new Error();
      }
    }
  }

  const [state, dispatch] = useReducer(gridReducer, initialState);
  const [visibleItems, setVisibleItems] = useState(filteredContacts.slice(state.startIndex, state.endIndex));
  useEffect(() => {
    setVisibleItems(filteredContacts.slice(state.startIndex, state.endIndex));
  }, [state.startIndex, state.endIndex, filteredContacts.length, filteredContacts]);

  useEffect(() => {
    dispatch({type: 'resize', payload: itemsPerPage});
    dispatch({type: 'goto', payload: 0});
  }, [itemsPerPage]);

  const filterContacts = (searchStr = "") => {
    setFilteredContacts(contactList.filter(contact => {
      let { name } = contact;
      let words = name.toLocaleLowerCase().split(" ");
      return words.some(word => word.startsWith(searchStr.toLocaleLowerCase()));
      })
      );
  }

  return (
    <div>
      <Row className="justify-content-between mb-1">
        <Col lg={6}><h2>Customer Contact Information</h2></Col>
        <Col className="align-self-center" lg={4}>
          <label className="txt-lbl">Search By:</label>
          <input className="txt-ip" placeholder="FirstName or LastName" onChange={(e) => filterContacts(e.currentTarget.value)} type="text"/>
        </Col>
     
      </Row>
      <Row className={itemAlignClass}>
        {visibleItems.map((contact: ContactInfo, idx) => (
          <Col key={contact.name + idx} xs={8} md={6} lg={3}>
            <ContactCard name={contact.name} url={contact.url}></ContactCard>
          </Col>
        ))}
      </Row>
      <Pagination 
        range={Math.ceil(filteredContacts.length/itemsPerPage)}
        current={Math.floor(state.startIndex/itemsPerPage)}
        triggerChange={dispatch}
      ></Pagination>
    </div>
  );
};
