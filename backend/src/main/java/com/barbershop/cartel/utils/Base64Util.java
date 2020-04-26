package com.barbershop.cartel.utils;

import org.apache.tomcat.util.codec.binary.Base64;

import java.io.File;
import java.io.FileInputStream;

public class Base64Util {

    private static final String ENCODING = "UTF-8";

    public static String encodeFileToBase64Binary(File file) throws Exception {
        FileInputStream fileInputStreamReader = new FileInputStream(file);
        byte[] bytes = new byte[(int) file.length()];
        fileInputStreamReader.read(bytes);

        String fileName = file.getName();
        String fileExtension = getFileExtension(fileName);

        if(fileExtension.isEmpty()) return null;

        return toBase64String(fileExtension, new String(Base64.encodeBase64(bytes), ENCODING));
    }

    private static String getFileExtension(String filename) {
        String extension = "";

        int i = filename.lastIndexOf('.');

        if (i > 0) {
            extension = filename.substring(i+1);
        }

        return extension;
    }

    private static String toBase64String(String fileExtension, String encodedString){

        String prefix =  "data:image/" + fileExtension + ";base64,";
        return prefix.concat(encodedString);
    }
}
