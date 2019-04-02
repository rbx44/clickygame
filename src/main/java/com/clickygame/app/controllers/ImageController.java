package com.clickygame.app.controllers;

import com.clickygame.app.models.Image;
import com.clickygame.app.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    @Autowired
    private ImageService imageService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/image")
    public Iterable<Image> getAll() throws Exception {
        try {
            return imageService.getAll();
        } catch (Exception e) {
            throw e;
        }
    }
}