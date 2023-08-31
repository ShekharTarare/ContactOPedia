import React from "react";
import Header from "../../Layout/Header";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import Footer from "../../Layout/Footer";

class ContactIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactList: [
        {
          id: 1,
          name: "Ben Parker",
          phone: "666-666-7770",
          email: "ben@parker.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "Kathy Patrick",
          phone: "111-666-7770",
          email: "kathy@patrick.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "Paul Shaw",
          phone: "444-666-7770",
          email: "paul@shaw.com",
          isFavorite: true,
        },
      ],
      selectedContact: undefined, //which contact is selected
      isUpdating: false, //Are we updating any contact
    };
  }

  handleAddContact = (newContact) => {
    if (newContact.name == "") {
      return { status: "failure", msg: "Please enter a valid name" };
    } else if (newContact.phone == "") {
      return { status: "failure", msg: "Please enter a valid number" };
    }
    const duplicateRecord = this.state.contactList.filter((x) => {
      if (x.name == newContact.name && x.phone == newContact.phone) {
        return true;
      }
    });
    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate record" };
    } else {
      let size = this.state.contactList.length;
      const newFinalContact = {
        ...newContact,
        id: this.state.contactList[size - 1].id + 1,
        isFavorite: false,
      };
      this.setState((prevState) => {
        return {
          contactList: prevState.contactList.concat([newFinalContact]),
        };
      });
      return { status: "success", msg: "Contact was added successfully" };
    }
  };

  handleUpdateContact = (updatedContact) => {
    if (updatedContact.name == "") {
      return { status: "failure", msg: "Please enter a valid name" };
    } else if (updatedContact.phone == "") {
      return { status: "failure", msg: "Please enter a valid number" };
    }

    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id == updatedContact.id) {
            return {
              ...obj,
              name: updatedContact.name,
              email: updatedContact.email,
              phone: updatedContact.phone,
            };
          }
          return obj;
        }),
        isUpdating: false,
        selectedContact: undefined
      };
    });
    return { status: "success", msg: "Contact was updated successfully" };
  };

  handleUpdateCancel = () => {
    this.setState((prevState) => {
      return {
        isUpdating: false,
        selectedContact: undefined,
      };
    });
  };

  handleToggleFavorite = (contact) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id == contact.id) {
            return { ...obj, isFavorite: !obj.isFavorite };
          }
          return obj;
        }),
      };
    });
  };

  handleDelete = (contact) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.filter((obj) => {
          return obj.id !== contact.id;
        }),
      };
    });
  };

  handleAddRandomContact = (newContact) => {
    let size = this.state.contactList.length;
    const newFinalContact = {
      ...newContact,
      id: this.state.contactList[size - 1].id + 1,
      isFavorite: false,
    };
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newFinalContact]),
      };
    });
  };

  handleRemoveAllContact = () => {
    this.setState((prevState) => {
      return {
        contactList: [],
      };
    });
  };

  handleUpdateClick = (contact) => {
    this.setState((prevState) => {
      return {
        selectedContact: contact,
        isUpdating: true,
      };
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2 row">
              <AddRandomContact
                handleAddRandomContact={this.handleAddRandomContact}
              />
            </div>
            <div className="col-4 row">
              <RemoveAllContact
                handleRemoveAllContact={this.handleRemoveAllContact}
              />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact
                  handleAddContact={this.handleAddContact}
                  handleUpdateContact={this.handleUpdateContact}
                  handleUpdateCancel={this.handleUpdateCancel}
                  selectedContact={this.state.selectedContact}
                  isUpdating={this.state.isUpdating}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavoriteContacts
                  updateClick={this.handleUpdateClick}
                  favoriteClick={this.handleToggleFavorite}
                  deleteClick={this.handleDelete}
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == true
                  )}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  updateClick={this.handleUpdateClick}
                  favoriteClick={this.handleToggleFavorite}
                  deleteClick={this.handleDelete}
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == false
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactIndex;
