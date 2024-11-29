package com.sgdcbrk.crm.business.concretes.auth;

import com.sgdcbrk.crm.business.abstracts.UserService;
import com.sgdcbrk.crm.dto.user.requests.LoginRequest;
import com.sgdcbrk.crm.dto.user.requests.RegisterRequest;
import com.sgdcbrk.crm.util.jwt.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public String authenticate(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();

        return jwtUtil.generateToken(userDetails.getEmail());


    }

    public String register(RegisterRequest request) {
        userService.createUser(request);
        return "User registered successfully";
    }

    public boolean IsTokenValid(String token, Authentication authentication) {
        return jwtUtil.validateToken(token, (UserDetailsImp) authentication.getPrincipal());
    }

    public boolean IsAdmin(Authentication authentication) {
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        return userDetailsImp.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().contains("ADMIN"));
    }
}
