package com.kn.customercontacts.repository;

import com.kn.customercontacts.beans.ContactInfo;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

public interface DataRepository {
    List<ContactInfo> fetchAllContacts() throws IOException, URISyntaxException;
}
