package com.kn.customercontacts;

import com.kn.customercontacts.beans.CustomerContactsRes;
import com.kn.customercontacts.service.DataService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("contacts/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerContactsController {

    private DataService contactService;

    public CustomerContactsController(DataService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/all")
    public ResponseEntity<CustomerContactsRes> getAllContacts(){
        CustomerContactsRes customerContactsRes = contactService.getAllCustomerContacts();
        if(customerContactsRes.getResError() != null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(customerContactsRes);
        }
        return ResponseEntity.ok(customerContactsRes);
    }
}
