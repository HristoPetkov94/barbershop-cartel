package com.barbershop.cartel.utils;

import com.barbershop.cartel.general.config.info.enums.LanguageEnum;
import lombok.val;

import java.util.HashMap;
import java.util.List;

public class InternationalString extends HashMap<LanguageEnum, String> {

    public InternationalString concatenate(String separator, InternationalString other){

        val result = new InternationalString();

        for (Entry<LanguageEnum, String> entry : this.entrySet()) {
           val newEntry =  String.join(separator, List.of(entry.getValue(), other.get(entry.getKey())));
           result.put(entry.getKey(), newEntry);
        }

        return result;
    }
}
