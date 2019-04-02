package com.clickygame.app.services;

import com.clickygame.app.models.Image;
import com.clickygame.app.repositories.ImageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {
    
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Iterable<Image> getAll() {
        return imageRepository.findAll();
    }
}