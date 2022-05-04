package com.kn.customercontacts;

import com.kn.customercontacts.repository.DataRepository;
import com.kn.customercontacts.repository.FileRepository;
import com.kn.customercontacts.service.ContactService;
import com.kn.customercontacts.service.DataService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerContactsConfiguration {

    @Bean
    DataService contactService(){
        return new ContactService(fileRepository());
    }

    @Bean
    DataRepository fileRepository() {
        return new FileRepository();
    }
}
