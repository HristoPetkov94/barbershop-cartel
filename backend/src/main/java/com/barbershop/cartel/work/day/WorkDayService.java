package com.barbershop.cartel.work.day;

import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.repository.BarberRepository;
import com.barbershop.cartel.infrastructure.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WorkDayService extends BaseService<WorkDayEntity, WorkDayModel, Long> {

    @Autowired
    private BarberRepository barberRepository;

    @Autowired
    public void set(WorkDayRepository repo){
        this.repository = repo;
    }

    @Override
    protected WorkDayModel newModel() {
        return new WorkDayModel();
    }

    @Override
    protected WorkDayEntity newEntity() {
        return new WorkDayEntity();
    }

    public List<WorkDayModel> getAllWhereId(Long id) {
        WorkDayRepository repository = (WorkDayRepository) this.repository;

        List<WorkDayModel> models = repository.findAllByBarberId(id).stream().map(this::toModel).collect(Collectors.toList());

        return models;
    }

    public List<WorkDayModel> bulkUpdateValues(Long barberId, List<WorkDayModel> models) {
        WorkDayRepository repository = (WorkDayRepository) this.repository;

        List<WorkDayEntity> entityList = repository.findAllByBarberId(barberId);

        repository.deleteAll(entityList);

        for (WorkDayModel model : models) {
            WorkDayEntity entity = newEntity();

            entity.setFrom(model.getFrom());
            entity.setTo(model.getTo());

            entity.setDay(model.getDay());

            entity.setNotWorking(model.isNotWorking());

            Optional<BarberEntity> barberById = barberRepository.findById(model.getBarberId());

            BarberEntity barberEntity = barberById.get();
            entity.setBarber(barberEntity);

            repository.save(entity);

            model.setId(entity.getId());
            model.setBarberId(barberEntity.getId());
        }

        return models;
    }
}
