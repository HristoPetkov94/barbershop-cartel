package com.barbershop.cartel.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import java.io.File;

@Slf4j
public class PictureUtils {
    private final static String DEFAULT_PICTURE_PATH = "classpath:images/default-profile-picture.png";

    public static String getDefaultPicture() {

        String picture = "";

        try {
            File f = ResourceUtils.getFile(DEFAULT_PICTURE_PATH);
            picture = Base64Util.encodeFileToBase64Binary(f);
        } catch (Exception e) {
            log.error("Default picture is missing");
            e.printStackTrace();
        }

        return picture;
    }
}
