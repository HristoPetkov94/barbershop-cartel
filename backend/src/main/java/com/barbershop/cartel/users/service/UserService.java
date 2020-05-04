package com.barbershop.cartel.users.service;

import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.repository.UserRepository;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import com.barbershop.cartel.users.interfaces.UserDetailsInterface;
import com.barbershop.cartel.users.models.UserDetailsModel;
import com.barbershop.cartel.users.repository.UserDetailsRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsInterface {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDetailsModel> getAllUsers() {

        List<UserDetailsModel> users = new ArrayList<>();
        Iterable<UserDetailsEntity> allUsers = userDetailsRepository.findAll();

        for (UserDetailsEntity user : allUsers) {

            UserDetailsModel userDetails = UserDetailsModel.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .description(user.getDescription())
                    .picture(user.getPicture())
                    .build();

            users.add(userDetails);
        }

        return users;
    }

    @Override
    public Optional<UserDetailsEntity> getBarberById(long barberId) {
        return userDetailsRepository.findById(barberId);
    }

    @Override
    public UserDetailsModel getBarberByEmail(String email) {

        UserDetailsModel userDetailsModel = null;
        UserDetailsEntity userDetails = userRepository.findByEmail(email).getUserDetails();

        if (userDetails != null) {

            userDetailsModel = UserDetailsModel.builder()
                    .id(userDetails.getId())
                    .email(email)
                    .firstName(userDetails.getFirstName())
                    .lastName(userDetails.getLastName())
                    .description(userDetails.getDescription())
                    .picture(userDetails.getPicture())
                    .build();
        }

        return userDetailsModel;
    }

    @Override
    public void uploadPicture(long barberId, byte[] image) {

        String picture = Base64.encodeBase64String(image);

        Optional<UserDetailsEntity> optionalBarber = userDetailsRepository.findById(barberId);

        UserDetailsEntity barber = optionalBarber.get();
        barber.setPicture(("data:image/png;base64," + picture));

        userDetailsRepository.save(barber);
    }

    @Override
    public void updateBarber(UserDetailsModel barber) {
        Optional<UserEntity> userOptional = userRepository.findById(barber.getId());

        if (userOptional.isPresent()) {

            UserEntity user = userOptional.get();
            UserDetailsEntity details = user.getUserDetails();

            details.setFirstName(barber.getFirstName());
            details.setLastName(barber.getLastName());
            details.setDescription(barber.getDescription());

            if (!barber.getEmail().equals(user.getEmail())) {
                user.setEmail(barber.getEmail());
                userRepository.save(user);
            }

            userDetailsRepository.save(details);
        }


    }
}
