package com.clickygame.app.services;

import com.clickygame.app.models.Image;

public interface ImageService {
    Iterable<Image> getAll();
}