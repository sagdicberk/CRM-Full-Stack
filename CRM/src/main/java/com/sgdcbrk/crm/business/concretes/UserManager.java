package com.sgdcbrk.crm.business.concretes;

import com.sgdcbrk.crm.business.abstracts.UserService;
import com.sgdcbrk.crm.dto.user.requests.RegisterRequest;
import com.sgdcbrk.crm.dto.user.requests.UpdateUserRequest;
import com.sgdcbrk.crm.dto.user.responses.GetAllUserResponse;
import com.sgdcbrk.crm.model.user.Role;
import com.sgdcbrk.crm.model.user.User;
import com.sgdcbrk.crm.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createUser(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRoles(Collections.singleton(Role.USER)); // Role setini güncelledik
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateUser(long id, UpdateUserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        existingUser.setUsername(request.getUsername());
        existingUser.setEmail(request.getEmail());
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            Set<Role> updatedRoles = request.getRoles().stream()
                    .map(Role::valueOf)
                    .collect(Collectors.toSet());
            existingUser.setRoles(updatedRoles);
        }
        userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(long id) {
        userRepository.findById(id).ifPresent(userRepository::delete);
    }

    @Override
    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
    }

    @Override
    public List<GetAllUserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getUserBySearch(String search) {
        return userRepository.findByEmailContainsIgnoreCaseOrUsernameContainingIgnoreCase(search.trim(), search.trim()).orElseThrow(() -> new RuntimeException("User with search " + search + " not found"));

    }

    private GetAllUserResponse convertToDto(User user) {
        GetAllUserResponse response = new GetAllUserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRoles(user.getRoles());
        return response;
    }


}
