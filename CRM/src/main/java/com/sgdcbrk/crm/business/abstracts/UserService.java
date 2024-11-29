package com.sgdcbrk.crm.business.abstracts;

import com.sgdcbrk.crm.dto.user.requests.RegisterRequest;
import com.sgdcbrk.crm.dto.user.requests.UpdateUserRequest;
import com.sgdcbrk.crm.dto.user.responses.GetAllUserResponse;
import com.sgdcbrk.crm.model.user.User;

import java.util.List;

public interface UserService {
    void createUser(RegisterRequest request);
    void updateUser(long id, UpdateUserRequest request);
    void deleteUser(long id);
    User getUser(long id);
    List<User> getUserBySearch(String search);
    List<GetAllUserResponse> getAllUsers();

}
