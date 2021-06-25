package com.barbershop.cartel.work.weekday;

import com.barbershop.cartel.infrastructure.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/work-week-days")
public class WorkWeekDayController extends BaseController<WorkWeekDayEntity, WorkWeekDayModel, Long, WorkWeekDayService> {

    @Autowired
    private void setService(WorkWeekDayService service){
        this.cartelService = service;
    }

    @GetMapping("/barber/{id}")
    public List<WorkWeekDayModel> getAll(@PathVariable long id) {
        List<WorkWeekDayModel> models = cartelService.getAllWhereId(id);
        return models;
    }

    @PutMapping("/bulk-update")
    public void bulkUpdateValues(@RequestBody List<WorkWeekDayModel> models) {
        cartelService.bulkUpdateValues(models);
    }

}
