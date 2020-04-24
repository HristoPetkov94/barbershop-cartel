package com.barbershop.cartel.security.service;

import java.util.ArrayList;

import com.barbershop.cartel.security.repository.UserRepository;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.users.entity.UserDetailsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public UserEntity save(UserModel user) {

        UserEntity newUser = new UserEntity();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        UserDetailsEntity newUserDetails = new UserDetailsEntity();
        newUserDetails.setFirstName(user.getFirstName());
        newUserDetails.setLastName(user.getLastName());
        newUserDetails.setUser(newUser);
        newUserDetails.setPicture("");

        newUser.setUserDetails(newUserDetails);

        return userRepository.save(newUser);
    }
}

