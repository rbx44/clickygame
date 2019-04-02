package com.clickygame.app.repositories;

import com.clickygame.app.models.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, String> {
}