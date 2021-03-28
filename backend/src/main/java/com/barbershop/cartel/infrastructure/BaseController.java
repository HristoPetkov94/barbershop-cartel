package com.barbershop.cartel.infrastructure;

import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController<E extends HasId<ID>,M extends HasId<ID>,ID, S extends BaseService<E,M,ID>> {

    protected S cartelService;

    @GetMapping
    public List<M> getAll() {
        return cartelService.getAll();
    }

    @PostMapping
    public M create(@RequestBody M model) {

        E entity = cartelService.create(model);

        cartelService.updateEntity(model, entity);

        return model;
    }

    @PutMapping
    public void update(@RequestBody M model) throws Exception {
        cartelService.update(model);
    }

    @DeleteMapping
    public void deleteBarber(@RequestParam ID id) {
        cartelService.delete(id);
    }
}
