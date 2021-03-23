package com.barbershop.cartel.security.service;

import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.security.entity.UserEntity;
import com.barbershop.cartel.security.models.UserModel;
import com.barbershop.cartel.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getUsers() {

        List<UserModel> users = new ArrayList<>();

        Iterable<UserEntity> allUsers = userRepository.findAll();

        for (UserEntity user : allUsers) {

            UserModel userModel = new UserModel();
            userModel.setEmail(user.getEmail());
            userModel.setPassword(user.getPassword());

            users.add(userModel);
        }

        return users;
    }

    public void changeAdminEmail(String oldEmail, String newEmail) {

        var entity = userRepository.findByEmail(oldEmail)
                .orElseThrow(()->new CartelCustomException("Could not find old user email"));

        entity.setEmail(newEmail);

        userRepository.save(entity);
    }
}
