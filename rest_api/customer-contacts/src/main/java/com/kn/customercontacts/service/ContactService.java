package com.kn.customercontacts.service;

import com.kn.customercontacts.beans.ContactInfo;
import com.kn.customercontacts.beans.CustomerContactsRes;
import com.kn.customercontacts.beans.ResError;
import com.kn.customercontacts.repository.DataRepository;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

public class ContactService implements DataService {

    private DataRepository dataRepository;

    public ContactService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    @Override
    public CustomerContactsRes getAllCustomerContacts(){
        CustomerContactsRes res = new CustomerContactsRes();
        List<ContactInfo> contactInfoList = null;
        try {
            contactInfoList = dataRepository.fetchAllContacts();
        } catch (IOException | URISyntaxException e) {
            ResError error = new ResError("data-fetch01", e.getCause().getMessage());
            res.setResError(error);
        }
        res.setCustomerContacts(contactInfoList);
        return res;
    }
}
