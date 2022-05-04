import { useEffect, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactInfo } from "../models/contact-info";
import ContactCard from "./ContactCard";
import { Pagination } from "./Pagination";

type GridProps = { 
  contactList: ContactInfo[];
  itemsPerPage: number;
  itemAlignClass: string;
  footerClass: string;
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
  const { contactList, itemsPerPage, itemAlignClass, footerClass } = props;
  
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
  const [visibleItems, setVisibleItems] = useState(contactList.slice(state.startIndex, state.endIndex));
  useEffect(() => {
    setVisibleItems(contactList.slice(state.startIndex, state.endIndex));
  }, [state.startIndex, state.endIndex, contactList]);

  useEffect(() => {
    dispatch({type: 'resize', payload: itemsPerPage});
    dispatch({type: 'goto', payload: 0});
  }, [itemsPerPage]);
  
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Customer Contact Information</h2>
      <Row className={itemAlignClass}>
        {visibleItems.map((contact: ContactInfo, idx) => (
          <Col key={contact.name + idx} xs={8} md={6} lg={3}>
            <ContactCard name={contact.name} url={contact.url}></ContactCard>
          </Col>
        ))}
      </Row>
      <Row>
        <Pagination 
          range={Math.ceil(contactList.length/itemsPerPage)}
          current={Math.floor(state.startIndex/itemsPerPage)}
          triggerChange={dispatch}
          footerClass={footerClass}
        ></Pagination>
      </Row>
    </div>
  );
};
