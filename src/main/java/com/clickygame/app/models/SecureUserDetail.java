package com.clickygame.app.models;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class SecureUserDetail extends User implements UserDetails {
    private static final long serialVersionUID = -2112745264675451984L;

    public SecureUserDetail(User user) {
        //got here
        super(user.getId(), user.getName(), user.getEmail(), user.getUsername(), user.getPassword(), user.getRoles());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //got here
        return super.getRoles().stream().map(x -> new SimpleGrantedAuthority("ROLE_" + x)).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}