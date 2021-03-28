package com.barbershop.cartel.work.weekday;

import com.barbershop.cartel.infrastructure.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WorkWeekDayService extends BaseService<WorkWeekDayEntity, WorkWeekDayModel, Long> {

    @Autowired
    public void set(WorkWeekDayRepository repo){
        this.repository = repo;
    }

    @Override
    protected WorkWeekDayModel newModel() {
        return new WorkWeekDayModel();
    }

    @Override
    protected WorkWeekDayEntity newEntity() {
        return new WorkWeekDayEntity();
    }

    public List<WorkWeekDayModel> getAllWhereId(Long id){

        WorkWeekDayRepository repository = (WorkWeekDayRepository) this.repository;

        List<WorkWeekDayModel> models = repository.findAllByBarberId(id).stream().sorted(Comparator.comparing(WorkWeekDayEntity::getDayOfWeek)).map(this::toModel).collect(Collectors.toList());

        return models;
    }

    public void bulkUpdateValues(List<WorkWeekDayModel> models) {

        for (WorkWeekDayModel model : models) {
            WorkWeekDayEntity entity = repository.findById(model.getId()).get();

            entity.setFrom(model.getFrom());
            entity.setTo(model.getTo());

            entity.setNotWorking(model.isNotWorking());

            repository.save(entity);
        }
    }
}
