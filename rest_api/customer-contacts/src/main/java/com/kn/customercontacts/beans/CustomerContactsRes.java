package com.kn.customercontacts.beans;

import java.util.List;

public class CustomerContactsRes {
    private List<ContactInfo> customerContacts;
    private ResError resError;

    public List<ContactInfo> getCustomerContacts() {
        return customerContacts;
    }

    public void setCustomerContacts(List<ContactInfo> customerContacts) {
        this.customerContacts = customerContacts;
    }

    public ResError getResError() {
        return resError;
    }

    public void setResError(ResError resError) {
        this.resError = resError;
    }
}
