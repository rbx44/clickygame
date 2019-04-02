package com.clickygame.app.services;

import java.util.Optional;

import com.clickygame.app.models.SecureUserDetail;
import com.clickygame.app.models.User;
import com.clickygame.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SecureUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public SecureUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUsername(username);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        return new SecureUserDetail(user);
    }
}