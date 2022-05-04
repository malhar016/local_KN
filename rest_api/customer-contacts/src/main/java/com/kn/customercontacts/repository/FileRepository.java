package com.kn.customercontacts.repository;

import com.kn.customercontacts.beans.ContactInfo;
import org.springframework.stereotype.Repository;
import sun.misc.ClassLoaderUtil;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FileRepository implements DataRepository {

    @Override
    public List<ContactInfo> fetchAllContacts() throws IOException, URISyntaxException {
        Path filePath = Paths.get("src\\main\\resources\\static\\people.csv");
        Stream<String> fileStream = Files.lines(filePath);
        List<ContactInfo> contactList = fileStream.map(line -> {
            String[] values = line.split(",");
            return new ContactInfo(values[0], values[1]);
        }).collect(Collectors.toList());
        return contactList.subList(1, contactList.size());
    }
}
