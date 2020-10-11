package com.barbershop.cartel.security.service;

import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.repository.UserRepository;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import com.barbershop.cartel.utils.Base64Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final String DEFAULT_PICTURE_PATH = "images/defual-profile-picture.png";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }

        UserEntity user = userOptional.get();

        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public UserEntity save(UserModel user) {

        UserEntity newUser = new UserEntity();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        UserDetailsEntity newUserDetails = new UserDetailsEntity();
        newUserDetails.setFirstName(user.getFirstName());
        newUserDetails.setLastName(user.getLastName());
        newUserDetails.setUser(newUser);

        newUserDetails.setPicture(getDefaultPicture());

        newUser.setUserDetails(newUserDetails);

        return userRepository.save(newUser);
    }

    private String getDefaultPicture() {

        String picture = "";

        try {
            File f = new ClassPathResource(DEFAULT_PICTURE_PATH).getFile();
            picture = Base64Util.encodeFileToBase64Binary(f);

        } catch (Exception e) {

            log.error("Default picture is missing");
            e.printStackTrace();

        }
        return picture;
    }
}

