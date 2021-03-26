package com.barbershop.cartel.assignments.interfaces;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.assignments.models.AssignmentModel;

import java.util.List;

public interface AssignmentInterface {
    List<AssignmentModel> getAssignments(long barberId);

    void updateAssignment(AssignmentModel assignmentModel);

    AssignmentEntity createAssignment(AssignmentModel assignmentModel);

    void deleteAssignment(long assignmentId);
}
