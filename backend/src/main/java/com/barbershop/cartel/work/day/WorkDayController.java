package com.barbershop.cartel.work.day;

import com.barbershop.cartel.infrastructure.BaseController;
import com.barbershop.cartel.work.weekday.WorkWeekDayModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/work-days")
public class WorkDayController extends BaseController<WorkDayEntity, WorkDayModel, Long, WorkDayService> {

    @Autowired
    private void setService(WorkDayService service){
        this.cartelService = service;
    }


    @GetMapping("/barber/{id}")
    public List<WorkDayModel> getAll(@PathVariable Long id) {
        List<WorkDayModel> models = cartelService.getAllWhereId(id);
        return models;
    }

    @PutMapping("/bulk-update")
    public List<WorkDayModel> bulkUpdateValues(@RequestBody List<WorkDayModel> models) {
        return cartelService.bulkUpdateValues(models);
    }
}
