package com.barbershop.cartel.assignments.controller;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import com.barbershop.cartel.assignments.models.AssignmentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentInterface assignmentInterface;

    @GetMapping
    public List<AssignmentModel> getAssignments() {
        return assignmentInterface.getAssignments();
    }

    @GetMapping("/barber/{barberId}")
    public List<AssignmentModel> getAssignmentsByBarberId(@PathVariable long barberId) {
        return assignmentInterface.getAssignments(barberId);
    }

    @PutMapping
    public void updateAssignment(@RequestBody AssignmentModel assignmentModel) {
        assignmentInterface.updateAssignment(assignmentModel);
    }

    @PostMapping
    public AssignmentModel createAssignment(@RequestBody AssignmentModel assignmentModel) {

        AssignmentEntity assignment = assignmentInterface.createAssignment(assignmentModel);
        assignmentModel.setId(assignment.getId());

        return assignmentModel;
    }

    @DeleteMapping("/{assignmentId}")
    public void deleteAssignment(@PathVariable long assignmentId) {
        assignmentInterface.deleteAssignment(assignmentId);
    }
}
