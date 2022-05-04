import { ContactInfo } from "../models/contact-info";

const ContactCard = ({name, url}: ContactInfo) => {
  return (<div className="card">
    <img alt="profile_image" src={url}></img>
    <span>{name}</span>
    <button className="mybtn">View Details</button>
  </div>);
}

export default ContactCard;