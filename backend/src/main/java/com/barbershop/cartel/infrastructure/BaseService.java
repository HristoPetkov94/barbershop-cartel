package com.barbershop.cartel.infrastructure;

import com.barbershop.cartel.errors.CartelCustomException;
import lombok.Getter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public abstract class BaseService<E extends HasId<ID>, M extends HasId<ID>, ID> {

    @Getter
    protected CrudRepository<E, ID> repository;

    @Autowired
    protected ModelMapper mapper;

    public List<M> getAll() {
        List<M> result = StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(this::toModel)
                .collect(Collectors.toList());
        return result;
    }

    public E getById(ID id) {
        return repository.findById(id).get();
    }

    public E create(M model) {

        E entity = toEntity(model);

        repository.save(entity);

        return entity;
    }

    public void update(M model) throws Exception {
        ID id = model.getId();

        E entity = repository.findById(id)
                .orElseThrow(() -> new CartelCustomException("Barber with id:" + id + " is not existing"));

        updateEntity(model, entity);

        repository.save(entity);
    }

    public void delete(ID id) {
        repository.deleteById(id);
    }

    protected void updateEntity(M model, E entity) {
        mapper.map(model, entity);
    }

    protected M toModel(E entity) {
        M destination = this.newModel();
        mapper.map(entity, destination);
        return destination;
    }

    protected E toEntity(M model){

        E destination = this.newEntity();
        mapper.map(model, destination);
        return destination;
    }

    protected abstract M newModel();

    protected abstract E newEntity();

}
