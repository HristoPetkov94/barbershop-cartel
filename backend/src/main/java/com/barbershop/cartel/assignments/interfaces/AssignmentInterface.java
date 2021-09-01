package com.barbershop.cartel.assignments.interfaces;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.assignments.models.AssignmentModel;

import java.util.List;
import java.util.Optional;

public interface AssignmentInterface {
    List<AssignmentModel> getAssignments();

    List<AssignmentModel> getAssignments(long barberId);

    void updateAssignment(AssignmentModel assignmentModel);

    AssignmentEntity createAssignment(AssignmentModel assignmentModel);

    void deleteAssignment(long assignmentId);

    Optional<AssignmentEntity> getAssignment(long barberId, long serviceId);

    Optional<AssignmentEntity> getAssignment(long assignmentId);
}
