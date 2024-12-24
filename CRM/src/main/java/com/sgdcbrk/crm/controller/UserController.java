package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.business.abstracts.UserService;
import com.sgdcbrk.crm.business.concretes.auth.UserDetailsImp;
import com.sgdcbrk.crm.dto.user.requests.UpdateUserRequest;
import com.sgdcbrk.crm.dto.user.responses.GetAllUserResponse;
import com.sgdcbrk.crm.dto.user.responses.GetCurrentUserResponse;
import com.sgdcbrk.crm.model.user.Role;
import com.sgdcbrk.crm.model.user.User;
import com.sgdcbrk.crm.util.mapper.ModelMapperService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapperService modelMapperService;

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody @Valid UpdateUserRequest updateUserRequest){
        try{
            userService.updateUser(id, updateUserRequest);
            return ResponseEntity.ok("User updated successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable long id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Todo Dto hazırla
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> getUser(@PathVariable long id){
        try {
            return ResponseEntity.ok(userService.getUser(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("/current")
    public ResponseEntity<GetCurrentUserResponse> getCurrentUser(Authentication authentication){
        if (authentication != null) {
            // authentication.getPrincipal()'dan UserDetails nesnesine erişiyoruz
            Object principal = authentication.getPrincipal();

            // UserDetails sınıfı implement edilmişse casting yapıyoruz
            if (principal instanceof UserDetails) {
                UserDetailsImp userDetails = (UserDetailsImp) principal;

                // GetCurrentUserResponse nesnesine email ve username ekliyoruz
                GetCurrentUserResponse response = modelMapperService.forResponse().map(userDetails, GetCurrentUserResponse.class);

                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findCustomerByEmail(@RequestParam String searchTerm) {
        try {
            var searchedUser = userService.getUserBySearch(searchTerm);
            return ResponseEntity.ok(searchedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error finding user by searchTerm: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<GetAllUserResponse>> getAllUserResponseResponse(){
        List<GetAllUserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // user için gerekli enumları burda kullanıcam (EnumController da yapılaiblir.)
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles(){
        return ResponseEntity.ok(Arrays.asList(Role.values()));
    }
}
