package com.sgdcbrk.crm.util.jwt;

import com.sgdcbrk.crm.business.concretes.auth.UserDetailsImp;
import com.sgdcbrk.crm.util.exception.JwtValidationException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private final String SECRET = "/w9v341H5Lu3KlFkXjPh9viKBtWXma8SKgkJNko3cF0HWm+V4pz0MLqi24eEuX6nkxuQz4gRBoiEsbudIBZQfw==";
    private final long EXPIRATION =  1000 * 60 * 60 * 2;

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public boolean validateToken(String token, UserDetailsImp userDetails) {
        try {
            final String email = extractEmail(token);
            return (email.equals(userDetails.getEmail()) && !isTokenExpired(token));
        } catch (Exception e) {
            // Özel exception fırlatın
            throw new JwtValidationException("Invalid JWT token: " + e.getMessage());
        }
    }


    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getExpiration();
        } catch (Exception e) {
            throw new JwtValidationException("Failed to extract expiration from token: " + e.getMessage());
        }
    }


    public String extractEmail(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            throw new JwtValidationException("Failed to extract email from token: " + e.getMessage());
        }
    }


}
