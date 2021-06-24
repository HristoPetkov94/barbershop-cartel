package com.barbershop.cartel.utils;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ListUtils {

    public static <T> List<T> flattenListOfListsStream(List<List<T>> list) {
        return list.stream()
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }
}
