package com.sgdcbrk.crm.util.jwt;

import com.sgdcbrk.crm.business.concretes.auth.UserDetailsImp;
import com.sgdcbrk.crm.business.concretes.auth.UserDetailsServiceImp;
import com.sgdcbrk.crm.util.exception.JwtValidationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImp userDetailsServiceImp;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsServiceImp userDetailsServiceImp) {
        this.jwtUtil = jwtUtil;
        this.userDetailsServiceImp = userDetailsServiceImp;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = authHeader.substring(7);
        String email = null;

        try {
            email = jwtUtil.extractEmail(jwtToken); // E-mail çekme işlemi
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                authenticateUser(jwtToken, email, request);
            }
        } catch (JwtValidationException ex) {
            // JWT süresi dolmuşsa veya geçersizse, yanıtı ayarla
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token süresi dolmuş veya geçersiz. Lütfen yeniden giriş yapın.");
            response.getWriter().flush();  // Yanıtı gönder
            return;  // Filtre zincirini sonlandır
        } catch (Exception ex) {
            // Diğer hatalar için genel yanıt
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Bir hata oluştu: " + ex.getMessage());
            response.getWriter().flush();
            return;
        }

        filterChain.doFilter(request, response);  // Filtreyi devam ettir
    }

    private void authenticateUser(String jwtToken, String email, HttpServletRequest request) {
        try {
            UserDetailsImp userDetails = (UserDetailsImp) userDetailsServiceImp.loadUserByUsername(email);

            // Validate token (email match and expiration check)
            if (jwtUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (UsernameNotFoundException e) {
            logger.error("User not found: " + email, e);
        }
    }
}
